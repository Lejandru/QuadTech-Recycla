from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed

from flask import Flask
from werkzeug.utils import secure_filename
from wtforms import StringField, SelectField, validators, SubmitField, PasswordField, BooleanField, ValidationError, TextAreaField, IntegerField
from wtforms.validators import DataRequired, EqualTo, Length
from wtforms.fields.html5 import DateField, TimeField

class RegisterForm(FlaskForm):
    firstName = StringField('Firstname', validators=[DataRequired()])
    lastName = StringField('Lastname', validators=[DataRequired()])
    userName = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    phone = StringField('Phone Number', validators=[DataRequired()])
    password_hash = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField("Submit")

# Create Login Form
class LoginForm(FlaskForm):
    userName = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Submit")

class WeightForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    weight = IntegerField('Bottle Weight(kg)', validators=[DataRequired()])
    submit = SubmitField("Submit")

class GroupsForm(FlaskForm):
    groupName= StringField('Group', validators=[DataRequired()])
    
    submit = SubmitField("Submit")

class PartnerForm(FlaskForm):
    name= StringField('Name', validators=[DataRequired()])
    location= StringField('Location', validators=[DataRequired()])
    admin= StringField('Administrator', validators=[DataRequired()])
    email= StringField('Email', validators=[DataRequired()])
    phone = StringField('Phone Number', validators=[DataRequired()])
    submit = SubmitField("Submit")

class ScheduleForm(FlaskForm):
    company= StringField('Company', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    date = DateField('Date', format='%Y-%m-%d', validators=(validators.DataRequired(),))
    time = TimeField('Time', format='%I:%M', validators=(validators.DataRequired(),))
    submit = SubmitField('Submit')