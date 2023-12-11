from api.v1.views import app_views
from flask import jsonify

@app_views.route('/testpage')
def testpage():
    return jsonify(message='all good!')
