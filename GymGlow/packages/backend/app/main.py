from fastapi import FastAPI
from app.auth.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GymGlow API",
    description="Backend API for GymGlow monorepo",
    version="1.0.0")

# Allow local frontend to use cookies (HttpOnly JWT) with cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount auth routes at /auth/*
app.include_router(auth_router)

@app.get("/health")
def health():
    return {"status": "200 - ok"}

@app.get("/")
def root():
    return {"message": "Welcome to the My Monorepo API"}
