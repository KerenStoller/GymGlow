import WorkoutCard from "./WorkoutCard.tsx";
import ExerciseCard from "./ExerciseCard.tsx";
import type {WorkoutDTO} from "../../types/WorkoutDTO.ts";
import {isWorkoutDTO} from "../../types/WorkoutDTO.ts";
import type {ExerciseDTO} from "../../types/ExerciseDTO.ts";
import type {WorkoutPlanRequest} from "../../types/WorkoutPlanRequest.ts";

type Props = {
    list: WorkoutDTO[] | ExerciseDTO[];
    handleDelete?: (id:string) => Promise<void>;
    handleUpdate?: (id:string, workout_plan:WorkoutPlanRequest) => Promise<void>;
}

const WorkoutOrExerciseList: React.FC<Props> = ({list, handleDelete, handleUpdate}) => {

    return (
        <div className="container pt-2">
            {list.length === 0 ? (
            <div className="text-center">
                <p className="fs-5 text-muted">You have no workouts yet.</p>
            </div>
            ) : (
                <div className="d-flex flex-column align-items-center gap-3">
                    <p className="fs-6 text-muted mb-2">Click a workout to view more</p>

                    {list.map((workout) =>
                        isWorkoutDTO(workout) ?
                            (<div key={workout.id} className="w-100 d-flex justify-content-center">
                                <WorkoutCard
                                    workoutDetails={workout}
                                    onDelete={handleDelete}
                                    onUpdate={handleUpdate}/>
                            </div>) :
                            (<div className="w-100 d-flex justify-content-center">
                                <ExerciseCard key={workout.id} {...workout} />
                            </div>)
                        )}
                </div>
            )}
        </div>
    );
};

export default WorkoutOrExerciseList;
