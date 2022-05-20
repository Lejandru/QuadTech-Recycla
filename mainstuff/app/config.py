import os
from dotenv import load_dotenv
from pathlib import Path


dotenv_path = Path('../.env')
load_dotenv(dotenv_path=dotenv_path)


#load_dotenv()  # load environment variables from .env if it exists.

class Config(object):
    """Base Config Object"""
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'Som3$ec5etK*y')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '') or "postgresql://recycleja:password@localhost:5433/recycleja"
    SQLALCHEMY_TRACK_MODIFICATIONS = False # This is just here to suppress a warning from SQLAlchemy as it will soon be removed
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER')
    SUPERADMIN= os.environ.get('SUPER_ADMIN')