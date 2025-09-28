from pydantic import BaseModel
from uuid import UUID

class WorkoutPlanSchema(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    description: str

    class Config:
        orm_mode = True

class WorkoutPlanCreateSchema(BaseModel):
    title: str
    description: str
    exercisesIds: list[UUID]
    class Config:
        orm_mode = True