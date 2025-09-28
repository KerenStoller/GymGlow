import {Link} from "react-router-dom";
//import WorkoutCard from "./WorkoutCard.tsx";
import type {WorkoutDTO} from "../types/WorkoutDTO.ts";

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
                            <Link
                                to={`/root/workoutDetails/${workout.id}`}
                                state={{workout}}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                key={workout.id}>
                                {/* in the future move this to Workout Card that shows name and description*/}
                                <div className="card mx-auto" style = {{ width: '60rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{workout.title}</h5>
                                        <p className="card-text">{workout.description}</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                </div>
            )}
        </div>
    );
};

export default WorkoutList;
