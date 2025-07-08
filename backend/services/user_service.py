from sqlalchemy.orm import Session
from .. import crud, schemas
from ..core import security

def create_user(db: Session, user: schemas.UserCreate):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise ValueError("Email already registered")
    hashed_password = security.get_password_hash(user.password)
    db_user = crud.create_user(db=db, user=user, hashed_password=hashed_password)
    return db_user