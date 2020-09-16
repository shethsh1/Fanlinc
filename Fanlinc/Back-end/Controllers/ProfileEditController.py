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
from Models.Models import cosplayer
from Models.Models import db


ProfileEditController = Blueprint('ProfileEditController', __name__)
@ProfileEditController.route("/getProfile/<int:userId>", methods=['GET'])
@cross_origin(origin='*')
def getProfile(userId):
    if(request.method == 'GET'):
        user = users.query.filter_by(id=userId).first()
        if(user == None):
            db.session.close()
            return jsonify({})
        
        profile_instance = profile.query.filter_by(user = userId).first()
        profile_instance = profile_instance.to_JSON()
        info = {
            "name":user.to_JSON()['name'], 
            "bio":profile_instance['bio'],
            "image":profile_instance['image'],
            "email": profile_instance['email'],
            'first_name': profile_instance['first_name'],
            'last_name': profile_instance['last_name'],
            'cosplayer': profile_instance['cosplayer'],
            'vendor': profile_instance['vendor']
        }
        json_info = jsonify(info)
        db.session.close()
        return json_info
    db.session.close()
    return    





@ProfileEditController.route("/setImage", methods=['POST'])
@cross_origin(origin='*')
def setImage():
    if(request.method == 'POST'):
        json_value = request.json
        email = json_value['email']
        image = json_value['image']
        profile_instance = profile.query.filter_by(email=email).first()
        profile_instance.image = image
        db.session.commit()
        db.session.close()
        return "success"
    db.session.close()
    return  


@ProfileEditController.route("/profile/changeName", methods=['POST'])
@cross_origin(origin='*')
def changeName():
    
    

        
    json_value = request.json
    username = json_value['name']


    id = json_value['user']
    
    if username and id and request.method == "POST":
        
        user = users.query.filter_by(id=id).first()
        result = users.query.filter_by(name=username).first()
        if result != None:
            db.session.close()
            return "Name already exist please choose another"
        
        
        user.name = username
        db.session.commit()
                
                
                
        db.session.close()
        return "Success"
    db.session.close()
    return "please fill out every field"


@ProfileEditController.route("/profile/changeFirstName", methods=['POST'])
@cross_origin(origin='*')
def changeFirstName():
    
    json_value = request.json
    
    id = json_value['user']
    firstName = json_value['name']
    
    if firstName and id and request.method == "POST":
        
        if(len(firstName) < 1):
            db.session.close()
            return "must be atleast 1 characters"
        
        profileuser = profile.query.filter_by(user=id).first()
        profileuser.first_name = firstName
        db.session.commit()
        db.session.close()
        return "Success"
    db.session.close()
    return "please fill out every field"




@ProfileEditController.route("/profile/toggleVendor", methods=['POST'])
@cross_origin(origin='*')
def toggleVendor():
    
    json_value = request.json
    
    id = json_value['user']
    vendor = json_value['vendor']

    if id and request.method == "POST":
        
        profileuser = profile.query.filter_by(user=id).first()
        profileuser.vendor = vendor
        db.session.commit()
        db.session.close()
        return "Success"
    db.session.close()
    return "please fill out every field"


@ProfileEditController.route("/profile/toggleCosplayer", methods=['POST'])
@cross_origin(origin='*')
def toggleCosplayer():
    
    json_value = request.json
    
    id = json_value['user']
    cosplayer = json_value['cosplayer']

    if id and request.method == "POST":
        
        profileuser = profile.query.filter_by(user=id).first()
        profileuser.cosplayer = cosplayer
        db.session.commit()
        db.session.close()
        return "Success"
    db.session.close()
    return "please fill out every field"


@ProfileEditController.route("/profile/changeLastName", methods=['POST'])
@cross_origin(origin='*')
def changeLastName():
    
    json_value = request.json
    
    id = json_value['user']
    lastName = json_value['name']
    
    if lastName and id and request.method == "POST":
        
        if(len(lastName) < 1):
            db.session.close()
            return "must be atleast 1 characters"
        
        profileuser = profile.query.filter_by(user=id).first()
        profileuser.last_name = lastName
        db.session.commit()
        db.session.close()
        return "Success"
    db.session.close()
    return "please fill out every field"


@ProfileEditController.route("/profile/changeBio", methods=['POST'])
@cross_origin(origin='*')
def changeBio():
    json_value = request.json
    bio = json_value['bio']
    email = json_value['email']
    if bio and email and request.method == "POST":
        profile_instance = profile.query.filter_by(email=email).first()
        profile_instance.bio = bio
        db.session.commit()
        db.session.close()
        return "Success"
    db.session.close()
    return "Cant be empty"


@ProfileEditController.route("/profile/addImage", methods=['PUT'])
@cross_origin(origin='*')
def addCosplayerImage():
    json_value = request.json
    userId = json_value['userId']
    image = json_value['image']
    user_stuff = {
        "status": 400
        }
    if userId and image and request.method == "PUT":
        adding_image = cosplayer(userId, image)
        db.session.add(adding_image)
        db.session.commit()
        db.session.close()
        user_stuff['status'] = 200
        return jsonify(user_stuff)

    db.session.close()
    return jsonify(status)


@ProfileEditController.route("/profile/getImage/<int:userId>", methods=['GET'])
@cross_origin(origin='*')
def getCosplayersImage(userId):
    if userId and request.method == "GET":
        result = cosplayer.query.filter(cosplayer.userId==userId).all()
        image_list = []
        for images in result:
            image_list.append(images.to_JSON())
        db.session.close()
        
        image_list.reverse()
        return jsonify(image_list)


    db.session.close()
    return jsonify([])
