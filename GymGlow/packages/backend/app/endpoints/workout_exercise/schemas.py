from pydantic import BaseModel
from uuid import UUID

class WorkoutExerciseSchema(BaseModel):
    id: UUID
    workout_plan_id: UUID
    exercise_id: UUID
    sets: int
    reps: int
    weight: str

    model_config = {
        'from_attributes': True
    }

class WorkoutExerciseCreateSchema(BaseModel):
    id: UUID
    sets: int
    reps: int
    weight: str


class ExercisesOfWorkoutSchema(BaseModel):
    id: UUID
    exercise_id: UUID
    exercise_name: str
    sets: int
    reps: int
    weight: str

    model_config = {
        'from_attributes': True
    }