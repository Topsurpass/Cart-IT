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

    def insert_data(self, data: Dict[str, Any]) -> Any:
        """Insert new data into the db and return its ID"""
        data_id = self.collection.insert_one(data).inserted_id
        return data_id
    
    def find_single_data(self, query: Dict[str, Any]) -> Union[List[Dict[str, Any]], None]:
        """Find a single data in the database that match the query"""
        return self.collection.find_one(query)
    
    def find_all_data(self):
        """Find all documents in a collection"""
        return self.collection.find()

    def close_connection(self) -> None:
        """Close the MongoDB connection"""
        self.client.close()
        