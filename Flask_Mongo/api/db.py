"""This module contains our MongoDB database for storing data from clients"""

from pymongo import MongoClient
from typing import Dict, Any, List, Union
import os

host = os.getenv("API_HOST", "localhost")
port = os.getenv("API_PORT", 27017)

class DB:
    """The mongo db database where our data are saved"""

    def __init__(self, db: str, collection: str) -> None:
        """Initialize the database instance"""
        self.client = MongoClient(host, port)
        self.db = self.client[db]
        self.collection = self.db[collection]

    def insert_merchant(self, data: Dict[str, Any]) -> Any:
        """Insert new data into the db and return its ID"""
        merchant_id = self.collection.insert_one(data).inserted_id
        return merchant_id
    
    def find_merchant(self, query: Dict[str, Any]) -> Union[List[Dict[str, Any]], None]:
        """Find a single data in the database that match the query"""
        merchant_id = self.collection.find_one(query)
        return merchant_id
    
    def find_all_merchant(self) -> List[Dict[str, Any]]:
        """Find all documents in a collection"""
        return list(self.collection.find())
    
    def update_merchant(self, query: Dict[str, Any], update_data: Dict[str, Any]) -> bool:
        """Update a document in the collection based document id"""
        result = self.collection.update_one(query, {'$set': update_data})
        return result

    def close_connection(self) -> None:
        """Close the MongoDB connection"""
        self.client.close()
        