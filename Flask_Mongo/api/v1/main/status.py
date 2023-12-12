#!/usr/bin/env python3
"""This module contains routes for creating new category and product"""

from api.v1.main import app_views
from flask import jsonify


@app_views.route('/testpage')
def testpage():
    return jsonify(message='Welcome to home page, all good!')
