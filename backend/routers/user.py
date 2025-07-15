from fastapi import APIRouter, Depends, HTTPException
import schemas
import crud
from dependencies import get_current_user
from pymongo.database import Database
from database import get_database

router = APIRouter()

@router.get("/me", response_model=schemas.UserInDB)
def read_users_me(current_user: schemas.UserInDB = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=schemas.UserInDB)
def update_user_me(
    user_update: schemas.UserInDB,
    db: Database = Depends(get_database),
    current_user: schemas.UserInDB = Depends(get_current_user),
):
    user = crud.get_user(db, email=current_user["email"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.dict(exclude_unset=True)
    
    # Exclude fields that should not be updated this way
    update_data.pop("email", None)
    update_data.pop("hashed_password", None)

    db.users.update_one({"email": current_user["email"]}, {"$set": update_data})
    
    updated_user = crud.get_user(db, email=current_user["email"])
    return updated_user