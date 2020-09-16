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
from Models.Models import fandom
from Models.Models import myfandoms
from Models.Models import db

FandomController = Blueprint('FandomController', __name__)
@FandomController.route("/createFandom", methods=['PUT'])
@cross_origin(origin='*')
def create_fandom():
    json_req = request.json
    name = json_req['name']
    genre = json_req['genre']
    user_stuff = {
        "msg":"success",
        'status': 400
    }
    
    if(name and genre and request.method =="PUT"):
        
        if(len(name) < 3):
            user_stuff['msg'] = "Name should be atleast 3 characters"
            db.session.close()
            return json.dumps(user_stuff)
        
        
        result = fandom.query.filter_by(name=name).first()
        if(result != None):
            db.session.close()
            user_stuff['msg'] = "Fandom with this name already exists"
            return json.dumps(user_stuff)
        fan = fandom(genre, name)

        db.session.add(fan)
        db.session.commit()
        db.session.close()
        user_stuff['msg'] = "Fandom successfully created!"
        user_stuff['status'] = 200
        return json.dumps(user_stuff)

    db.session.close()
    user_stuff['msg'] = "Please fill out every field"
    return json.dumps(user_stuff)

@FandomController.route("/validateUsersFandom/<int:userId>/<int:fandomId>", methods=['GET'])
@cross_origin(origin='*')
def validateFandom(userId, fandomId):
    user_stuff = {
        "status": 200
        }
    result = myfandoms.query.filter(myfandoms.userId==userId, myfandoms.fandomId==fandomId).first()
    if(result == None):
        user_stuff['status'] = 400
        db.session.close()
        return jsonify(user_stuff)
    db.session.close()
    return jsonify(user_stuff)
        
    


@FandomController.route("/updateFandom", methods=['POST'])
@cross_origin(origin='*')
def update_fandom():
    json_req = request.json
    userId = json_req['userId']
    name = json_req['name']
    level = json_req['level']
    user_stuff = {
        "msg": "Success!",
        "status": 400
    }

    if(userId and level and name and request.method == "POST"):
        
        result = fandom.query.filter_by(name=name).first()
        fandomId = result.to_JSON()['fandomId']
        fandoms = myfandoms(userId, fandomId, level)
        result = myfandoms.query.filter_by(userId=userId, fandomId = fandomId).first()
        if(result != None):
            user_stuff['msg'] = 'you are already in this fandom'
            db.session.close()
            return json.dumps(user_stuff)
        db.session.add(fandoms)
        db.session.commit()
        db.session.close()
        user_stuff['status'] = 200
        return json.dumps(user_stuff)
    
    db.session.close()
    user_stuff['msg'] = "Please fill out every field"
    return json.dumps(user_stuff)



@FandomController.route("/getFandoms/<int:userId>", methods=['GET'])
@cross_origin(origin='*')
def get_fandoms(userId):
    if(request.method == "GET"):
        
        result = myfandoms.query.filter(myfandoms.userId==userId).all()
        fandomIds = []
        for fandoms in result:
            fandomIds.append(fandoms.to_JSON()['fandomId'])
        
        
        
        result = fandom.query.all()
        allFandoms = []
        for fandoms in result:
            if(fandoms.to_JSON()['fandomId'] not in fandomIds):
                myDict = {}
                myDict['value'] = fandoms.to_JSON()['name']
                myDict['name'] = fandoms.to_JSON()['name']
                allFandoms.append(myDict)
                db.session.close()
        db.session.close()
        return jsonify(allFandoms)
    db.session.close()
    return jsonify([])


@FandomController.route("/getFandoms/<int:userId>/<string:query>", methods=['GET'])
@cross_origin(origin='*')
def get_fandoms_with_query(userId, query):
    if(request.method == "GET"):
        
        result = myfandoms.query.filter(myfandoms.userId==userId).all()
        fandomIds = []
        
        for fandoms in result:
            fandomIds.append(fandoms.to_JSON()['fandomId'])
        
        
        
        result = fandom.query.all()
        allFandoms = []
        for fandoms in result:
            if(fandoms.to_JSON()['fandomId'] not in fandomIds and query in fandoms.to_JSON()['name']):
                myDict = {}
                myDict['value'] = fandoms.to_JSON()['name']
                myDict['name'] = fandoms.to_JSON()['name']
                allFandoms.append(myDict)
                db.session.close()
        db.session.close()
        return jsonify(allFandoms)
    db.session.close()
    return jsonify([])
    
    
    
@FandomController.route("/getMyFandoms/<int:userId>", methods=['GET'])
@cross_origin(origin='*')
def get_my_fandoms(userId):
    if(request.method == "GET"):
        
        result = myfandoms.query.filter(myfandoms.userId==userId).all()
        my_fandom = []
        for fandoms in result:
            fandomId = fandoms.to_JSON()['fandomId']
            res = fandom.query.filter_by(fandomId=fandomId).first()
            myDict = {}
            myDict['value'] = res.to_JSON()['fandomId']
            myDict['name'] = res.to_JSON()['name']
            my_fandom.append(myDict)
            db.session.close()
        db.session.close()
        return jsonify(my_fandom)
    
    
@FandomController.route("/getMyFandoms/<int:userId>/<string:query>", methods=['GET'])
@cross_origin(origin='*')
def get_my_fandoms_with_query(userId, query):
    if(request.method == "GET"):
        
        result = myfandoms.query.filter(myfandoms.userId==userId).all()
        my_fandom = []
        for fandoms in result:
            fandomId = fandoms.to_JSON()['fandomId']
            res = fandom.query.filter_by(fandomId=fandomId).first()
            if(query in res.to_JSON()['name']):
                myDict = {}
                myDict['value'] = res.to_JSON()['fandomId']
                myDict['name'] = res.to_JSON()['name']
                my_fandom.append(myDict)
                db.session.close()
        db.session.close()
        return jsonify(my_fandom)
    
    
@FandomController.route("/removeFandoms", methods=['POST'])
@cross_origin(origin='*')
def remove_my_fandom():
    json_req = request.json
    fandomName = json_req['fandomName']
    userId = json_req['userId']
    if(request.method == "POST"):
        this_fandom = myfandoms.query.filter_by(userId=userId, fandomId=fandomName).first()
        db.session.delete(this_fandom)
        db.session.commit()
        db.session.close()
        return "Success"
    
    

    
    
@FandomController.route("/getGenreAndFandom/<int:fandomId>", methods=['GET'])
@cross_origin(origin='*')
def get_fandom_stats(fandomId):
    if(request.method == "GET"):
        stats = []
        thisFandom = fandom.query.filter_by(fandomId=fandomId).first()
        if(thisFandom == None):
            db.session.close()
            return jsonify(stats)
        myDict = {}
        myDict['name'] = thisFandom.to_JSON()['name']
        myDict['genre'] = thisFandom.to_JSON()['genre']
        stats.append(myDict)
        db.session.close()
        return jsonify(stats)
    
    
    
