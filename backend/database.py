import os
from pymongo import MongoClient

DATABASE_URL = os.getenv("DATABASE_URL", "mongodb://mongo:27017/")
DATABASE_NAME = os.getenv("DATABASE_NAME", "fitgenie")

client = MongoClient(
    DATABASE_URL,
    maxPoolSize=100,
    minPoolSize=5,
    serverSelectionTimeoutMS=5000
)

try:
    client.admin.command('ping')
    print("[MongoDB] Connected successfully.")
except Exception as e:
    print("[MongoDB] Connection failed:", e)

db = client[DATABASE_NAME]

def get_database():
    return db
