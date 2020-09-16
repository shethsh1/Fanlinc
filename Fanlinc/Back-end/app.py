from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from Models.Models import db
from Models.Models import users
from Models.Models import profile
from Controllers.SignUpController import SignUpController
from Controllers.LoginController import LoginController
from Controllers.ProfileEditController import ProfileEditController
from Controllers.FandomController import FandomController
from Controllers.PostController import PostController
from Controllers.AuctionController import AuctionController

from flask import Blueprint
from config import Config


app = Flask(__name__)

app.config.from_object(Config)
CORS(app)
app.register_blueprint(SignUpController)
app.register_blueprint(LoginController)
app.register_blueprint(ProfileEditController)
app.register_blueprint(FandomController)
app.register_blueprint(PostController)
app.register_blueprint(AuctionController)

with app.app_context():
    db.init_app(app)
    db.create_all()
    db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)
