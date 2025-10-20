import type WorkoutExerciseDTO from "../types/Data Transfer Objects/WorkoutExerciseDTO.tsx";

const WorkoutExerciseCard = (exercise: WorkoutExerciseDTO) => {
    console.log("ExerciseCard", exercise);
    return (
        <div
            className="d-flex mx-auto align-items-start w-100"
            style={{
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            backgroundColor: '#fff',
            maxWidth: '100%', // Ensure not to exceed container
            }}
        >
            <div className="flex-grow-1">
                <p className="fw-bold mb-2" style={{ fontSize: '1.1rem' }}>
                    {exercise.exercise_name}
                </p>
                <p>
                    Sets: {exercise.sets ?? 'N/A'} | Reps: {exercise.reps ?? 'N/A'} | Weight: {exercise.weight ?? 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default WorkoutExerciseCard;
