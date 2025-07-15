from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import auth, diet, workout, tracker, user

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(diet.router, prefix="/diet", tags=["diet"])
app.include_router(workout.router, prefix="/workout", tags=["workout"])
app.include_router(tracker.router, prefix="/tracker", tags=["tracker"])
app.include_router(user.router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the FitGenie Backend!"}