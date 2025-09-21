from fastapi import APIRouter, Depends
from uuid import UUID
from app.db.setup.connection import get_db
from app.endpoints.auth.schemas import User
from app.endpoints.auth.token import get_user_from_access_token
from app.db.crud.workouts_crud import (get_workouts_by_user,
                                       create_workout as create_workout_db,
                                       get_workouts_by_admin,
                                       delete_workout as delete_workout_db,
                                       update_workout as update_workout_db)
from sqlalchemy.orm import Session
from app.endpoints.workouts.schemas import WorkoutPlanSchema, WorkoutPlanCreateSchema

router = APIRouter(prefix="/workouts", tags=["workouts"])

@router.get("/", status_code=200, response_model=list[WorkoutPlanSchema])
async def get_my_workouts(user: User = Depends(get_user_from_access_token), db: Session = Depends(get_db)):
    return get_workouts_by_user(db, user)

@router.get("/example", status_code=200, response_model=list[WorkoutPlanSchema])
def example_endpoint(db: Session = Depends(get_db)):
    return get_workouts_by_admin(db)

@router.post("/create", status_code=201)
async def create_workout(new_workout: WorkoutPlanCreateSchema, user: User = Depends(get_user_from_access_token), db: Session = Depends(get_db)):
    create_workout_db(db, user, new_workout.name, new_workout.description)
    return {"success": True}

@router.delete("/delete/{workout_id}", status_code=204)
async def delete_workout(workout_id: UUID, user: User = Depends(get_user_from_access_token), db: Session = Depends(get_db)):
    delete_workout_db(db, user, workout_id)

@router.put("/update/{workout_id}", status_code=204)
async def update_workout(workout_id: UUID, new_workout: WorkoutPlanCreateSchema, user: User = Depends(get_user_from_access_token), db: Session = Depends(get_db)):
    update_workout_db(db, user, workout_id, new_workout.name, new_workout.description)
