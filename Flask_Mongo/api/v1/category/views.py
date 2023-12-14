#!/usr/bin/env python3
"""This module contains routes for creating new category and product"""

from api.v1.category import app_category
from flask import jsonify, request, abort
from api import AUTH
from api import CATEGORY_db
from bson import ObjectId


@app_category.route('/new', methods=['POST'], strict_slashes=False)
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

@app_category.route('/edit/<int:index>', methods=['PUT'], strict_slashes=False)
def edit_category(index: int):
    """Edit category of a product by index"""
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
    projection = {
        '_id': 1,
        'merchant_id': 1,
        'name': 1,
        'description': 1
    }
    category_list = CATEGORY_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    if index < 0 or index >= len(category_list):
        abort(404)
    selected_category = category_list[index]
    _id_dict = selected_category.get('_id')
    if not isinstance(_id_dict, dict) or '$oid' not in _id_dict:
        abort(404)

    _id = ObjectId(_id_dict['$oid'])
    
    CATEGORY_db.update_merchant(
        {'_id': _id},
        {'name': name, 'description': description}
    )
    return jsonify(message='Category updated successfully'),200


@app_category.route('/delete/<int:index>', methods=['DELETE'], strict_slashes=False)
def delete_category(index: int):
    """Delete a category of a product by index"""
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

    category_list = CATEGORY_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    if index < 0 or index >= len(category_list):
        abort(404)
    selected_category = category_list[index]
    _id_dict = selected_category.get('_id')
    if not isinstance(_id_dict, dict) or '$oid' not in _id_dict:
        abort(404)

    _id = ObjectId(_id_dict['$oid'])
    
    CATEGORY_db.delete_merchant({'_id': _id})
    return jsonify(message='Category deleted successfully'),200


@app_category.route('/all', methods=['GET'], strict_slashes=False)
def list_all_category():
    """List all the categories created by a user"""
    session_id = request.cookies.get('session_id')
    if not session_id:
        abort(401)
    merchant = AUTH.get_user_from_session_id(session_id)
    if not merchant:
        abort(403)
    projection = {
        '_id': 0,
        'merchant_id': 0
    }
    category = CATEGORY_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    return jsonify(category), 200
