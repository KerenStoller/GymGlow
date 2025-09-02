import WorkoutCard from "./WorkoutCard.tsx";
import type {WorkoutPlanDTO} from "../../types/workoutPlanResponse.ts";
import type {WorkoutPlanRequest} from "../../types/WorkoutPlanRequest.ts";

type Props = {
    workoutList: WorkoutPlanDTO[];
    handleDelete?: (id:string) => Promise<void>;
    handleUpdate?: (id:string, workout_plan:WorkoutPlanRequest) => Promise<void>;
}

const WorkoutList: React.FC<Props> = ({workoutList, handleDelete, handleUpdate}) => {

    return (
        <div className="container pt-2">
            {workoutList.length === 0 ? (
            <div className="text-center">
                <p className="fs-5 text-muted">You have no workouts yet.</p>
            </div>
            ) : (
                <div className="d-flex flex-column align-items-center gap-3">
                    <p className="fs-6 text-muted mb-2">Click a workout to view more</p>
                    {workoutList.map((workout) => (
                        <div key={workout.id} className="w-100 d-flex justify-content-center">
                            <WorkoutCard workoutDetails={workout} onDelete={handleDelete} onUpdate={handleUpdate} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkoutList;
