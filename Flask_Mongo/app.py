from api.v1.views import app_views
from api.v1.auth import app_auth
from flask import Flask, jsonify
import os

app = Flask(__name__)
app.register_blueprint(app_views)
app.register_blueprint(app_auth)


@app.errorhandler(401)
def unathorized_request(error) -> str:
    """Unathorized request"""
    return jsonify({"error": "Unauthorized"}), 401

@app.errorhandler(403)
def no_access_to_res(error) -> str:
    """Authenticated but not allowed to a resource"""
    return jsonify({"error": "Forbidden"}), 403

@app.errorhandler(404)
def not_found(error) -> str:
    """ Not found handler
    """
    return jsonify({"error": "Not found"}), 404


if __name__ == "__main__":
    host = os.getenv("API_HOST", "0.0.0.0")
    port = os.getenv("API_PORT", "5000")
    app.run(host=host, port=port, debug=True)