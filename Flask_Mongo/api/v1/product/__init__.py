"""This contains blueprint for the routes that pertains to products"""
from flask import Blueprint

app_product = Blueprint("app_product", __name__, url_prefix="/api/v1/product")

from api.v1.product.views import *

