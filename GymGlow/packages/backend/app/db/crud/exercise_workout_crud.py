from sqlalchemy.orm import Session
from uuid import UUID
from app.db.models import WorkoutPlan, Exercise, WorkoutExercise
from app.endpoints.workout_exercise.schemas import WorkoutExerciseCreateSchema, WorkoutExerciseSchema, ExercisesOfWorkoutSchema
from app.endpoints.exercises.schemas import ExerciseSchema
from app.db.crud.exercises_crud import get_exercise_by_id


def add_exercise_to_workout(db: Session, workout_id: UUID, exercise_id: UUID, new_relation: WorkoutExerciseCreateSchema):
    workout = db.query(WorkoutPlan).filter(WorkoutPlan.id == workout_id).first()
    exercise = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if workout and exercise:
        print(new_relation)
        workout_exercise = WorkoutExercise(
            workout_plan_id=workout.id,
            exercise_id=exercise.id,
            sets=new_relation.sets,
            reps=new_relation.reps,
            weight=new_relation.weight,
        )
        db.add(workout_exercise)
        db.commit()
        db.refresh(workout)


def get_workout_exercises(db: Session, workout_id: UUID):
    list_of_relations = db.query(WorkoutExercise).filter(WorkoutExercise.workout_plan_id == workout_id).all()
    result = []
    print("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§")
    for relation_model in list_of_relations:
        exercise_model = get_exercise_by_id(db, relation_model.exercise_id)
        exercise_schema = ExerciseSchema.model_validate(exercise_model)
        relation_schema = WorkoutExerciseSchema.model_validate(relation_model)
        print("validated relation schema:", relation_schema)
        workout_exercise = ExercisesOfWorkoutSchema(
            id=relation_schema.id,
            exercise=exercise_schema,
            sets=relation_schema.sets,
            reps=relation_schema.reps,
            weight=relation_schema.weight)
        print(workout_exercise)
        result.append(workout_exercise)
        print(f"Relation: WorkoutPlan ID = {relation_model.workout_plan_id}, Exercise ID = {relation_model.exercise_id}, Sets = {relation_model.sets}, Reps = {relation_model.reps}, Weight = {relation_model.weight}")

    print("§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§")
    return result
