import type {ExerciseDTO} from "../types/ExerciseDTO.ts";

const ExerciseCard = (exercise: ExerciseDTO) => {
    return (
        <div
            className="d-flex mx-auto align-items-start"
            style={{
            width: '60rem',
            padding: '1.5rem',
            border: '1px solid #ddd',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            }}
        >
            <div className="flex-grow-1">
                <h1 className="fw-bold mb-3" style={{ fontSize: '2rem' }}>
                    {exercise.name}
                </h1>

                <p className="text-muted mb-4" style={{ fontSize: '1rem' }}>
                    {exercise.description}
                </p>

                <div className="row mb-3 text-secondary" style={{ fontSize: '0.95rem' }}>
                    <div className="col-auto">
                      <span className="fw-semibold">Muscle Group:</span> {exercise.muscle_group}
                    </div>

                    {exercise.equipment && (
                        <div className="col-auto">
                          <span className="fw-semibold">Equipment:</span> {exercise.equipment}
                        </div>
                    )}
                </div>

                <div className="mt-3">
                    <h6 className="text-dark fw-semibold mb-2">💡 Tips</h6>
                    <p className="text-body" style={{ fontSize: '0.95rem' }}>
                        {exercise.tips}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExerciseCard;
