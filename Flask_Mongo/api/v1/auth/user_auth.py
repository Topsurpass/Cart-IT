from api.v1.auth import app_auth
from flask import request,  jsonify
from api.db import DB
import bcrypt



db = DB('cartIt', 'user')

@app_auth.route("/add_users")
def add_one():
    try:
        # Attempting to insert data into MongoDB
        db.insert_data({'user': "temi", 'username': "temz", 'phone': "08107304148"})
        return jsonify(message="success")
    except Exception as e:
        # Print the exception for debugging
        print(f"Error: {e}")
        return jsonify(message="error", error=str(e))

@app_auth.route('/testpage')
def testpage():
    return jsonify(message='all good!')


# @app_auth.route("/userSignup", methods=['POST', 'GET'])
# def userRegister():
#     if request.method == 'POST':
#         allUsers = db.test_db

#         email = request.json.get('email')
#         username = request.json.get('username')
#         phone = request.json.get('phone')
#         password = request.json.get('password')
#         conpassword = request.json.get('conpassword')

#         if not all(key in request.json for key in ['email', 'username', 'phone', 'password', 'conpassword']):
#             return jsonify(message='Missing required fields'), 400

#         user = allUsers.users.find_one({'email': email})
#         existing_username = allUsers.users.find_one({'username': username})
#         existing_phone = allUsers.users.find_one({'phone': phone})

#         if user:
#             return jsonify(message='Email already exists'), 401
#         if existing_username:
#             return jsonify(message='Username already exists'), 401
#         if existing_phone:
#             return jsonify(message='Phone Number already exists'), 401

#         if password != conpassword:
#             return jsonify(message='Password Not Matching!'), 401

#         hashpw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#         access_token = create_access_token(identity=email)

#         allUsers.users.insert_one({
#             'email': email,
#             'password': hashpw,
#             "username": username,
#             "phone": phone,
#             'tokens': [{'token': str(access_token)}]
#         })

#         session['email'] = email
#         return jsonify(token=str(access_token)), 201

#     return jsonify(message='Invalid request method'), 400

# @app_auth.route("/userLogin", methods=['POST'])
# def userLogin():
#     allUsers = db.test_db
#     user = allUsers.find_one({'email': request.json['email']})

#     if user:
#         if bcrypt.hashpw(request.json['password'].encode('utf-8'), user['password']) == user['password']:
#             # session['email'] = request.json['email']
#             access_token = create_access_token(identity=request.json['email'])
#             user['tokens'].append({'token': str(access_token)})
#             allUsers.save(user)
#             return jsonify(token=str(access_token)), 201
#     return jsonify(message='Invalid Username/Password'), 401
