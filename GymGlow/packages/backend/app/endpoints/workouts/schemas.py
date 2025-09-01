from pydantic import BaseModel

class WorkoutPlanSchema(BaseModel):
    name: str
    description: str