#!/usr/bin/env python3
"""This module contains routes for creating new category and product"""

from api.v1.category import app_category
from flask import jsonify, request, abort
from api import AUTH
from api import CATEGORY_db


@app_category.route('/category', methods=['POST'], strict_slashes=False)
def add_category():
    """Create new category of product"""
    name = request.form.get('name')
    description = request.form.get('description')
    session_id = request.cookies.get('session_id')

    if not all(key in request.form for key in ['name', 'description']):
        return jsonify(message='Missing required fields'), 400
    if not session_id:
        abort(401)
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    CATEGORY_db.insert_merchant({
        'merchant_id': merchant['_id'],
        'name': name,
        'description': description
    })
    return jsonify(message='New category added'),201

@app_category.route('/category', methods=['GET'], strict_slashes=False)
def list_all_category():
    """List all the categories created by a user"""
    session_id = request.cookies.get('session_id')
    if not session_id:
        abort(401)
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    projection = {
        'name': 1,
        'description': 1
    }
    category = CATEGORY_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    return jsonify(category), 200