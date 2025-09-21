from pydantic import BaseModel
from uuid import UUID
from app.endpoints.exercises.schemas import ExerciseSchema

class WorkoutExerciseSchema(BaseModel):
    id: UUID
    workout_plan_id: UUID
    exercise_id: UUID
    sets: str
    reps: str
    weight: str

    model_config = {
        'from_attributes': True
    }

class WorkoutExerciseCreateSchema(BaseModel):
    sets: str
    reps: str
    weight: str

class ExercisesOfWorkoutSchema(BaseModel):
    id: UUID
    exercise: ExerciseSchema
    sets: str
    reps: str
    weight: str

    model_config = {
        'from_attributes': True
    }