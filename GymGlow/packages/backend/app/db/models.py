from uuid import UUID, uuid4
from app.db.connection import Base
from sqlalchemy.dialects.postgresql import UUID  # if using Postgres
from sqlalchemy import Column, String, ForeignKey


class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    email = Column("email", String, nullable=False, unique=True, index=True)
    name = Column("name", String, nullable=False)
    hashed_password = Column("hashed_password", String, nullable=False)


class Exercise(Base):
    __tablename__ = "exercises"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column("name", String, nullable=False)
    description = Column("description", String, nullable=True)
    muscle_group = Column("muscle_group", String, nullable=True)
    equipment = Column("equipment", String, nullable=True)
    image = Column("image", String, nullable=True)


class WorkoutPlan(Base):
    __tablename__ = "workout_plans"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(ForeignKey("users.id"), nullable=False)
    name = Column("name", String, nullable=False)
    description = Column("description", String, nullable=True)
    #exercises =