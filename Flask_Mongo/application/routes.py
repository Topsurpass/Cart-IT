from flask.templating import render_template_string
from werkzeug.datastructures import RequestCacheControl
from werkzeug.utils import redirect
from application import app
from flask import render_template, request, redirect, flash, url_for, jsonify, session
from bson import ObjectId
from .forms import TodoForm
from application import db
from datetime import datetime
import bcrypt
import jwt
import json
from flask_jwt_extended import JWTManager, create_access_token

@app.route("/add_users")
def add_one():
    db.test_db.insert_one({'user': "email", 'username': "username", 'phone': "phone"})
    return jsonify(message="success")  # Use 'jsonify' from 'flask' to return a JSON response

@app.route('/testpage')
def testpage():
    return jsonify(message='all good!')


@app.route("/userSignup", methods=['POST', 'GET'])
def userRegister():
    if request.method == 'POST':
        allUsers = db.test_db

        email = request.json.get('email')
        username = request.json.get('username')
        phone = request.json.get('phone')
        password = request.json.get('password')
        conpassword = request.json.get('conpassword')

        if not all(key in request.json for key in ['email', 'username', 'phone', 'password', 'conpassword']):
            return jsonify(message='Missing required fields'), 400

        user = allUsers.users.find_one({'email': email})
        existing_username = allUsers.users.find_one({'username': username})
        existing_phone = allUsers.users.find_one({'phone': phone})

        if user:
            return jsonify(message='Email already exists'), 401
        if existing_username:
            return jsonify(message='Username already exists'), 401
        if existing_phone:
            return jsonify(message='Phone Number already exists'), 401

        if password != conpassword:
            return jsonify(message='Password Not Matching!'), 401

        hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        access_token = create_access_token(identity=email)

        allUsers.users.insert_one({
            'email': email,
            'password': hashpw,
            "username": username,
            "phone": phone,
            'tokens': [{'token': str(access_token)}]
        })

        session['email'] = email
        return jsonify(token=str(access_token)), 201

    return jsonify(message='Invalid request method'), 400

@app.route("/userLogin", methods=['POST'])
def userLogin():
    allUsers = db.test_db
    user = allUsers.find_one({'email': request.json['email']})

    if user:
        if bcrypt.hashpw(request.json['password'].encode('utf-8'), user['password']) == user['password']:
            # session['email'] = request.json['email']
            access_token = create_access_token(identity=request.json['email'])
            user['tokens'].append({'token': str(access_token)})
            allUsers.save(user)
            return jsonify(token=str(access_token)), 201
    return jsonify(message='Invalid Username/Password'), 401
