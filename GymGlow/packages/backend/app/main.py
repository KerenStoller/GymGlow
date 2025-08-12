from fastapi import FastAPI

app = FastAPI(title="My Monorepo API")

@app.get("/health")
def health():
    return {"status": "ok"}