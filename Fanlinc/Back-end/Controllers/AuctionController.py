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
from Models.Models import auctions

AuctionController = Blueprint('AuctionController', __name__)
@AuctionController.route("/createAuction", methods=['PUT'])
@cross_origin(origin='*')
def create_auction():
    json_req = request.json

    userId = json_req['userId']
    fandomId = json_req['fandomId']
    title = json_req['title']
    min_price = json_req['min_price']
    curr_bid = None
    curr_bidder = None
    quick_sale = json_req['quick_sale']
    item_image = json_req['item_image']
    
    user_stuff = {
        "msg":"success",
        'status': 400
    }    
    
    if(userId and fandomId and title and min_price and quick_sale and item_image and request.method =="PUT"):
        

                
            
        auction = auctions(userId, fandomId, title, min_price, curr_bid, curr_bidder, quick_sale, item_image)
        
        db.session.add(auction)
        db.session.commit()    
        
        user_stuff['status'] = 200
        db.session.close()
        return json.dumps(user_stuff)
    
    
    user_stuff['msg'] = "Please fill out every field"
    db.session.close()
    return json.dumps(user_stuff)


@AuctionController.route("/getAuction/<int:fandomId>", methods=['GET'])
@cross_origin(origin='*')
def get_auction(fandomId):
    
    result = auctions.query.filter(auctions.fandomId==fandomId).all()
    curr = []
    for fandom in result:
        thisFandom = fandom.to_JSON()
        result = users.query.filter(users.id==thisFandom['userId']).first()
        thisFandom['auctioner'] = result.to_JSON()['name']
        result = users.query.filter(users.id==thisFandom['curr_bidder']).first()
        if(result):
            thisFandom['curr_name'] = result.to_JSON()['name']
        else:
            thisFandom['curr_name'] = None
        curr.append(thisFandom)
        
    db.session.close()
    
    return jsonify(curr)


@AuctionController.route("/getAuction/<int:fandomId>/<int:auctionId>", methods=['GET'])
@cross_origin(origin='*')
def get_auction_with_id(fandomId, auctionId):
    
    result = auctions.query.filter(auctions.fandomId==fandomId, auctions.auctionId==auctionId).all()
    curr = []
    for fandom in result:
        curr.append(fandom.to_JSON())
        
    result = users.query.filter(users.id==curr[0]['userId']).first()
    curr[0]['auctioner'] = result.to_JSON()['name']
    db.session.close()
    return jsonify(curr)


@AuctionController.route("/makeBid", methods=['POST'])
@cross_origin(origin='*')
def make_bid():
    json_req = request.json

    auctionId = json_req['auctionId']
    fandomId = json_req['fandomId']
    userId = json_req['userId']
    bid = json_req['bid']

    user_stuff = {
        "msg":"success",
        'status': 400
    }    
    
    if(auctionId and fandomId and bid and userId and request.method =="POST"):
        

        result = auctions.query.filter(auctions.fandomId==fandomId, auctions.auctionId==auctionId).first()
        result.curr_bid = bid
        result.curr_bidder=userId
        db.session.commit()
        db.session.close()
        
        user_stuff['status'] = 200
        return json.dumps(user_stuff)
    
    
    user_stuff['msg'] = "Please fill out every field"
    db.session.close()
    return json.dumps(user_stuff)



@AuctionController.route("/getAuction/<int:fandomId>/<string:searchQuery>", methods=['GET'])
@cross_origin(origin='*')
def get_auction_with_query(fandomId, searchQuery):
    
    result = auctions.query.filter(auctions.fandomId==fandomId).all()
    curr = []
    for fandom in result:
        thisFandom = fandom.to_JSON()
        title = thisFandom['title']
        if(searchQuery.lower() in title.lower()):
            result = users.query.filter(users.id==thisFandom['userId']).first()
            thisFandom['auctioner'] = result.to_JSON()['name']
            result = users.query.filter(users.id==thisFandom['curr_bidder']).first()
            if(result):
                thisFandom['curr_name'] = result.to_JSON()['name']
            else:
                thisFandom['curr_name'] = None
            curr.append(thisFandom)
        
    db.session.close()
    
    return jsonify(curr)



@AuctionController.route("/getMyAuctions/<int:userId>", methods=['GET'])
@cross_origin(origin='*')
def get_auction_with_my_id(userId):
    
    result = auctions.query.filter(auctions.userId == userId).all()
    curr = []
    for fandom in result:
        
        getInfo = fandom.to_JSON()
        
        result = users.query.filter(users.id==getInfo['curr_bidder']).first()
        if(result):
            getInfo['curr_name'] = result.to_JSON()['name']
        else:
            getInfo['curr_name'] = None
        
        
        curr.append(getInfo)
        
        
    db.session.close()
    return jsonify(curr)



@AuctionController.route("/deleteAuction", methods=['POST'])
@cross_origin(origin='*')
def delete_auction_with_id():
    json_req = request.json
    auctionId = json_req['auctionId']    
    result = auctions.query.filter(auctions.auctionId == auctionId).delete()
    db.session.commit()
    db.session.close()
    return "deleted"






        
    
    
    
        
    
    
    
    
