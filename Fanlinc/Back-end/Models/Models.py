from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class users(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(36), nullable=False, unique=True)
    email = db.Column(db.String(90), nullable=False, unique=True)
    password = db.Column(db.String(36), nullable=False)
    
    
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
            
    def to_JSON(self):
        return {'id': self.id,
                'name': self.name,
                'email': self.email,
                'password': self.password}
        
        
class profile(db.Model):
    __tablename__ = 'profile'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bio = db.Column(db.Text,  nullable=True)
    image = db.Column(db.String(500), nullable=True)
    vendor = db.Column(db.Boolean, nullable=False)
    cosplayer = db.Column(db.Boolean, nullable=False)
    email = db.Column(db.String(90), nullable=False, unique=True)
    first_name = db.Column(db.String(36), nullable=False)
    last_name = db.Column(db.String(36), nullable=False)
    

    def __init__(self, user, email, bio, image, vendor, cosplayer, first_name, last_name):
        self.user = user
        self.email = email
        self.bio = bio
        self.image = image
        self.vendor = vendor
        self.cosplayer = cosplayer
        self.first_name = first_name
        self.last_name = last_name
        
        
    def to_JSON(self):
        return {'id': self.id,
                'user': self.user,
                'email': self.email,
                'bio': self.bio,
                'image': self.image,
                'vendor': self.vendor,
                'cosplayer': self.cosplayer,
                'first_name': self.first_name,
                'last_name': self.last_name}
    
    
    
class fandom(db.Model):
    __tablename__ = 'fandom'
    
    fandomId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    genre = db.Column(db.String(36), nullable=False)
    name = db.Column(db.String(90), nullable=False, unique=True)

    
    def __init__(self, genre, name):
        self.genre = genre
        self.name = name
            
    def to_JSON(self):
        return {'fandomId': self.fandomId,
                'genre': self.genre,
                'name': self.name
                }
    
    
class myfandoms(db.Model):
    __tablename__ = 'myfandoms'
    __table_args__ = (
        db.UniqueConstraint('userId', 'fandomId', name='unique_component_commit'),
    )    
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    fandomId = db.Column(db.Integer, db.ForeignKey('fandom.fandomId'), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    
    def __init__(self, userId, fandomId, level):
        self.userId = userId
        self.fandomId = fandomId
        self.level = level
        
    def to_JSON(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "fandomId": self.fandomId,
            "level": self.level
            
            
            }
    
    
class post(db.Model):
    __tablename__ = 'post'
    
    postId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    fandomId = db.Column(db.Integer, db.ForeignKey('fandom.fandomId'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    
    def __init__(self, userId, fandomId, title, description):
        self.userId = userId
        self.fandomId = fandomId
        self.title = title
        self.description = description
        
    def to_JSON(self):
        return {
            "postId": self.postId,
            "userId": self.userId,
            "fandomId": self.fandomId,
            "title": self.title,
            "description": self.description
            }    
    
class comments(db.Model):
    __tablename__ = 'comments'
    
    commentId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    fandomId = db.Column(db.Integer, db.ForeignKey('fandom.fandomId'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('post.postId'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    
    def __init__(self, userId, fandomId, postId, comment):
        self.userId = userId
        self.fandomId = fandomId
        self.postId = postId
        self.comment = comment
        
    def to_JSON(self):
        return {
            "commentId": self.commentId,
            "userId": self.userId,
            "fandomId": self.fandomId,
            "postId": self.postId,
            "comment": self.comment
            }  
    
   
class auctions(db.Model):
    __tablename__ = 'auctions'
    
    auctionId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    fandomId = db.Column(db.Integer, db.ForeignKey('fandom.fandomId'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    min_price = db.Column(db.Float, nullable=False)
    curr_bid = db.Column(db.Float)
    curr_bidder = db.Column(db.String(150))
    quick_sale = db.Column(db.Float, nullable=False)
    item_image = db.Column(db.String(500), nullable=False)

    
    
    
    
    def __init__(self, userId, fandomId, title, min_price, curr_bid, curr_bidder, quick_sale, item_image):
        self.userId = userId
        self.fandomId = fandomId
        self.title = title
        self.min_price = min_price
        self.curr_bid = curr_bid
        self.curr_bidder = curr_bidder
        self.quick_sale = quick_sale
        self.item_image = item_image
        
        
    def to_JSON(self):
        return {
            "auctionId": self.auctionId,
            "userId": self.userId,
            "fandomId": self.fandomId,
            "title": self.title,
            "min_price": self.min_price,
            "curr_bid": self.curr_bid,
            "curr_bidder": self.curr_bidder,
            "quick_sale": self.quick_sale,
            "item_image": self.item_image
        }
    
    
class cosplayer(db.Model):
    __tablename__ = 'cosplayer'
    
    cosplayerId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image = db.Column(db.String(500), nullable=False)

    
    
    
    
    def __init__(self, userId, image):
        self.userId = userId
        self.image =image
        
        
    def to_JSON(self):
        return {
            "cosplayerId": self.cosplayerId,
            "userId": self.userId,
            "image": self.image
        }
    
    
    
    

        




