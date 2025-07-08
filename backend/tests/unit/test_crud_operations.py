from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ... import crud, schemas
from ...database import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def test_create_and_get_user():
    db = TestingSessionLocal()
    user_in = schemas.UserCreate(email="test@example.com", password="testpassword")
    db_user = crud.create_user(db, user=user_in, hashed_password="hashedpassword")
    retrieved_user = crud.get_user(db, user_id=db_user.id)
    assert retrieved_user.email == user_in.email
    db.close()