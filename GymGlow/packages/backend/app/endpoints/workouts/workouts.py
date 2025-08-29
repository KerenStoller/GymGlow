from fastapi import APIRouter, Depends
from app.db.connection import get_db
from app.endpoints.auth.schemas import User
from app.endpoints.auth.token import get_current_user
from app.db.workouts_crud import get_workouts_by_user
from app.db.connection import Session

router = APIRouter(prefix="/workouts", tags=["workouts"])


@router.get("/", status_code=200)
async def get_my_workouts(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_workouts_by_user(db, user)

@router.post("/create", status_code=201)
async def create_workout():
    return {"message": "Workout created"}
