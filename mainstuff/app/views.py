"""
Flask Documentation:     https://flask.palletsprojects.com/
Jinja2 Documentation:    https://jinja.palletsprojects.com/
Werkzeug Documentation:  https://werkzeug.palletsprojects.com/
This file creates your application.
"""

import os
from app import app, db, login_manager
from flask import render_template, request, redirect, url_for, flash, send_from_directory
from app.forms import RegisterForm
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_login import login_user, logout_user, current_user, login_required
#from flask_user import UserManager, UserMixin
# from flask_user import roles_required
from werkzeug.utils import secure_filename
from .extensions import db
from app.models import User, Partners, Groups
from app.forms import LoginForm,GroupsForm,PartnerForm, WeightForm, ScheduleForm
from flask_login import UserMixin
###
# Routing for your application.
###




@app.route('/')
@login_required
def home():
    """Render website's home page."""
    return render_template('home.html')

@app.route('/admin')
@login_required
#@roles_required('admin') 
def admin():

    return render_template("admin.html")

@app.route('/createAdmin/', methods=['GET', 'POST'])
def createAdmin():
    myform = RegisterForm()
    if (current_user.role == "SUPER" ) and request.method != 'POST':
        if myform.validate_on_submit():
            firstName = myform.firstName.data
            lastName = myform.lastName.data
            userName = myform.userName.data
            email = myform.email.data
            address = myform.address.data
            phone= myform.phone.data
            pwd= myform.password_hash.data
            hashed_pw = generate_password_hash(myform.password_hash.data, "sha256")
            password_hash= hashed_pw
                       
            person = User(firstName, lastName, userName, email, address, phone, password_hash,"ADMIN")
            db.session.add(person)
            db.session.commit()
            flash('Admin succesfully added.')
            return redirect(url_for('admin'))
    else:
        return redirect(url_for('admin'))
        flash('Restricted.')
    return render_template('create_user.html',form =myform)

@app.route('/addPartner/', methods=['GET', 'POST'])
# adds a new recycling partner to the system
def addPartner():
    form = PartnerForm()
    username = form.name.data
    """Render the website's add partner page. """
    if request.method == 'POST':
        u=User.query.filter_by(userName=username).first()
 

        if (current_user.role=="ADMIN" or current_user.role=="SUPER") and form.validate_on_submit():
            name=form.name.data
            location=form.location.data
            admin=form.admin.data
            email=form.email.data
            phone=form.phone.data
                       
            partner = Partners(name, location, admin,email,phone)
            db.session.add(partner)
            db.session.commit()


            flash('You have successfully registered.')
            return redirect(url_for('home'))
    return render_template('partner.html',form =form)

 

@app.route('/Register/', methods=['GET', 'POST'])
def register():
    myform = RegisterForm()
    """Render the website's Register page. """
    if request.method == 'POST':
        if myform.validate_on_submit():
            firstName = myform.firstName.data
            lastName = myform.lastName.data
            userName = myform.userName.data
            email = myform.email.data
            address = myform.address.data
            phone= myform.phone.data
            pwd= myform.password_hash.data
            hashed_pw = generate_password_hash(myform.password_hash.data, "sha256")
            password_hash= hashed_pw
                       
            person = User(firstName, lastName, userName, email, address, phone, password_hash,"USER", 0)
            db.session.add(person)
            db.session.commit()


            flash('You have successfully registered.')
            return redirect(url_for('home'))
    return render_template('register.html',form =myform)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.userName.data
        pwd = form.password.data
        user = User.query.filter_by(userName=form.userName.data).first()
        if user:
            # Check the hash
            if check_password_hash(user.password_hash, form.password.data):

                u=User.query.filter_by(userName=username).first()
                print(u.role)
                
                login_user(user)

                if u.role=="ADMIN":
                    return redirect(url_for('admin'))
                elif u.role=="SUPER":
                    return redirect(url_for('admin'))
                else:
                    return redirect(url_for('home'))
            else:
                flash("Wrong Password - Try Again!")
        else:
            flash("That User Doesn't Exist! Try Again...")


    return render_template('login.html', form=form)

@app.route('/groups/', methods=['GET', 'POST'])
def addGroups():
    form = GroupsForm()

    """Render the website's groups page. """
    if request.method == 'POST':
        if form.validate_on_submit():
            groupName=form.groupName.data
          #  member_ref=form.member_ref.data

            group = Groups(groupName)
            db.session.add(group)
            db.session.commit()

            flash('You have successfully registered.')
            return redirect(url_for('home'))
    return render_template('groups.html',form =form)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    flash("You Have Been Logged Out!  Thanks For Stopping By...")
    return redirect(url_for('login'))


@app.route('/add_weight', methods=['GET', 'POST'])
@login_required
#@roles_required('admin') 
def addweight():
    myform = WeightForm()

    if request.method == 'POST':
        if myform.validate_on_submit():
            user_id = myform.user_id.data
            email = myform.email.data
            weight = myform.weight.data 

            person = User.query.filter_by(id=user_id).first()
            weight_2= weight+ person.bottle_weight
            person.bottle_weight = weight_2
            db.session.commit()



            flash('You have successfully registered.')
            return redirect(url_for('home'))
    return render_template('addweight.html',form =myform)



@app.route('/Sign up/')
def sign_up():
    """Render website's sign up page."""
    return render_template('sign.html')


@app.route('/Menu/')
def menu():
    """Render website's menu page."""
    return render_template('menu.html')


@app.route('/Leaderboard/')
@login_required
def leaderboard():
    """Render website's leaderboard page."""
    person = User.query.order_by(User.bottle_weight.desc()) 
    return render_template("leader.html", person=person)
    


@app.route('/Map')
@login_required
def map():
    """Render website's map page."""
    return render_template('map.html')


@app.route('/Profile/')
def profile():
    """Render website's profile page."""
    return render_template('profile.html')

@app.route('/ProfileAdmin/')
def profileAdmin():
    """Render website's profile page."""
    return render_template('profileAdmin.html')


@app.route('/Challenges/')
@login_required
def challenges():
    """Render website's challenges page."""
    return render_template('challenges.html')


@app.route('/Forum/')
@login_required
def forum():
    """Render website's forum page."""
    return render_template('forum.html')

@app.route('/Groups/')
@login_required
def groups():
    """Render website's groups page."""
    return render_template('groups.html')




@app.route('/MemoryGame')
def memory():
    return render_template('memoryGame.html')

@app.route('/FlappyPlastic')
def flappy():
    return render_template('index.html')


@app.route('/SchedulePickUp', methods=['GET', 'POST'])
def pickup():
    myform = ScheduleForm()
    if request.method == 'POST':
        if myform.validate_on_submit():
            company=myform.company.data
            address = myform.address.data
            date = myform.date.data
            time = myform.time.data

            #sch = Schedule(company,address,date, time)
            #db.session.add(sch)
            #db.session.commit()
            flash('You have successfully registered.')
            return redirect(url_for('home'))
    return render_template('SchedulePickUp.html',form=myform)



###
# The functions below should be applicable to all Flask apps.
###

# Display Flask WTF errors as Flash messages
def flash_errors(form):
    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            ), 'danger')

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404

@app.route('/service-worker.js')
def sw():
    return app.send_static_file('service-worker.js')
    
if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port="8080")
