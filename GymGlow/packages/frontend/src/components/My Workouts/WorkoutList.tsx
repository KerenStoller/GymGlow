import WorkoutCard from "./WorkoutCard.tsx";
import type {WorkoutDTO} from "../../types/Data Transfer Objects/WorkoutDTO.ts";

type Props = {
    list: WorkoutDTO[];
}

const WorkoutList: React.FC<Props> = ({list}) => {
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
                        <>
                            <WorkoutCard workout={workout}/>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkoutList;