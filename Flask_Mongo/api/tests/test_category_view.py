import unittest
from unittest.mock import Mock, patch, MagicMock
from parameterized import parameterized
from api.v1.category import app_category
from app import app
from api import AUTH, CATEGORY_db, PRODUCT_db


class TestCategoryView(unittest.TestCase):
    """Test all the endpoint related to category"""

    def setUp(self):
        """Set up the test_client for the app wsgi"""
        app.testing = True
        self.app = app.test_client()
        self.mock_mongo_client = MagicMock()
        self.mock_db = self.mock_mongo_client['cartIt']
        self.mock_collection = self.mock_db['merchant']

    @parameterized.expand([
        ({
            'name': 'Books',
            'description': 'New books'
        }, 201, 'New category Books added'),
        ({
            'name': 'Looks',
        }, 400, 'Missing required fields'),
    ])
    def test_add_category(self, data, status, msg):
        """Test /new endpoint"""
        with patch('api.auth.Auth.get_user_from_session_id', return_value={'_id': '12345', 'name': 'Testmechant'}):
            merchant = AUTH.get_user_from_session_id('0000')
            with patch('api.CATEGORY_db.find_merchant'):
                existing_merchant = CATEGORY_db.find_merchant({'merchant_id': merchant['_id'], 'name': data['name']})
                with patch('api.CATEGORY_db.insert_merchant'):
                    CATEGORY_db.insert_merchant({
                        'merchant_id': merchant['_id'],
                        'name': data['name'],
                        'description': data.get('description')
                    })
                    response = self.app.post('/api/v1/category/new', json=data)
        self.assertEqual(response.status_code, status)
        self.assertEqual(response.json['message'], 'New category {} added'.format(data['name']))
