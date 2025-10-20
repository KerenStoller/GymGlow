from sqlalchemy.orm import Session
from app.db.models import WorkoutPlan, WorkoutExercise
from app.db.models import User
from app.endpoints.auth.schemas import User as AuthUser
from app.endpoints.workout_exercise.schemas import WorkoutExerciseCreateSchema
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

def create_workout(db: Session, user: AuthUser, title: str, description: str, exercises: list[WorkoutExerciseCreateSchema]):
    user_id = UUID(user.id)
    new_workout = WorkoutPlan(user_id=user_id, title=title, description=description)
    db.add(new_workout)
    db.commit()
    db.refresh(new_workout)
    for exercise in exercises:
        ## TODO: validate exercise_id exists
        workout_exercise = WorkoutExercise(
            workout_plan_id=new_workout.id,
            exercise_id=exercise.id,
            sets=exercise.sets,
            reps=exercise.reps,
            weight=exercise.weight)
        db.add(workout_exercise)
    db.commit()

def create_admin_workout(db: Session):
    admin = db.query(User).filter(User.email == "admin@admin").first()
    if not admin:
        return
    admin_workout = WorkoutPlan(user_id=admin.id, title="Admin Workout", description="This is the default admin workout plan.")
    db.add(admin_workout)
    db.commit()
    db.refresh(admin_workout)

def delete_workout(db: Session, user: AuthUser, workout_id: UUID):
    user_id = UUID(user.id)
    workout = db.query(WorkoutPlan).filter(WorkoutPlan.id == workout_id, WorkoutPlan.user_id == user_id).first()
    if workout:
        db.delete(workout)
        db.commit()

def update_workout(db: Session, user: AuthUser, workout_id: UUID, title: str, description: str):
    user_id = UUID(user.id)
    workout = db.query(WorkoutPlan).filter(WorkoutPlan.id == workout_id, WorkoutPlan.user_id == user_id).first()
    if workout:
        workout.title = title
        workout.description = description
        db.commit()
        db.refresh(workout)
