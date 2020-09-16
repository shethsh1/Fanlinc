from flask import Flask, render_template, jsonify, request, Blueprint 
import pymysql
from flask_cors import CORS, cross_origin
import json
import re
import imghdr
import sys
sys.path.append('..')
from Models.Models import db
from Models.Models import users
from Models.Models import profile



SignUpController = Blueprint('SignUpController', __name__)
@SignUpController.route("/createAccount", methods=['PUT'])
@cross_origin(origin='*')
def signUpController():
    json_request = request.json
    name = json_request['name']
    email = json_request['email']
    password = json_request['password']
    confirmPassword = json_request['confirmPassword']
    vendor = json_request['vendor']
    cosplayer = json_request['cosplayer']
    first_name = json_request['first_name']
    last_name = json_request['last_name']
    
    if(name and email and password and confirmPassword and first_name and last_name and request.method =="PUT"):
        if(password != confirmPassword):
            db.session.close()
            return "Passwords don't match"
        result = users.query.filter_by(name=name).first()
        if(result != None):
            db.session.close()
            return "Username is in use"
        result = users.query.filter_by(email=email).first()
        if(result != None):
            db.session.close()
            return "Email is in use"
        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return "Please type a valid email address"
        
        if(len(name) > 36):
            db.session.close()
            return "name shouldn't be over 36 characters"
        if(len(email) > 36):
            db.session.close()
            return "email shouldn't be over 90 characters"
        if(len(password) > 36):
            db.session.close()
            return "password shouldn't be over 36 characters"
        
        if(len(first_name) > 36):
            db.session.close()
            return "first name shouldn't be over 36 characters"
        
        if(len(last_name) > 36):
            db.session.close()
            return "last name shouldn't be over 36 characters"        
            
        
        
        if(len(password) < 3 or len(name) < 3):
            db.session.close()
            return "username/password should be atleast 3 characters"
        
        if(len(first_name) < 1 or len(last_name) < 1):
            db.session.close()
            return "first and last names must be atleast 1 characters"

        user = users(name, email, password)
        db.session.add(user)
        db.session.commit()
        
        user_id = user.to_JSON()['id']
        add_profile = profile(user_id, email, None, None, vendor, cosplayer, first_name, last_name)
        db.session.add(add_profile)
        db.session.commit()
        db.session.close()
        return "Success"
    db.session.close()
    return "Please fill out every field"
