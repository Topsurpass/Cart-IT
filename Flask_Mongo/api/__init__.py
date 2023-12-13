from api.auth import Auth
from api.db import DB

AUTH = Auth()
CATEGORY_db = DB('cartIt', 'category')
PRODUCT_db = DB('cartIt', 'products')