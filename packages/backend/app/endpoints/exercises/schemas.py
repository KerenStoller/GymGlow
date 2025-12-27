from pydantic import BaseModel
from uuid import UUID


class ExerciseSchema(BaseModel):
    id: UUID
    name: str
    description: str
    muscle_group: str
    equipment: str
    tips: str

    model_config = {
        'from_attributes': True  # Enable ORM/attribute-mode parsing
    }


class ExerciseCreateSchema(BaseModel):
    name: str
    description: str
    muscle_group: str
    equipment: str | None = None
    tips: str | None = None