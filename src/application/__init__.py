from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token
import jwt
import json

app = Flask(__name__)
jwt = JWTManager(app)
app.config["SECRET_KEY"] = "db24c608640f5034b30b8e1e1eb5618ed0ffdbf5"
app.config["MONGO_URI"] = "mongodb+srv://toxylee20021:pFQEit2RjN6yWNmz@cluster0.qaw64wf.mongodb.net/test_db?retryWrites=true&w=majority"

# mongodb database
mongodb_client = PyMongo(app)
db = mongodb_client.db

#db = pymongo.database.Database(mongo, 'mydatabase')
#col = pymongo.collection.Collection(db, 'mycollection')

from application import routes  # Importing the routes module
