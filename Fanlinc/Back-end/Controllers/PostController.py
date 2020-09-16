from flask import Flask, render_template, jsonify, request, Blueprint 
import pymysql
from flask_cors import CORS, cross_origin
import json
import re
import imghdr
import sys
sys.path.append('..')
from Models.Models import users
from Models.Models import myfandoms
from Models.Models import post
from Models.Models import db
from Models.Models import comments



PostController = Blueprint('PostController', __name__)
@PostController.route("/MakePost", methods=['PUT'])
@cross_origin(origin='*')
def make_post():
    json_req = request.json
    fandomId = json_req['fandomId']
    userId = json_req['userId']
    postDescription = json_req['postDescription']
    postTitle = json_req['postTitle']
    
    
    json_returned = {
        'msg': "please fill out every field",
        'status': 400
        }
    
    if(postTitle and postDescription and request.method == "PUT"):
        if(len(postTitle) > 150):
            json_returned['msg'] = "Title must be less than 150 characters"
            db.session.close()
            return json.dumps(json_returned)
        
        
        currentPost = post(userId, fandomId, postTitle, postDescription)
        db.session.add(currentPost)
        db.session.commit()
        db.session.close()
        json_returned['msg'] = "sent"
        json_returned['status'] = 200
        return json.dumps(json_returned)
        
    db.session.close()
    return json.dumps(json_returned)



@PostController.route("/getPost/<int:fandomId>", methods=['GET'])
@cross_origin(origin='*')
def getPost(fandomId):
    if(request.method == "GET"):
        result = post.query.filter(post.fandomId==fandomId).all()
        all_post = []
        for fandom in result:
            curr = fandom.to_JSON()
            myDict = {}
            myDict['title'] = curr['title']
            myDict['postId'] = curr['postId']
            myDict['userId'] = curr['userId']
            get_name = users.query.filter_by(id = curr['userId']).first()
            myDict['name'] = get_name.to_JSON()['name']
            get_level = myfandoms.query.filter_by(userId = curr['userId']).first()
            if(get_level):
                myDict['level'] = get_level.to_JSON()['level']
            else:
                myDict['level'] = "user left :("              
            db.session.close()
            all_post.append(myDict)
        all_post.reverse()
        db.session.close()
        return jsonify(all_post)
    
    db.session.close()
    return





@PostController.route("/getThisPost/<int:fandomId>/<int:postId>", methods=['GET'])
@cross_origin(origin='*')
def getThisPost(fandomId, postId):
    if(request.method == "GET"):
        result = post.query.filter(post.fandomId==fandomId, post.postId==postId).all()
        all_post = []
        for fandom in result:
            name = users.query.filter_by(id=fandom.to_JSON()['userId']).first()
            myDict = {}
            myDict['name'] = name.to_JSON()['name']
            myDict['description'] = fandom.to_JSON()['description']
            myDict['userId'] = fandom.to_JSON()['userId']
            myDict['title'] = fandom.to_JSON()['title']
            db.session.close()
            all_post.append(myDict)
            
        db.session.close()
        return json.dumps(all_post)
    db.session.close()
    return



@PostController.route("/createComment", methods=['POST'])
@cross_origin(origin='*')
def createComment():
    json_req = request.json
    fandomId = json_req['fandomId']
    postId = json_req['postId']
    userId = json_req['userId']
    comment = json_req['comment']
    
    json_returned = {
        'msg': "please fill out every field",
        'status': 400
        }    
    if(fandomId and postId and userId and comment and request.method == "POST"):
        
        if(len(comment) < 2):
            json_returned['msg'] = "Comment must atleast be 2 characters"
            db.session.close()
            return json.dumps(json_returned)
        
        
        createComment = comments(userId, fandomId, postId, comment)
        db.session.add(createComment)
        
        db.session.commit()        
        db.session.close()
        json_returned['msg'] = "Success! Comment has been made."
        json_returned['status'] = 200
        return json.dumps(json_returned)
        

    db.session.close()
    return json.dumps(json_returned)


@PostController.route("/getComments/<int:fandomId>/<int:postId>", methods=['GET'])
@cross_origin(origin='*')
def getComments(fandomId, postId): 
    if(fandomId and postId and request.method == "GET"):
        result = comments.query.filter(comments.fandomId==fandomId, comments.postId==postId).all()
        all_comments = []
        for fandom in result:
            myDict = {}
            myDict['comment'] = fandom.to_JSON()['comment']
            myDict['commentId'] = fandom.to_JSON()['commentId']
            myDict['userId'] = fandom.to_JSON()['userId']
            name = users.query.filter_by(id=fandom.to_JSON()['userId']).first()
            myDict['name'] = name.to_JSON()['name']
            all_comments.append(myDict)
            db.session.close()
        db.session.close()
        all_comments.reverse()
        return json.dumps(all_comments)
    db.session.close()
    return


@PostController.route("/getPost/<int:fandomId>/<string:searchQuery>", methods=['GET'])
@cross_origin(origin='*')
def getPostWithTitle(fandomId, searchQuery):
    if(request.method == "GET"):
        result = post.query.filter(post.fandomId==fandomId).all()
        all_post = []
        for fandom in result:
            curr = fandom.to_JSON()
            myDict = {}
            myDict['title'] = curr['title']
            if(searchQuery.lower() in curr['title'].lower() ):
                myDict['postId'] = curr['postId']
                myDict['userId'] = curr['userId']
                get_name = users.query.filter_by(id = curr['userId']).first()
                myDict['name'] = get_name.to_JSON()['name']
                get_level = myfandoms.query.filter_by(userId = curr['userId']).first()
                if(get_level):
                    myDict['level'] = get_level.to_JSON()['level']
                else:
                    myDict['level'] = "user left :("              
                all_post.append(myDict)
        all_post.reverse()
        db.session.close()
        return jsonify(all_post)
    
    db.session.close()
    return jsonify([])