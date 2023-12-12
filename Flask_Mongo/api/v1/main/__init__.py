"""This contains blueprint for the routes that requires no authentication"""
from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")

from api.v1.main.status import *

