from pymongo.database import Database
import schemas
import security

def get_user(db: Database, email: str):
    return db.users.find_one({"email": email})

def create_user(db: Database, user: schemas.UserCreate):
    hashed_password = security.get_password_hash(user.password)
    db_user = schemas.UserInDB(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    db.users.insert_one(db_user.dict())
    return db_user