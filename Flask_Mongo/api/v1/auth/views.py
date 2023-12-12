from api.v1.auth import app_auth
from flask import request,  jsonify
from api import AUTH


@app_auth.route("/signup", methods=['POST'], strict_slashes=False)
def registerMerchant():
    """Register merchant and save to the database"""
    merchant = request.form.get('merchant')
    email = request.form.get('email')
    username = request.form.get('username')
    password = request.form.get('password')
    phone = request.form.get('phone')      
    address = request.form.get('address')

    if not all(key in request.form for key in ['merchant', 'email', 'username', 'password', 'phone', 'address']):
        return jsonify(message='Missing required fields'), 400
    
    merchant_id = AUTH.register_merchant(merchant, email, username, password, phone, address)
    if merchant_id == 1:
        return jsonify(message='Merchant name already exists'), 401
    if merchant_id == 2:
        return jsonify(message='Email already exists'), 401
    if merchant_id == 3:
        jsonify(message='Username already exists'), 401
    if merchant_id == 4:
        return jsonify(message='Phone Number already exists'), 401
    if merchant_id == 0:
        return jsonify(message='Account successfully created'), 201
    

@app_auth.route("/login", methods=['POST'], strict_slashes=False)
def loginMerchant():
    """Login merchant and create token"""
    email = request.form.get('email')
    password = request.form.get('password')

    valid_merchant = AUTH.valid_login(email, password)
    if not valid_merchant:
        return jsonify(message='Wrong password'), 400
    session_id = AUTH.create_session(email)
    if not session_id:
        return jsonify(message='Invalid email / password'), 401
    response = jsonify(message='You are successfully login')
    response.set_cookie("session_id", session_id)
    return response

