from uuid import uuid4
from app.db.setup.base import Base
from sqlalchemy.dialects.postgresql import UUID  # if using Postgres
from sqlalchemy import Column, String, ForeignKey, Integer

class RefreshToken(Base):
    __tablename__ = "refresh_tokens"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(ForeignKey("users.id"), nullable=False)
    token = Column("token", String, nullable=False, unique=True)
    #expiry = Column("expiry", String, nullable=True)  # Optional: to track expiry time

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
    description = Column("description", String, nullable=False)
    muscle_group = Column("muscle_group", String, nullable=False)
    equipment = Column("equipment", String, nullable=True)
    tips = Column("tips", String, nullable=True)


class WorkoutPlan(Base):
    __tablename__ = "workout_plans"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(ForeignKey("users.id"), nullable=False)
    title = Column("title", String, nullable=False)
    description = Column("description", String, nullable=True)


class WorkoutExercise(Base):
    __tablename__ = "workout_plan_exercises"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    workout_plan_id = Column(UUID, ForeignKey("workout_plans.id"), nullable=False)
    exercise_id = Column(UUID, ForeignKey("exercises.id"), nullable=False)
    sets = Column("sets", Integer, nullable=False)
    reps = Column("reps", Integer, nullable=False)
    weight = Column("weight", String, nullable=False)