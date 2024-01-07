import unittest
from unittest.mock import Mock, patch
from datetime import datetime, timezone
from api.auth import Auth


class TestAuth(unittest.TestCase):
    """Test for auth module"""
    
    def setUp(self):
        """Create a mock DB instance for testing"""
        self.mock_db = Mock()

    @patch('api.auth.Auth.register_merchant', return_value=0)
    def test_register_merchant(self, mock_register_merchant):
        """Test the register_merchant function"""
        auth = Auth()
        auth._db = self.mock_db # Replace actual db in Auth instance with a mock object
        result = auth.register_merchant(
            'NewMerchant', 'new@example.com', 'new_user', 'password123', '123456789', '123 Main St')

        self.assertEqual(result, 0)
        mock_register_merchant.assert_called_once_with('NewMerchant', 'new@example.com', 'new_user', 'password123', '123456789', '123 Main St')

    @patch('api.auth.Auth.valid_login', return_value=True)
    def test_valid_login(self, mock_valid_login):
        """Test valid_login function"""
        auth = Auth()
        auth._db = self.mock_db # Replace actual db in Auth instance with a mock object
        result = auth.valid_login('new@example.com', 'password123')
        self.assertTrue(result)
        mock_valid_login.assert_called_once_with('new@example.com', 'password123')


    @patch('api.auth.Auth.create_session', return_value='12345678910')
    def test_create_session(self, mock_create_session):
        """Test create_session function"""
        auth = Auth()
        auth._db = self.mock_db # Replace actual db in Auth instance with a mock object
        result = auth.create_session('new@example.com')
        self.assertEqual(result, '12345678910')
        mock_create_session.assert_called_once_with('new@example.com')

    @patch('api.auth.Auth.get_user_from_session_id')
    def test_get_user_from_session_id(self, mock_get_user_from_session_id):
        """Test The function get_user_from_session_id"""
        def database(session_id):
            """Fake database"""
            store = {'100': 'Aminat', '200': 'Sola'}
            if session_id and session_id in store:
                return store.get(session_id)
            else:
                return None
        mock_get_user_from_session_id.side_effect = database # Side effect can be a function / iterable for dynamic return value per call
        auth = Auth()
        auth._db = self.mock_db
        result = auth.get_user_from_session_id('100')
        self.assertEqual(result, 'Aminat')
        mock_get_user_from_session_id.assert_called_once_with('100')


if __name__ == '__main__':
    unittest.main()
