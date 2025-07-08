from fastapi import FastAPI
from .models import DietModel, WorkoutModel, CalorieModel
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()

diet_model = DietModel()
workout_model = WorkoutModel()
calorie_model = CalorieModel()

class UserProfile(BaseModel):
    age: Optional[int] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    gender: Optional[str] = None
    health_conditions: List[str] = []
    dietary_preferences: List[str] = []

class ActivityData(BaseModel):
    name: str
    duration_minutes: int

@app.post("/predict/diet")
def predict_diet(user_profile: UserProfile):
    return diet_model.predict(user_profile.dict())

@app.post("/predict/workout")
def predict_workout(user_profile: UserProfile):
    return workout_model.predict(user_profile.dict())

@app.post("/predict/calories")
def predict_calories(activity_data: ActivityData):
    return calorie_model.predict(activity_data.dict())