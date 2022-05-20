from re import M
from .extensions import db
from werkzeug.security import generate_password_hash
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import Table, Column, Integer, String
from datetime import date, time



partnerAdmins = db.Table("partnerAdmins",
    db.Column('adminid', db.Integer, db.ForeignKey('user.id')),
    db.Column('partnerid', db.Integer, db.ForeignKey('partners.id'))
)


groupMembers = db.Table("groupmembers",
    db.Column('memberid', db.Integer, db.ForeignKey('user.id')),
    db.Column('groupid', db.Integer, db.ForeignKey('groups.id'))
)


class Partners(db.Model):
    id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    name = db.Column(db.String(32))
    location = db.Column(db.String(255))
    admin= db.Column(db.String(32))
    email = db.Column(db.String(255),unique=True)
    phone = db.Column(db.String(12))
    admin_ref = db.relationship('User', secondary = partnerAdmins, backref = "admins", viewonly=False)


    def __init__(self, name, location,admin, email,phone):
        self.name = name
        self.location = location
        self.admin= admin
        self.email = email
        self.phone = phone


class Groups(db.Model):
    id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    groupName = db.Column(db.String(32))
    member_ref = db.relationship('User', secondary = groupMembers, backref = "members", viewonly=False)

    def __init__(self, groupName):
        self.groupName = groupName
        

class User(db.Model):
    # You can use this to change the table name. The default convention is to use
    # the class name. In this case a class name of UserProfile would create a
    # user_profile (singular) table, but if we specify __tablename__ we can change it
    # to `user_profiles` (plural) or some other name.

    id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    firstName = db.Column(db.String(255))
    lastName = db.Column(db.String(255))
    userName = db.Column(db.String(255),unique=True, nullable=False)
    email = db.Column(db.String(255),unique=True)
    address = db.Column(db.String(80))
    phone = db.Column(db.String(12))
    password_hash = db.Column(db.String(128))
    role= db.Column(db.String(10)) # ROLE = ["USER","ADMIN","SUPER"] 
    bottle_weight=db.Column(db.Integer(), nullable=True) 


    
    def __init__(self, firstName, lastName, userName, email, address, phone, password_hash,role,bottle_weight):
        self.firstName = firstName
        self.lastName = lastName
        self.userName = userName
        self.email = email
        self.address = address
        self.phone = phone
        self.password_hash = password_hash
        self.role= role
        self.bottle_weight = bottle_weight
        
    #class Weight(db.Model):
       ## user_id = db.Column(db.Integer)
        #email = db.Column(db.String(255),unique=True)
        #bottle_weight=db.Column(db.ARRAY(db.Integer()))
  


    
    #def __init__(self, user_id,email, bottle_weight ):
        #self.user_id = user_id
        #self.email = email
        #self.bottle_weight = bottle_weight

#class Schedule(db.Model):
    #id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    #company= db.Column(db.String(255))
    #address = db.Column(db.String(255))
    #date = db.Column(db.Date)
    #time = db.Column(db.Time)

    #def __init__(self, company, address, date,  time):
        #self.company = company
        #self.address = address
        #self.date =date
        #self.time = time

 
        

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' % (self.username)


