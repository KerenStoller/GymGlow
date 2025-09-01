from fastapi import APIRouter, Depends
from app.db.connection import get_db
from app.endpoints.auth.schemas import User
from app.endpoints.auth.token import get_current_user
from app.db.workouts_crud import get_workouts_by_user, create_workout as create_workout_db
from app.db.connection import Session
from app.endpoints.workouts.schemas import WorkoutPlanSchema

router = APIRouter(prefix="/workouts", tags=["workouts"])


@router.get("/", status_code=200, response_model=list[WorkoutPlanSchema])
async def get_my_workouts(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_workouts_by_user(db, user)

@router.get("/example", status_code=200, response_model=WorkoutPlanSchema)
async def example_endpoint(db: Session = Depends(get_db)):
    return WorkoutPlanSchema(name="Example Workout", description="This is an example workout plan.")

@router.post("/create", status_code=201)
async def create_workout(new_workout: WorkoutPlanSchema, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in create workout!")
    print(new_workout)
    create_workout_db(db, user, new_workout.name, new_workout.description)
    return {"success": True}

@router.put("/delete", status_code=204)
async def delete_workout(workout_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    pass

@router.put("/update", status_code=204)
async def update_workout(workout_id: int, new_workout: WorkoutPlanSchema, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    pass