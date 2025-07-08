import os
from pymongo import MongoClient

DATABASE_URL = os.getenv("DATABASE_URL", "mongodb://mongo:27017/fitgenie")

client = MongoClient(DATABASE_URL)
db = client.get_database()

def get_database():
    return db