from pydantic import BaseModel
from uuid import UUID

class WorkoutPlanSchema(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    description: str

    class Config:
        orm_mode = True

class WorkoutPlanCreateSchema(BaseModel):
    name: str
    description: str