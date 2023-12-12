"""This contains blueprint for the authenticated routes"""
from flask import Blueprint

app_auth= Blueprint("app_auth", __name__, url_prefix="/api/v1/auth")

from api.v1.auth.views import *