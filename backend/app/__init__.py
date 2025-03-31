# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from flask_migrate import Migrate
# from config import Config

# db = SQLAlchemy()
# migrate = Migrate()  # Initialize Flask-Migrate

# def create_app(config_class=Config):
#     app = Flask(__name__)
#     app.config.from_object(config_class)
    
#     # Initialize extensions
#     db.init_app(app)
#     migrate.init_app(app, db)  # Attach Flask-Migrate to the app and db
#     CORS(app)
    
#     # Register Blueprints
#     from .routes import auth, groups, transactions, loans
#     app.register_blueprint(auth.bp)
#     app.register_blueprint(groups.bp)
#     app.register_blueprint(transactions.bp)
#     app.register_blueprint(loans.bp)
    
#     return app

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()  # Initialize Migrate without attaching it to `app` yet

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    
    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)  # Attach Migrate to `app` and `db`
    
    # Import and register blueprints
    from .routes.auth_routes import auth_bp
    from .routes.group_routes import group_bp
    from .routes.transaction_routes import transaction_bp
    from .routes.withdrawal_routes import withdrawal_bp

    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(group_bp, url_prefix='/api/groups')
    app.register_blueprint(transaction_bp, url_prefix='/api/transactions')
    app.register_blueprint(withdrawal_bp, url_prefix='/api/withdrawals')



    
    return app