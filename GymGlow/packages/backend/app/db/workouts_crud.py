from app.db.db_session import Session
from app.db.models import WorkoutPlan, Exercise
from app.db.models import User
from app.endpoints.auth.schemas import User as AuthUser
from uuid import UUID

def get_workouts_by_user(db: Session, user: AuthUser):
    user_id = UUID(user.id) # user.id came from token
    return db.query(WorkoutPlan).filter(WorkoutPlan.user_id == user_id).all()

def get_workouts_by_admin(db: Session):
    admin = db.query(User).filter(User.email == "admin@admin").first()
    if not admin:
        return None
    admin_id = admin.id
    return db.query(WorkoutPlan).filter(WorkoutPlan.user_id == admin_id).all()

def create_workout(db: Session, user: AuthUser, name: str, description: str):
    user_id = UUID(user.id)
    new_workout = WorkoutPlan(user_id=user_id, name=name, description=description)
    db.add(new_workout)
    db.commit()
    db.refresh(new_workout)

def create_admin_workout(db: Session):
    admin = db.query(User).filter(User.email == "admin@admin").first()
    if not admin:
        return
    admin_workout = WorkoutPlan(user_id=admin.id, name="Admin Workout", description="This is the default admin workout plan.")
    db.add(admin_workout)
    db.commit()
    db.refresh(admin_workout)

def delete_workout(db: Session, user: AuthUser, workout_id: UUID):
    user_id = UUID(user.id)
    workout = db.query(WorkoutPlan).filter(WorkoutPlan.id == workout_id, WorkoutPlan.user_id == user_id).first()
    if workout:
        db.delete(workout)
        db.commit()

def update_workout(db: Session, user: AuthUser, workout_id: UUID, name: str, description: str):
    user_id = UUID(user.id)
    workout = db.query(WorkoutPlan).filter(WorkoutPlan.id == workout_id, WorkoutPlan.user_id == user_id).first()
    if workout:
        workout.name = name
        workout.description = description
        db.commit()
        db.refresh(workout)

def get_all_exercises(db: Session):
    return db.query(Exercise).all()