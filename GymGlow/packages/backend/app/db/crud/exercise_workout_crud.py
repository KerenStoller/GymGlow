from sqlalchemy.orm import Session
from uuid import UUID
from app.db.models import WorkoutPlan, Exercise, WorkoutExercise
from app.endpoints.workout_exercise.schemas import WorkoutExerciseCreateSchema, WorkoutExerciseSchema, ExercisesOfWorkoutSchema
from app.endpoints.exercises.schemas import ExerciseSchema
from app.db.crud.exercises_crud import get_exercise_by_id


def add_exercise_to_workout(db: Session, workout: WorkoutPlan, new_exercise: WorkoutExerciseCreateSchema):
    db_exercise = db.query(Exercise).filter(Exercise.id == new_exercise.id).first()
    if db_exercise:
        workout_exercise = WorkoutExercise(
            workout_plan_id=workout.id,
            exercise_id=db_exercise.id,
            sets=new_exercise.sets,
            reps=new_exercise.reps,
            weight=new_exercise.weight,
        )
        db.add(workout_exercise)
        db.commit()


def get_workout_exercises(db: Session, workout_id: UUID):
    list_of_relations = db.query(WorkoutExercise).filter(WorkoutExercise.workout_plan_id == workout_id).all()
    result = []
    for relation_model in list_of_relations:
        exercise_model = get_exercise_by_id(db, relation_model.exercise_id)
        exercise_schema = ExerciseSchema.model_validate(exercise_model)
        relation_schema = WorkoutExerciseSchema.model_validate(relation_model)
        workout_exercise = ExercisesOfWorkoutSchema(
            id=relation_schema.id,
            exercise_id=exercise_schema.id,
            exercise_name=exercise_schema.name,
            sets=relation_schema.sets,
            reps=relation_schema.reps,
            weight=relation_schema.weight)
        result.append(workout_exercise)

    return result

def update_workout_exercises(db: Session, workout: WorkoutPlan, exercises: list[WorkoutExerciseCreateSchema]):
    # delete existing relations
    db.query(WorkoutExercise).filter(WorkoutExercise.workout_plan_id == workout.id).delete()
    db.commit()

    # add new relations
    for exercise in exercises:
        add_exercise_to_workout(db, workout, exercise)
    db.commit()