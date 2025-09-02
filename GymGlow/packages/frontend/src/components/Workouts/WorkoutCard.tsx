import {useState} from 'react';
import type {WorkoutPlanDTO} from "../../types/workoutPlanResponse.ts";
import type {WorkoutPlanRequest} from "../../types/WorkoutPlanRequest.ts";
import WorkoutForm from "./WorkoutForm.tsx";
//TODO: update adminId dynamically
const adminId = '3a9083c2-c28e-4740-a5ed-4569a24e8ecf';

type Props = {
    workoutDetails: WorkoutPlanDTO;
    onDelete?: (id: string) => Promise<void>;
    onUpdate?: (id: string, workout_plan:WorkoutPlanRequest) => Promise<void>;
}

const WorkoutCard : React.FC<Props> = ({workoutDetails, onDelete, onUpdate}) => {
    const isExampleWorkout = workoutDetails.user_id === adminId;
    const [updateMode, setUpdateMode] = useState<boolean>(false);
    const modalId = `workoutModal-${workoutDetails.id}`;

    function handleDelete()
    {
        onDelete!(workoutDetails.id);
    }

    function handleUpdateClick()
    {
        setUpdateMode(true);
    }

    function handleEdit(new_workout: WorkoutPlanRequest)
    {
        onUpdate!(workoutDetails.id, new_workout);
        setUpdateMode(false);
    }

    return (
        <div className="card mx-auto"  style = {{ width: '60rem' }}>
            {/* div - button trigger modal */}
            <div className="card-body" role="button" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                <h5 className="card-title">{workoutDetails.name}</h5>
                <p className="card-text">{workoutDetails.description}</p>
            </div>
            {/* Modal */}
            <div className="modal fade" id={modalId} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={`${modalId}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${modalId}Label`}>{workoutDetails.name}</h1>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {workoutDetails.description}
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <div style={{ width: '100%', maxWidth: '500px' }}>
                                {updateMode && (<WorkoutForm functionOnSubmit={handleEdit} mode="Update" inModal={true}/>)}
                            </div>
                        </div>
                        <div className="modal-footer">
                            {!isExampleWorkout && <button className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>}
                            {!isExampleWorkout && <button className="btn btn-outline-primary" onClick={handleUpdateClick}>Edit</button>}
                            <button className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
