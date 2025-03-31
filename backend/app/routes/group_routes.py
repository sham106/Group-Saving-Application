from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User, UserRole
from app.models.groups import Group, group_members
from app.utils.validators import GroupSchema, JoinGroupSchema
from app.utils.role_decorators import group_admin_required
from marshmallow import ValidationError
from sqlalchemy import and_

group_bp = Blueprint('groups', __name__)

group_schema = GroupSchema()
join_schema = JoinGroupSchema()

@group_bp.route('/', methods=['POST'])
@jwt_required()
def create_group():
    """Create a new savings group"""
    try:
        # Validate incoming data
        data = group_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    
    new_group = Group(
        name=data['name'],
        description=data.get('description', ''),
        target_amount=data['target_amount'],
        creator_id=current_user_id
    )
    
    try:
        # Add group to database
        db.session.add(new_group)
        db.session.flush()  # Flush to get new_group.id
        
        # Make creator an admin of the group
        Group.add_member(new_group.id, current_user_id, is_admin=True)
        
        db.session.commit()
        return jsonify({
            "message": "Group created successfully",
            "group": new_group.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to create group", "details": str(e)}), 500

@group_bp.route('/', methods=['GET'])
@jwt_required()
def get_user_groups():
    """Get all groups user belongs to"""
    current_user_id = get_jwt_identity()
    
    # Get user's groups
    user = User.query.get_or_404(current_user_id)
    groups = []
    
    for group in user.groups:
        group_dict = group.to_dict()
        # Add member status (admin or regular member)
        group_dict['member_status'] = Group.get_member_status(group.id, current_user_id)
        groups.append(group_dict)
    
    return jsonify({
        "groups": groups,
        "count": len(groups)
    }), 200

@group_bp.route('/<int:group_id>', methods=['GET'])
@jwt_required()
def get_group_by_id(group_id):
    """Get group details by ID"""
    current_user_id = get_jwt_identity()
    group = Group.query.get_or_404(group_id)
    
    # Check if user is a member of the group
    status = Group.get_member_status(group_id, current_user_id)
    if not status:
        return jsonify({"error": "You are not a member of this group"}), 403
    
    # Get members of the group
    members_query = db.session.query(
        User.id, User.username, User.email, group_members.c.is_admin
    ).join(
        group_members, User.id == group_members.c.user_id
    ).filter(
        group_members.c.group_id == group_id
    ).all()
    
    members = [{
        "id": member.id,
        "username": member.username,
        "email": member.email,
        "is_admin": bool(member.is_admin)
    } for member in members_query]
    
    # Prepare response
    response = group.to_dict()
    response['members'] = members
    response['member_status'] = status
    
    return jsonify(response), 200

@group_bp.route('/join', methods=['POST'])
@jwt_required()
def join_group():
    """Join an existing group"""
    try:
        data = join_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    
    current_user_id = get_jwt_identity()
    group_id = data['group_id']
    
    # Check if group exists
    group = Group.query.get_or_404(group_id)
    
    # Check if already a member
    if Group.get_member_status(group_id, current_user_id):
        return jsonify({"message": "Already a member of this group"}), 400
    
    # Add user as member
    if Group.add_member(group_id, current_user_id):
        return jsonify({
            "message": "Successfully joined group",
            "group": group.to_dict()
        }), 200
    else:
        return jsonify({"error": "Failed to join group"}), 500

@group_bp.route('/<int:group_id>/leave', methods=['POST'])
@jwt_required()
def leave_group(group_id):
    """Leave a group"""
    current_user_id = get_jwt_identity()
    
    # Check if group exists
    group = Group.query.get_or_404(group_id)
    
    # Check if user is a member
    status = Group.get_member_status(group_id, current_user_id)
    if not status:
        return jsonify({"error": "You are not a member of this group"}), 400
    
    # Check if user is the creator/only admin
    if group.creator_id == current_user_id:
        # Count other admins
        admin_count = db.session.query(group_members).filter(
            and_(
                group_members.c.group_id == group_id,
                group_members.c.is_admin == 1,
                group_members.c.user_id != current_user_id
            )
        ).count()
        
        if admin_count == 0:
            return jsonify({
                "error": "You are the only admin. Please assign another admin before leaving."
            }), 400
    
    # Remove user from group
    if Group.remove_member(group_id, current_user_id):
        return jsonify({"message": "Successfully left the group"}), 200
    else:
        return jsonify({"error": "Failed to leave group"}), 500

@group_bp.route('/<int:group_id>/members', methods=['GET'])
@jwt_required()
def get_group_members(group_id):
    """Get all members of a group"""
    current_user_id = get_jwt_identity()
    
    # Check if group exists
    group = Group.query.get_or_404(group_id)
    
    # Check if user is a member
    if not Group.get_member_status(group_id, current_user_id):
        return jsonify({"error": "You are not a member of this group"}), 403
    
    # Get members
    members_query = db.session.query(
        User.id, User.username, User.email, group_members.c.is_admin
    ).join(
        group_members, User.id == group_members.c.user_id
    ).filter(
        group_members.c.group_id == group_id
    ).all()
    
    members = [{
        "id": member.id,
        "username": member.username,
        "email": member.email,
        "is_admin": bool(member.is_admin)
    } for member in members_query]
    
    return jsonify({
        "group_id": group_id,
        "members": members,
        "count": len(members)
    }), 200



# Admin can add new members to a certain group
@group_bp.route('/<int:group_id>/members', methods=['POST'])
@jwt_required()
@group_admin_required
def add_member_to_group(group_id):
    """Add a new member to the group (admin only)"""
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400
            
        # Check if user exists
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        # Check if already a member
        if Group.get_member_status(group_id, user_id):
            return jsonify({"message": "User is already a member of this group"}), 400
            
        # Add user to group
        if Group.add_member(group_id, user_id):
            return jsonify({"message": "User successfully added to group"}), 200
        else:
            return jsonify({"error": "Failed to add user to group"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@group_bp.route('/<int:group_id>/admin/<int:user_id>', methods=['POST'])
@jwt_required()
@group_admin_required
def make_admin(group_id, user_id):
    """Make a user an admin of the group"""
    current_user_id = get_jwt_identity()
    
    # Check if group exists
    group = Group.query.get_or_404(group_id)
    
    # Check if target user is a member
    if not Group.get_member_status(group_id, user_id):
        return jsonify({"error": "User is not a member of this group"}), 400
    
    # Update user to admin
    try:
        stmt = group_members.update().where(
            and_(
                group_members.c.group_id == group_id,
                group_members.c.user_id == user_id
            )
        ).values(is_admin=1)
        
        db.session.execute(stmt)
        db.session.commit()
        
        return jsonify({"message": "User is now an admin of this group"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update admin status", "details": str(e)}), 500