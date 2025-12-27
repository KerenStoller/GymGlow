from pydantic import BaseModel
from uuid import UUID
from app.endpoints.workout_exercise.schemas import WorkoutExerciseCreateSchema

class WorkoutPlanSchema(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    description: str

    model_config = {
        'from_attributes': True
    }

class WorkoutPlanCreateSchema(BaseModel):
    title: str
    description: str
    exercises: list[WorkoutExerciseCreateSchema]
    model_config = {
        'from_attributes': True
    }