from fastapi import APIRouter, Depends
from app.db.setup.connection import get_db
from sqlalchemy.orm import Session
from app.endpoints.exercises.schemas import ExerciseSchema, ExerciseCreateSchema
from app.db.crud.exercises_crud import (
        get_all_example_exercises,
        create_new_exercise as create_new_exercise_db,
    )

router = APIRouter(prefix="/exercises", tags=["exercises"])

@router.get("/all_exercises", response_model=list[ExerciseSchema])
def get_all_exercises(db: Session = Depends(get_db)):
    return get_all_example_exercises(db)

@router.post("/new_exercise")
def create_new_exercise(new_exercise: ExerciseCreateSchema, db: Session = Depends(get_db)):
    return create_new_exercise_db(db, new_exercise)