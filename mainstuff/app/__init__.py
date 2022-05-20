import email
from flask import Flask
from .config import Config
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from .models import User
from .extensions import db,migrate
from werkzeug.security import generate_password_hash


app = Flask(__name__)
app.config.from_object(Config)
#from app import models



db.init_app(app)
migrate.init_app(app,db)

# Flask-Login login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

with app.app_context():
    try:
        superadmin=Config.SUPERADMIN.split(",")
      
        
        try:
            
            firstName = superadmin[0]
            lastName = superadmin[1]
            userName =superadmin[2]
            email = superadmin[3]
            address = superadmin[4]
            phone =superadmin[5]
            password = generate_password_hash(superadmin[6], "sha256")

            person = User(firstName, lastName, userName, email, address, phone, password ,"SUPER")
            db.session.add(person)
            db.session.flush()
        except Exception as e:
            print("admin exists")
            pass
        print("super admin created")
        db.session.commit()
    except Exception as e:
        print("pass1")

from app import models,views
