"""This contains blueprint for the routes that pertains to category"""
from flask import Blueprint

app_category = Blueprint("app_category", __name__, url_prefix="/api/v1/category")

from api.v1.category.views import *

