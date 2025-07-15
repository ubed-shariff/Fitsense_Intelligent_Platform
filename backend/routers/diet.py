import os
import httpx
from fastapi import APIRouter, Depends, HTTPException
import schemas
from dependencies import get_current_user

router = APIRouter()

ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://ml_service:8001")

@router.get("/plan", response_model=schemas.DietPlan)
async def get_diet_plan(current_user: schemas.UserInDB = Depends(get_current_user)):
    user_profile = {
        "age": current_user.get("age"),
        "weight": current_user.get("weight"),
        "height": current_user.get("height"),
        "gender": current_user.get("gender"),
        "health_conditions": current_user.get("health_conditions"),
        "dietary_preferences": current_user.get("dietary_preferences"),
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{ML_SERVICE_URL}/predict/diet", json=user_profile)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Error from ML service")