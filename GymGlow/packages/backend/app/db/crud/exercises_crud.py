from sqlalchemy.orm import Session
from app.db.models import Exercise

def get_all_example_exercises(db: Session):
    return db.query(Exercise).all()

def create_new_exercise(db: Session, exercise_data):
    new_exercise = Exercise(
        name=exercise_data.name,
        description=exercise_data.description,
        muscle_group=exercise_data.muscle_group,
        equipment=exercise_data.equipment,
        tips=exercise_data.tips
    )
    db.add(new_exercise)
    db.commit()
    db.refresh(new_exercise)
    return new_exercise

def get_exercise_by_id(db: Session, exercise_id):
    result = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if result is None:
        print("Exercise not found")
        raise ValueError(f"Exercise with id {exercise_id} not found")
    return result