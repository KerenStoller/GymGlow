from app.db.connection import Session
from app.db.models import WorkoutPlan
from app.endpoints.auth.schemas import User as AuthUser
from uuid import UUID

def get_workouts_by_user(db: Session, user: AuthUser):
    user_id = UUID(user.id) # user.id came from token
    return db.query(WorkoutPlan).filter(WorkoutPlan.user_id == user_id).all()