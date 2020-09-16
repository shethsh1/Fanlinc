
from flask import Flask, render_template, jsonify, request, Blueprint 
import pymysql
from flask_cors import CORS, cross_origin
import json
import re
import imghdr
import sys
sys.path.append('..')
from Models.Models import users
from Models.Models import profile
from Models.Models import db

LoginController = Blueprint('LoginController', __name__)
@LoginController.route("/validateAccount", methods=['POST'])
@cross_origin(origin='*')
def loginController():
    json_req = request.json
    email = json_req['email']
    
    password = json_req['password']
    
    user_stuff = {
        "msg":"success", 
        "id": -1
    }
    
    if(email and password and request.method =="POST"):
        result = users.query.filter_by(password=password, email=email).first()
        if(result != None):
            
            user_stuff['id'] = result.to_JSON()['id']
            user_json = json.dumps(user_stuff)
            db.session.close()
            return user_json
        else:
            user_stuff['msg'] = "incorect email/password"
            user_json = json.dumps(user_stuff)
            db.session.close()
            return user_json
    user_stuff['msg'] = "Please fill out every field"
    user_json = json.dumps(user_stuff)
    db.session.close()
    return user_json