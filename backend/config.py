import os
from datetime import timedelta
import secrets
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Secret key for JWT and general security
    # Use environment variable, generate if not exists
    SECRET_KEY = os.environ.get('SECRET_KEY') or secrets.token_hex(32)    
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")  # Use DATABASE_URL from .env

    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Configuration
    JWT_SECRET_KEY = SECRET_KEY
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
#     import os
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# class Config:
#     SECRET_KEY = os.getenv("SECRET_KEY")
#     JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
#     SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")  # Use DATABASE_URL from .env
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
