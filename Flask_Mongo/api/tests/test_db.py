import unittest
from unittest.mock import patch, MagicMock
from api.db import DB



class TestDB(unittest.TestCase):
    """Test the database module"""

    def setUp(self):
        """Create Mock mongoClient with db and collection"""
        self.mock_mongo_client = MagicMock()
        self.mock_db = self.mock_mongo_client['cartIt']
        self.mock_collection = self.mock_db['merchant']

    @patch('api.db.MongoClient', autospec=True) # Mock the MogoClient
    def test_insert_merchant(self, mock_mongo_client):
        """Test the insert_merchant function"""
        mock_mongo_client.return_value = self.mock_mongo_client

        db = DB('cartIt', 'merchant')
        data = {'merchant': 'TestMerchant', 'email': 'test@example.com'}

        db.insert_merchant(data)
        self.mock_collection.insert_one.assert_called_once_with(data)

    @patch('api.db.MongoClient', autospec=True) # Mock the MogoClient
    def test_find_merchant(self, mock_mongo_client):
        """Test the find_mmerchant function"""
        mock_mongo_client.return_value = self.mock_mongo_client

        db = DB('cartIt', 'merchant')
        data = {'merchant': 'TestMerchant'}

        db.find_merchant(data)
        self.mock_collection.find_one.assert_called_once_with(data)
    
    @patch('api.db.MongoClient', autospec=True) # Mock the MogoClient
    def test_find_all_merchant(self, mock_mongo_client):
        """Test the find_all_merchant function"""
        mock_mongo_client.return_value = self.mock_mongo_client

        db = DB('cartIt', 'merchant')
        data = {'merchant': 'TestMerchant'}
        projection = {'_id': 1}

        db.find_all_merchant(data, projection)
        self.mock_collection.find.assert_called_once_with(data, projection)

    @patch('api.db.MongoClient', autospec=True) # Mock the MogoClient
    def test_update_all_merchant(self, mock_mongo_client):
        """Test the update_all_mmerchant function"""
        mock_mongo_client.return_value = self.mock_mongo_client

        db = DB('cartIt', 'merchant')
        data = {'merchant': 'TestMerchant'}
        update_data = {'merchant': 'TestUpdateallMerchant'}

        db.update_all_merchant(data, update_data)
        self.mock_collection.update_one.assert_called_once_with(data, {'$set': update_data})

    @patch('api.db.MongoClient', autospec=True) # Mock the MogoClient
    def test_update_merchant(self, mock_mongo_client):
        """Test the update_mmerchant function"""
        mock_mongo_client.return_value = self.mock_mongo_client

        db = DB('cartIt', 'merchant')
        data = {'merchant': 'TestMerchant'}
        update_data = {'merchant': 'TestUpdateMerchant'}

        db.update_merchant(data, update_data)
        self.mock_collection.update_one.assert_called_once_with(data, {'$set': update_data})
    
    @patch('api.db.MongoClient', autospec=True) # Mock the MogoClient
    def test_delete_merchant(self, mock_mongo_client):
        """Test the delete_mmerchant function"""
        mock_mongo_client.return_value = self.mock_mongo_client

        db = DB('cartIt', 'merchant')
        data = {'merchant': 'TestMerchant'}

        db.delete_merchant(data)
        self.mock_collection.delete_one.assert_called_once_with(data)
    
    @patch('api.db.MongoClient', autospec=True) # Mock the MogoClient
    def test_delete_many_merchant(self, mock_mongo_client):
        """Test the delete_many_merchant function"""
        mock_mongo_client.return_value = self.mock_mongo_client

        db = DB('cartIt', 'merchant')
        data = {'merchant': 'TestMerchant'}

        db.delete_all_merchant(data)
        self.mock_collection.delete_many.assert_called_once_with(data)
    

if __name__ == '__main__':
    unittest.main()