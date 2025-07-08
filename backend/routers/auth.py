from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pymongo.database import Database

from ... import crud, schemas, security
from ...database import get_database

router = APIRouter()

@router.post("/signup", response_model=schemas.UserBase)
def signup(user: schemas.UserCreate, db: Database = Depends(get_database)):
    db_user = crud.get_user(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    crud.create_user(db, user=user)
    return {"email": user.email, "full_name": user.full_name}


@router.post("/login", response_model=schemas.Token)
def login(db: Database = Depends(get_database), form_data: OAuth2PasswordRequestForm = Depends()):
    user = crud.get_user(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = security.create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}