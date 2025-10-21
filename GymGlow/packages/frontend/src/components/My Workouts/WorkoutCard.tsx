import type {WorkoutDTO} from "../../types/Data Transfer Objects/WorkoutDTO.ts";
import {Link} from "react-router-dom";

type Props = {
    workout: WorkoutDTO;
}

const WorkoutCard : React.FC<Props> = ({workout}) => {
    return (
        <Link
            to={`/root/workoutDetails/${workout.id}`}
            state={{workout}}
            style={{ textDecoration: 'none', color: 'inherit' }}
            key={workout.id}>
            <div className="card mx-auto" style = {{ width: '60rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{workout.title}</h5>
                    <p className="card-text">{workout.description}</p>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;
