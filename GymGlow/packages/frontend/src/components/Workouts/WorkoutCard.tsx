import type {WorkoutPlanDTO} from "../../types/workoutPlanResponse.ts";

const WorkoutCard : React.FC<WorkoutPlanDTO> = (workoutDetails) => {
    function handleEdit() {
        // Implement edit functionality here
        console.log("Edit button clicked");
    }

    function handleDelete()
    {
        // Implement delete functionality here
        console.log("Delete button clicked");
    }

    return (
        <div className="card mx-auto"  style = {{ width: '60rem' }}>
            {/* div - button trigger modal */}
            <div className="card-body" role="button" data-bs-toggle="modal" data-bs-target="#workoutModal">
                <h5 className="card-title">{workoutDetails.name}</h5>
                <p className="card-text">{workoutDetails.description}</p>
            </div>
            {/* Modal */}
            <div className="modal fade" id="workoutModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">{workoutDetails.name}</h1>
                    <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      {workoutDetails.description}
                  </div>
                  <div className="modal-footer">
                      <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
                      <button className="btn btn-outline-primary" onClick={handleEdit}>Edit</button>
                      <button className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
