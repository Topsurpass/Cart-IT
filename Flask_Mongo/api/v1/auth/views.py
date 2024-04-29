#!/usr/bin/env python3
"""This module contains routes that requires authentication"""

from api.v1.auth import app_auth
from flask import request,  jsonify, abort
from api import AUTH


@app_auth.route("/signup", methods=['POST'], strict_slashes=False)
def registerMerchant():
    """Register merchant and save to the database"""
   # Retrieve JSON data from the request
    data = request.get_json()

    # Access data using keys
    merchant = data.get('merchant')
    email = data.get('email').lower()
    username = data.get('username')
    password = data.get('password')
    phone = data.get('phone')
    address = data.get('address')

    if not all(key in data for key in ['merchant', 'email', 'username', 'password', 'phone', 'address']):
        return jsonify(message='Missing required fields'), 400
    
    merchant_id = AUTH.register_merchant(merchant, email, username, password, phone, address)
    if merchant_id == 1:
        return jsonify(message='Merchant name already exists'), 401
    if merchant_id == 2:
        return jsonify(message='Email already exists'), 401
    if merchant_id == 3:
        return jsonify(message='Username already exists'), 401
    if merchant_id == 4:
        return jsonify(message='Phone Number already exists'), 401
    if merchant_id == 0:
        return jsonify(message='Account successfully created'), 201
    

@app_auth.route("/login", methods=['POST'], strict_slashes=False)
def loginMerchant():
    """Login merchant, create token and redirect to /profile"""
    data = request.get_json()
    email = data.get('email').lower()
    password = data.get('password')

    valid_merchant = AUTH.valid_login(email, password)
    if not valid_merchant:
        return jsonify(message='Wrong email / password'), 400
    session_id = AUTH.create_session(email)
    if not session_id:
        return jsonify(message='Invalid email / password'), 401
    response = jsonify(message='You are successfully login')
    response.set_cookie("session_id", session_id, httponly=True, secure=True)
    return response

@app_auth.route("/logout", methods=['DELETE'], strict_slashes=False)
def logoutMerchant():
    """Logout merchant and delete cookie set and redirect to /homepage"""

    session_id = request.cookies.get("session_id")
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    AUTH.destroy_session(merchant['_id'])
    return jsonify(message='{} logout successfully'.format(merchant["merchant"]))


@app_auth.route("/profile", methods=['GET'], strict_slashes=False)
def merchantProfile():
    """Login merchant without login details. This relies on cookies set when login"""
    session_id = request.cookies.get("session_id")
    merchant = AUTH.get_user_from_session_id(session_id)
    if merchant:
        response = jsonify({'email': merchant['email'], 'user': merchant['merchant']})
        return response
    else:
        abort(403)
    