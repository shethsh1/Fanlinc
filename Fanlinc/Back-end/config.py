import os
basedir = os.path.abspath(os.path.dirname(__file__))

# change to your mysql credentials

HOST="sql5.freemysqlhosting.net"
USERNAME="sql5393277"
PASSWORD="bZCYFvJmZB"
DB="sql5393277"

# don't change
path = 'mysql+pymysql://%s:%s@%s/%s?charset=utf8mb4'
data = (USERNAME, PASSWORD, HOST, DB)

class Config(object):

    
    SQLALCHEMY_DATABASE_URI = path % data
    SQLALCHEMY_TRACK_MODIFICATIONS = False