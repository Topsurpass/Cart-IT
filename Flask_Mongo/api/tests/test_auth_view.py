import unittest
from unittest.mock import Mock, patch
from api.auth import Auth
from api.v1.auth import app_auth
from app import app
from parameterized import parameterized


class TestAuthView(unittest.TestCase):
    """Thes the auth view module"""

    def setUp(self):
        """Set up the test_client for the app wsgi"""
        app.testing = True
        self.app = app.test_client()

    @parameterized.expand([
        ({
            'merchant': 'TestMerchant',
            'email': 'test@example.com',
            'username': 'test_user',
            'password': 'test_password',
            'phone': '123456789',
            'address': '123 Main St'
        }, 201, 'Account successfully created'),
        ({
            'merchant': 'TestMerchant',
            'email': 'test@example.com',
            'username': 'test_user',
            'password': 'test_password',
            'phone': '123456789',
        }, 400, 'Missing required fields')
    ])

    def test_register_merchant(self, data, status, msg):
        """Test the /signup endpoint"""

        with patch('api.auth.Auth.register_merchant', return_value=0):
            response = self.app.post('/api/v1/auth/signup', json=data)

        self.assertEqual(response.status_code, status)
        self.assertEqual(response.json['message'], msg)

    @parameterized.expand([
        ({
            'email': 'Temitope@gmail.com',
            'password': 'Olowo'
        }, 200, 'You are successfully login'),
        ({
            'email': 'Temitope@gmail.com',
        }, 400, 'Missing required fields')
    ])
    def test_login_merchant_successful(self, data, status, msg):
        """Test the /login endpoint"""
        with patch('api.auth.Auth.create_session', return_value='11234565768'):
            auth = Auth()
            session_id = auth.create_session('Temitope@gmail.com')
            with patch('api.auth.Auth.valid_login', return_value=True):
                response = self.app.post('/api/v1/auth/login', json=data)
        self.assertEqual(response.status_code, status)
        self.assertEqual(response.json['message'], msg)

    def test_logout_merchant(self):
        """Test the /logout endpoint"""
        with patch('api.auth.Auth.get_user_from_session_id', return_value={'_id': '1111', 'merchant': 'TestMerchant'}):
            auth = Auth()
            merchant = auth.get_user_from_session_id('11234565768')
            with patch('api.auth.Auth.destroy_session'):
                auth.destroy_session('11234565768')
                response = self.app.delete('/api/v1/auth/logout')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['message'], 'TestMerchant logout successfully')

    def test_profile_merchant(self):
        """Test /profile endpoint"""
        with patch('api.auth.Auth.get_user_from_session_id', return_value={'email': 'test@merchant.com'}):
            auth = Auth()
            merchant = auth.get_user_from_session_id('11234565768')
            response = self.app.get('/api/v1/auth/profile')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {'email': 'test@merchant.com'})


if __name__ == '__main__':
    unittest.main()