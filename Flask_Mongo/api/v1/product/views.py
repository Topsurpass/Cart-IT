#!/usr/bin/env python3
"""This module contains routes for creating new product"""

from api.v1.product import app_product
from flask import jsonify, request, abort
from api import AUTH
from api import PRODUCT_db, CATEGORY_db
from bson import ObjectId

@app_product.route('/new', methods=['POST'], strict_slashes=False)
def add_product():
    """Create new product under a category"""
    name = request.form.get('name')
    image_url = request.form.get('image_url')
    description = request.form.get('description')
    category = request.form.get('category')
    price = request.form.get('price')
    quantity = request.form.get('quantity')
    session_id = request.cookies.get('session_id')

    if not all(key in request.form for key in ['name', 'image_url', 'description', 'category', 'price', 'quantity']):
        return jsonify(message='Missing required fields'), 400
    if not session_id:
        abort(401)
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    category_dict = CATEGORY_db.find_merchant({'merchant_id': merchant['_id'], 'name': category})
    if not category_dict:
        abort(404)
    PRODUCT_db.insert_merchant({
        'name': name,
        'image_url': image_url,
        'description': description,
        'category': category,
        'price': price,
        'quantity': quantity,
        'merchant_id': merchant['_id'],
        'category_id': category_dict['_id'],
    })
    return jsonify(message='New product added'),201
