from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.endpoints.auth.schemas import User
from app.endpoints.auth.token import get_user_from_access_token
from app.db.setup.connection import get_db
from app.db.crud.exercise_workout_crud import (
    add_exercise_to_workout as add_exercise_to_workout_db,
    get_workout_exercises as get_workout_exercises_db,)
from app.endpoints.workout_exercise.schemas import WorkoutExerciseCreateSchema, ExercisesOfWorkoutSchema

router = APIRouter(prefix="/workout_exercises", tags=["workout_exercises"])

@router.post("/add/{workout_id}/{exercise_id}", status_code=201)
async def add_exercise_to_workout(workout_id: UUID, exercise_id: UUID, new_workout_exercise: WorkoutExerciseCreateSchema, db: Session = Depends(get_db), user: User = Depends(get_user_from_access_token)):
    return add_exercise_to_workout_db(db, workout_id, exercise_id, new_workout_exercise)

@router.get("/get_exercises/{workout_id}", response_model=list[ExercisesOfWorkoutSchema])
def get_workout_exercises(workout_id: UUID, db: Session = Depends(get_db)):
    return get_workout_exercises_db(db, workout_id)