import os
import httpx
from fastapi import APIRouter, Depends, HTTPException
from .. import schemas
from ..dependencies import get_current_user

router = APIRouter()

ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://ml_service:8001")

@router.post("/track", response_model=schemas.CalorieBurn)
async def track_activity(
    activity: schemas.Activity,
    current_user: schemas.UserInDB = Depends(get_current_user),
):
    activity_data = {
        "name": activity.name,
        "duration_minutes": activity.duration_minutes,
        "user_profile": {
            "age": current_user.get("age"),
            "weight": current_user.get("weight"),
            "height": current_user.get("height"),
            "gender": current_user.get("gender"),
        },
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{ML_SERVICE_URL}/predict/calories", json=activity_data)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Error from ML service")