#!/usr/bin/env python3
"""This module contains Auth class for authenticating routes, hasing password and creating
session ids"""
import bcrypt
from api.db  import DB
from typing import Any
from uuid import uuid4
import datetime

def _hash_password(password: str) -> bytes:
    """Hash password using bcrypt and return the salted hash"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def is_valid_password(hashed_password: bytes, password: str) -> bool:
    """validate that the provided password matches the
    hashed password"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

def _generate_uuid() -> str:
    """Generate unique id"""
    return str(uuid4())

class Auth:
    """Auth class to interact with the authentication database.
    """
    def __init__(self):
        """Initialize the AUTH by connecting to the db"""
        self._db = DB('cartIt', 'merchant')
    
    def register_merchant(self, merchant: str, email: str, username: str, password: str, phone: str, address: str) -> Any:
        """Authenticate new merchant for signup"""
        existing_merchant = self._db.find_merchant({'merchant': merchant})
        existing_email = self._db.find_merchant({'email': email})
        existing_username = self._db.find_merchant({'username': username})
        existing_phone = self._db.find_merchant({'phone': phone})

        if existing_merchant:
            return 1
        if existing_email:
            return 2
        if existing_username:
            return 3
        if existing_phone:
            return 4
        
        self._db.insert_merchant({
            'merchant': merchant,
            'email': email,
            'username': username,
            'password': _hash_password(password),
            'phone': phone,
            'address': address,
            'date': datetime.datetime.now(tz=datetime.timezone.utc),
        })

        return 0
    
    def valid_login(self, email: str, password: str)-> bool:
        """Validate merchant before siginiing in"""
        merchant = self._db.find_merchant({'email': email})
        if merchant:
            return is_valid_password(merchant['password'], password)
        else:
            return False
        
    def create_session(self, email: str) -> str:
        """Create session ID.....Implement redis here to hold the session and expire it
        after 24 hours"""
        merchant = self._db.find_merchant({'email': email})
        if merchant:
            session_id = _generate_uuid()
            self._db.update_merchant({'_id': merchant['_id']}, {'session_id': session_id})
            return session_id
        else:
            return None
        
    def get_user_from_session_id(self, session_id: str):
        """Get a registered merchant using the session id, no need
        to input login details"""
        if not session_id:
            return None
        merchant = self._db.find_merchant({'session_id': session_id})
        if merchant:
            return merchant
        else:
            return None
        
    def destroy_session(self, merchant_id) -> None:
        """Destroy session ID of a merchant when a merchant logout"""
        if not merchant_id:
            return None
        self._db. update_merchant({'_id': merchant_id}, {'session_id': None})
