# app/routes/withdrawal_routes.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.groups import Group
from app.models.transaction import Transaction, TransactionType
from app.models.withdrawal_request import WithdrawalRequest, WithdrawalStatus
from app.utils.validators import WithdrawalRequestSchema, WithdrawalActionSchema
from app.utils.role_decorators import group_admin_required
from marshmallow import ValidationError
from sqlalchemy import desc, func

withdrawal_bp = Blueprint('withdrawals', __name__)
withdrawal_request_schema = WithdrawalRequestSchema()
withdrawal_action_schema = WithdrawalActionSchema()

@withdrawal_bp.route('/request', methods=['POST'])
@jwt_required()
def request_withdrawal():
    """Submit a withdrawal request"""
    try:
        # Validate incoming data
        data = withdrawal_request_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    
    current_user_id = int(get_jwt_identity())
    group_id = data['group_id']
    
    # Check if group exists
    group = Group.query.get_or_404(group_id)
    
    # Check if user is a member of the group
    if not Group.get_member_status(group_id, current_user_id):
        return jsonify({"error": "You are not a member of this group"}), 403
    
    # Calculate user's total contribution to the group
    user_contributions = Transaction.query.filter_by(
        user_id=current_user_id,
        group_id=group_id,
        transaction_type=TransactionType.CONTRIBUTION
    ).with_entities(func.sum(Transaction.amount)).scalar() or 0
    
    # Calculate user's total approved withdrawals from the group
    user_withdrawals = Transaction.query.filter_by(
        user_id=current_user_id,
        group_id=group_id,
        transaction_type=TransactionType.WITHDRAWAL
    ).with_entities(func.sum(Transaction.amount)).scalar() or 0
    
    # Calculate user's maximum allowed withdrawal (what they've contributed minus what they've withdrawn)
    max_allowed_withdrawal = user_contributions - user_withdrawals
    
    # Check if amount exceeds user's available balance
    if data['amount'] > max_allowed_withdrawal:
        return jsonify({
            "error": "Withdrawal amount exceeds your available balance in this group",
            "requested": data['amount'],
            "available": max_allowed_withdrawal,
            "total_contributed": user_contributions,
            "total_withdrawn": user_withdrawals
        }), 400
    
    # Check if amount exceeds current group savings (as an additional safeguard)
    if data['amount'] > group.current_amount:
        return jsonify({
            "error": "Withdrawal amount exceeds current group savings",
            "requested": data['amount'],
            "available": group.current_amount
        }), 400
    
    # Create a new withdrawal request
    new_withdrawal = WithdrawalRequest(
        amount=data['amount'],
        user_id=current_user_id,
        group_id=group_id,
        description=data.get('description')
    )
    
    try:
        # Add withdrawal request to database
        db.session.add(new_withdrawal)
        db.session.commit()
        
        # TODO: Trigger notification to group admins here
        
        return jsonify({
            "message": "Withdrawal request submitted successfully",
            "withdrawal_request": new_withdrawal.to_dict(),
            "remaining_balance": max_allowed_withdrawal - data['amount']
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to submit withdrawal request", "details": str(e)}), 500

@withdrawal_bp.route('/pending/<int:group_id>', methods=['GET'])
@jwt_required()
@group_admin_required
def get_pending_withdrawals(group_id):
    """Get all pending withdrawal requests for a group (admin only)"""
    # Check if group exists
    group = Group.query.get_or_404(group_id)
    
    # Get all pending withdrawal requests
    pending_withdrawals = WithdrawalRequest.query.filter_by(
        group_id=group_id, 
        status=WithdrawalStatus.PENDING.value
    ).order_by(WithdrawalRequest.timestamp.desc()).all()
    
    return jsonify({
        "pending_withdrawals": [withdrawal.to_dict() for withdrawal in pending_withdrawals],
        "count": len(pending_withdrawals)
    }), 200

@withdrawal_bp.route('/<int:withdrawal_id>/action', methods=['POST'])
@jwt_required()
def process_withdrawal(withdrawal_id):
    """Approve or reject a withdrawal request (admin only)"""
    try:
        # Validate incoming data
        data = withdrawal_action_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    
    current_user_id = get_jwt_identity()
    
    # Get the withdrawal request
    withdrawal = WithdrawalRequest.query.get_or_404(withdrawal_id)
    
    # Verify user is admin of the group
    status = Group.get_member_status(withdrawal.group_id, current_user_id)
    if not status or status != 'admin':
        return jsonify({"error": "Admin privileges required for this action"}), 403
    
    # Check if request is already processed
    if withdrawal.status != WithdrawalStatus.PENDING.value:
        return jsonify({
            "error": "This withdrawal request has already been processed",
            "current_status": withdrawal.status
        }), 400
    
    # Get the group
    group = Group.query.get_or_404(withdrawal.group_id)
    
    try:
        # If approving, recheck user's contribution balance
        if data['status'] == WithdrawalStatus.APPROVED.value:
            # Calculate user's total contribution to the group
            user_contributions = Transaction.query.filter_by(
                user_id=withdrawal.user_id,
                group_id=withdrawal.group_id,
                transaction_type=TransactionType.CONTRIBUTION
            ).with_entities(func.sum(Transaction.amount)).scalar() or 0
            
            # Calculate user's total approved withdrawals from the group
            user_withdrawals = Transaction.query.filter_by(
                user_id=withdrawal.user_id,
                group_id=withdrawal.group_id,
                transaction_type=TransactionType.WITHDRAWAL
            ).with_entities(func.sum(Transaction.amount)).scalar() or 0
            
            # Calculate user's maximum allowed withdrawal
            max_allowed_withdrawal = user_contributions - user_withdrawals
            
            # Check if amount exceeds user's available balance
            if withdrawal.amount > max_allowed_withdrawal:
                return jsonify({
                    "error": "Withdrawal amount exceeds user's available balance in this group",
                    "requested": withdrawal.amount,
                    "available": max_allowed_withdrawal,
                    "total_contributed": user_contributions,
                    "total_withdrawn": user_withdrawals
                }), 400
            
            # Check if amount still exceeds current group savings (as additional safeguard)
            if withdrawal.amount > group.current_amount:
                return jsonify({
                    "error": "Withdrawal amount exceeds current group savings",
                    "requested": withdrawal.amount,
                    "available": group.current_amount
                }), 400
        
        # Update withdrawal request
        withdrawal.status = data['status']
        withdrawal.admin_id = current_user_id
        withdrawal.admin_comment = data.get('admin_comment')
        
        # If approved, create transaction and update group balance
        if data['status'] == WithdrawalStatus.APPROVED.value:
            # Create transaction from withdrawal
            transaction = WithdrawalRequest.create_transaction_from_withdrawal(withdrawal)
            db.session.add(transaction)
            
            # Update group's current amount
            group.current_amount = group.current_amount - withdrawal.amount
        
        db.session.commit()
        
        # TODO: Trigger notification to the requester here
        
        return jsonify({
            "message": f"Withdrawal request {data['status']} successfully",
            "withdrawal_request": withdrawal.to_dict(),
            "group_updated_balance": group.current_amount if data['status'] == WithdrawalStatus.APPROVED.value else None
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to {data['status']} withdrawal request", "details": str(e)}), 500

@withdrawal_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_withdrawals():
    """Get all withdrawal requests made by the current user"""
    current_user_id = get_jwt_identity()
    
    # Get all withdrawal requests for the user
    withdrawals = WithdrawalRequest.query.filter_by(user_id=current_user_id)\
        .order_by(WithdrawalRequest.timestamp.desc()).all()
    
    return jsonify({
        "withdrawal_requests": [withdrawal.to_dict() for withdrawal in withdrawals],
        "count": len(withdrawals)
    }), 200

@withdrawal_bp.route('/group/<int:group_id>', methods=['GET'])
@jwt_required()
def get_group_withdrawals(group_id):
    """Get all withdrawal requests for a specific group"""
    current_user_id = get_jwt_identity()
    
    # Check if group exists
    group = Group.query.get_or_404(group_id)
    
    # Check if user is a member of the group
    if not Group.get_member_status(group_id, current_user_id):
        return jsonify({"error": "You are not a member of this group"}), 403
    
    # Get withdrawal requests for the group
    withdrawals = WithdrawalRequest.query.filter_by(group_id=group_id)\
        .order_by(WithdrawalRequest.timestamp.desc()).all()
    
    return jsonify({
        "withdrawal_requests": [withdrawal.to_dict() for withdrawal in withdrawals],
        "count": len(withdrawals)
    }), 200

@withdrawal_bp.route('/user/available-balance/<int:group_id>', methods=['GET'])
@jwt_required()
def get_user_available_balance(group_id):
    """Get user's available balance for withdrawal in a specific group"""
    current_user_id = get_jwt_identity()
    
    # Check if group exists
    group = Group.query.get_or_404(group_id)
    
    # Check if user is a member of the group
    if not Group.get_member_status(group_id, current_user_id):
        return jsonify({"error": "You are not a member of this group"}), 403
    
    # Calculate user's total contribution to the group
    user_contributions = Transaction.query.filter_by(
        user_id=current_user_id,
        group_id=group_id,
        transaction_type=TransactionType.CONTRIBUTION
    ).with_entities(func.sum(Transaction.amount)).scalar() or 0
    
    # Calculate user's total approved withdrawals from the group
    user_withdrawals = Transaction.query.filter_by(
        user_id=current_user_id,
        group_id=group_id,
        transaction_type=TransactionType.WITHDRAWAL
    ).with_entities(func.sum(Transaction.amount)).scalar() or 0
    
    # Calculate user's maximum allowed withdrawal
    max_allowed_withdrawal = user_contributions - user_withdrawals
    
    return jsonify({
        "user_id": current_user_id,
        "group_id": group_id,
        "total_contributed": user_contributions,
        "total_withdrawn": user_withdrawals,
        "available_balance": max_allowed_withdrawal
    }), 200