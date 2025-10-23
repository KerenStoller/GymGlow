from fastapi import FastAPI
from app.endpoints.auth.auth import router as auth_router
from app.endpoints.workouts.workouts import router as workouts_router
from app.endpoints.exercises.exercises import router as exercises_router
from app.endpoints.workout_exercise.workout_exercise import router as workout_exercise_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GymGlow API",
    description="Backend API for GymGlow monorepo",
    version="1.0.0")

# Allow local frontend to use cookies (HttpOnly JWT) with cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://frontend-react-csa1.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

# Mount auth routes at /auth/*
app.include_router(auth_router)
app.include_router(workouts_router)
app.include_router(exercises_router)
app.include_router(workout_exercise_router)