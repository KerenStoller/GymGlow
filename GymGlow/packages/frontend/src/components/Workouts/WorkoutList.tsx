import WorkoutCard from "./WorkoutCard.tsx";
import type {WorkoutPlanDTO} from "../../types/workoutPlanResponse.ts";


type Props = {
    workoutList: WorkoutPlanDTO[];
}

const WorkoutList: React.FC<Props> = ({workoutList}) => {
    return (
        <div className="container pt-2">
            {workoutList.length === 0 ? (
            <div className="text-center">
                <p className="fs-5 text-muted">You have no workouts yet.</p>
            </div>
            ) : (
                <div className="d-flex flex-column align-items-center gap-3">
                    <p className="fs-6 text-muted mb-2">Click a workout to view options</p>
                    {workoutList.map((workout) => (
                        <div key={workout.id} className="w-100 d-flex justify-content-center">
                            <WorkoutCard {...workout} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkoutList;
