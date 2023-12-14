#!/usr/bin/env python3
"""This module contains routes for creating new category and product"""

from api.v1.category import app_category
from flask import jsonify, request, abort
from api import AUTH
from api import CATEGORY_db


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

@app_category.route('/edit/<index>', methods=['PUT'], strict_slashes=False)
def edit_category(index: str):
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
        'merchant_id': 0
    }
    category_list = CATEGORY_db.find_all_merchant({'merchant_id': merchant['_id']}, projection)
    if index < 0 or index >= len(category_list):
        abort(404)
    selected_category = category_list[index]

    CATEGORY_db.update_merchant(
        {'_id': selected_category['_id']},
        {'name': name, 'description': description}
    )
    return jsonify(message='Category updated successfully'),200


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