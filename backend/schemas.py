from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str
    age: Optional[int] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    gender: Optional[str] = None
    health_conditions: List[str] = []
    dietary_preferences: List[str] = []

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Diet Schemas
class Meal(BaseModel):
    name: str
    calories: int
    protein: float
    carbs: float
    fat: float

class DailyPlan(BaseModel):
    breakfast: Meal
    lunch: Meal
    dinner: Meal
    snacks: List[Meal]

class DietPlan(BaseModel):
    plan: List[DailyPlan]

# Workout Schemas
class Exercise(BaseModel):
    name: str
    sets: int
    reps: Optional[int] = None
    duration_minutes: Optional[int] = None

class DailyWorkout(BaseModel):
    exercises: List[Exercise]

class WorkoutPlan(BaseModel):
    plan: List[DailyWorkout]

# Calorie Tracker Schemas
class Activity(BaseModel):
    name: str
    duration_minutes: int

class CalorieBurn(BaseModel):
    calories_burned: float