import { useParams, useLocation, useNavigate } from "react-router-dom";
import {useState} from "react";
import {API} from "../../utils/endpoints.ts";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate.ts";
import type {WorkoutDTO} from "../../types/Data Transfer Objects/WorkoutDTO.ts";
import type {WorkoutPlanRequest} from "../../types/Requests/WorkoutPlanRequest.ts";
import WorkoutForm from "../Create Workout/WorkoutForm.tsx";
import type WorkoutExerciseDTO from "../../types/Data Transfer Objects/WorkoutExerciseDTO.tsx";

const EditWorkout = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const workout: WorkoutDTO = location.state?.workout as WorkoutDTO;
    const exercises: WorkoutExerciseDTO[] = location.state?.exercises as WorkoutExerciseDTO[];
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');


    function onClose() {
        navigate('/root/workouts');
    }

    async function updateWorkout(updatedWorkout: WorkoutPlanRequest)
    {
        setLoading(true);
        setErrorMsg('');

        try
        {
            await axiosPrivate.put(
                API.WORKOUT_PLANS.UPDATE + `/${id}`,
                {title: updatedWorkout.title, description: updatedWorkout.description, exercises: updatedWorkout.exercises},
                {
                    headers: { 'Content-Type': 'application/json' },
                });
        }
        catch (e: any)
        {
            setErrorMsg(e.message);
        }

        setLoading(false);
        navigate('/root/workouts');
    }

    async function deleteWorkout()
    {
        setErrorMsg('');
        setLoading(true);

        try
        {
            await axiosPrivate.delete(
                API.WORKOUT_PLANS.DELETE + `/${id}`);
        }
        catch(e: any)
        {
            setErrorMsg(e.message);
        }

        setLoading(false);
        navigate('/root/workouts');
    }

    return (
        <div className="card mx-auto" style={{ width: "60rem" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">Edit Workout</h5>
                <button className="btn-close" onClick={onClose} aria-label="Close" />
            </div>

            <div className="card-body">
                <WorkoutForm
                    functionOnSubmit={updateWorkout}
                    initialData={{
                        title: workout.title,
                        description: workout.description || "",
                        exercises: exercises.map((exercise: WorkoutExerciseDTO) => {
                            return {
                                id: exercise.exercise_id,
                                sets: exercise.sets,
                                reps: exercise.reps,
                                weight: exercise.weight,
                            }
                        }) || [],
                    }}
                    mode="edit"
                    inModal={true}
                />
            </div>

            <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-outline-danger ms-auto" onClick={deleteWorkout} disabled={loading}>
                    Delete
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>
    );
};

export default EditWorkout;
