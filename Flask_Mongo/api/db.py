"""This module contains our MongoDB database for storing data from clients"""

from bson import json_util
from pymongo import MongoClient
from typing import Dict, Any, List, Union
from urllib.parse import quote_plus
from dotenv import load_dotenv
import json
import os


load_dotenv()

class DB:
    """The mongo db database where our data are saved"""

    def __init__(self, db: str, collection: str) -> None:
        """Initialize the database instance"""
        username = os.getenv("USER_NAME")
        password = os.getenv("PASS_WORD")
        cluster_url = 'cluster0.bumxezy.mongodb.net'
        
        # Properly escape username and password
        escaped_username = quote_plus(username.encode('utf-8'))
        escaped_password = quote_plus(password.encode('utf-8'))
        
        # Construct the MongoDB connection string
        mongo_url = f'mongodb+srv://{escaped_username}:{escaped_password}@{cluster_url}/?retryWrites=true&w=majority'
        
        # Create a MongoClient instance
        self.client = MongoClient(mongo_url)
        
        # Access the specified database and collection
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
    
    def find_all_merchant(self, query: Any, projection: Any) -> List[Dict[str, Any]]:
        """Find all documents in a collection with a specific merchant_id,
        returning some attributes of each"""
        documents = list(self.collection.find(query, projection))
        # Make every document attributes serializable
        json_documents = json_util.dumps(documents)
        return json.loads(json_documents)
    
    def update_merchant(self, query: Dict[str, Any], update_data: Dict[str, Any]) -> bool:
        """Update a document in the collection based document id"""
        result = self.collection.update_one(query, {'$set': update_data})
        return result

    def update_all_merchant(self, query: Dict[str, Any], update_data: Dict[str, Any]) -> bool:
        """Update all documents in a collection based document id"""
        result = self.collection.update_one(query, {'$set': update_data})
        return result
    
    def delete_merchant(self, query: Dict[str, Any])-> None:
        """Deletes a merchant from db"""
        self.collection.delete_one(query)

    def delete_all_merchant(self, query: Dict[str, Any])-> None:
        """"Delete all merchants from db"""
        self.collection.delete_many(query)
        
    def close_connection(self) -> None:
        """Close the MongoDB connection"""
        self.client.close()
        
