import os
basedir = os.path.abspath(os.path.dirname(__file__))

# change to your mysql credentials

HOST="localhost"
USERNAME="root"
PASSWORD="147258369"
DB="cscc01"

# don't change
path = 'mysql+pymysql://%s:%s@%s/%s?charset=utf8mb4'
data = (USERNAME, PASSWORD, HOST, DB)

class Config(object):

    
    SQLALCHEMY_DATABASE_URI = path % data
    SQLALCHEMY_TRACK_MODIFICATIONS = False