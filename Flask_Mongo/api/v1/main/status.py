from api.v1.main import app_views
from flask import jsonify

@app_views.route('/testpage')
def testpage():
    return jsonify(message='all good!')