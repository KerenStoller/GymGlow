from fastapi import FastAPI

app = FastAPI(title="GymGlow API",  # <- your custom title
    description="Backend API for GymGlow monorepo",
    version="1.0.0")

@app.get("/health")
def health():
    return {"status": "200 - ok"}

@app.get("/")
def root():
    return {"message": "Welcome to the My Monorepo API"}