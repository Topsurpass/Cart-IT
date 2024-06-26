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
    data = request.get_json()
    name = data.get('name')
    image_url = data.get('image_url')
    description = data.get('description')
    category = data.get('category')
    price = data.get('price')
    quantity = data.get('quantity')
    session_id = request.cookies.get('session_id')

    if not all(key in data for key in ['name', 'image_url', 'description', 'category', 'price', 'quantity']):
        return jsonify(message='Missing required fields'), 400
    if not session_id:
        abort(401)
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    category_dict = CATEGORY_db.find_merchant({'merchant_id': merchant['_id'], 'name': category})
    if not category_dict:
        return jsonify(message='Merchant does not have category {} created. Kindly create the category and try again.'.format(category)), 404
    
    existing_product = PRODUCT_db.find_merchant({"merchant_id": merchant['_id'], "name": name})
    if existing_product:
        return jsonify(message='Product {} already exists'.format(name)), 409

    PRODUCT_db.insert_merchant({
        'name': name,
        'image_url': image_url,
        'description': description,
        'category': category,
        'price': price,
        'quantity': quantity,
        'seller': merchant['merchant'],
        'phone': merchant['phone'],
        'address': merchant['address'],
        'merchant_id': merchant['_id'],
        'category_id': category_dict['_id'],
    })
    projection = {
        'name': 1,
        'image_url': 1,
        'description': 1,
        'category': 1,
        'price': 1,
        'quantity': 1,
        'seller': 1,
        'phone': 1,
        'address': 1,
        'merchant_id': 1,
        'category_id': 1,
    }
    products = PRODUCT_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    return jsonify(message=products),201

@app_product.route('/edit/<int:index>', methods=['PUT'], strict_slashes=False)
def edit_product(index: int):
    """Edit a product  of a product by index"""
    data = request.get_json()
    name = data.get('name')
    image_url = data.get('image_url')
    description = data.get('description')
    category = data.get('category')
    price = data.get('price')
    quantity = data.get('quantity')
    session_id = request.cookies.get('session_id')

    if not all(key in data for key in ['name', 'image_url', 'description', 'category', 'price', 'quantity']):
        return jsonify(message='Missing required fields'), 400
    if not session_id:
        abort(401)
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    category_dict = CATEGORY_db.find_merchant({'merchant_id': merchant['_id'], 'name': category})
    if not category_dict:
        return jsonify(message='Category does not exist'),404

    projection = {
        'name': 1,
        'image_url': 1,
        'description': 1,
        'category': 1,
        'price': 1,
        'quantity': 1,
        'seller': 1,
        'phone': 1,
        'address': 1,
        'merchant_id': 1,
        'category_id': 1,
    }
    product_list = PRODUCT_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    if index < 0 or index >= len(product_list):
        return jsonify(message='Product index to be edited is out of list'),404
    selected_product = product_list[index]
    _id_dict = selected_product.get('_id')
    if not isinstance(_id_dict, dict) or '$oid' not in _id_dict:
        abort(404)

    _id = ObjectId(_id_dict['$oid'])
    PRODUCT_db.update_merchant(
        {'_id': _id},
        {
            'name': name,
            'image_url': image_url,
            'description': description,
            'category': category,
            'price': price,
            'quantity': quantity,
            'merchant_id': merchant['_id'],
            'category_id': category_dict['_id'],
        }
    )
    products = PRODUCT_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    return jsonify(message=products),200


@app_product.route('/delete/<int:index>', methods=['DELETE'], strict_slashes=False)
def delete_category(index: int):
    """Delete a product from list of a merchant's products by index"""
    session_id = request.cookies.get('session_id')
    if not session_id:
        abort(401)
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    projection = {
        '_id': 1,
        'merchant_id': 1,
        'name': 1,
        'description': 1
    }

    product_list = PRODUCT_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    if len(product_list) == 0:
        return jsonify(message='Product index to be deleted is out of list'),404
    if index < 0 or index >= len(product_list):
        abort(404)
    selected_product = product_list[index]
    _id_dict = selected_product.get('_id')
    if not isinstance(_id_dict, dict) or '$oid' not in _id_dict:
        abort(404)

    _id = ObjectId(_id_dict['$oid'])
    
    PRODUCT_db.delete_merchant({'_id': _id})
    projection = {
        'name': 1,
        'image_url': 1,
        'description': 1,
        'category': 1,
        'price': 1,
        'quantity': 1,
        'seller': 1,
        'phone': 1,
        'address': 1,
        'merchant_id': 1,
        'category_id': 1,
    }
    products = PRODUCT_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    return jsonify(message=products),200

@app_product.route('/all', methods=['GET'], strict_slashes=False)
def list_all_products():
    """List all the Products created under a category by a user"""
    session_id = request.cookies.get('session_id')
    if not session_id:
        abort(401)
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    projection = {
        'name': 1,
        'image_url': 1,
        'description': 1,
        'category': 1,
        'price': 1,
        'quantity': 1,
        'seller': 1,
        'phone': 1,
        'address': 1,
        'merchant_id': 1,
        'category_id': 1,
    }
    products = PRODUCT_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    return jsonify(products), 200