from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from pymongo.database import Database
import crud
import schemas
import security
from database import get_database

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

def get_current_user(
    db: Database = Depends(get_database),
    token: str = Depends(oauth2_scheme),
) -> schemas.UserInDB:
    try:
        payload = security.jwt.decode(
            token, security.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = crud.get_user(db, email=email)
    if user is None:
        raise credentials_exception

    # Optional: Check if user is active
    if not user.get("is_active", True):
        raise HTTPException(status_code=400, detail="Inactive user")

    return schemas.UserInDB(**user)
