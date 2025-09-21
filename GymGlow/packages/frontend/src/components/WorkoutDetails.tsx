import {useParams, useNavigate, useLocation, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import type {WorkoutDTO} from "../types/WorkoutDTO.ts";
import {useAxiosPrivate} from "../hooks/useAxiosPrivate.ts";
import {API} from "../utils/endpoints.ts";
import type {ExerciseDTO} from "../types/ExerciseDTO.ts";
import ExerciseList from "./ExerciseList.tsx";
import type {WorkoutExercisesDTO} from "../types/WorkoutExercisesDTO.ts";


const WorkoutDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const workout: WorkoutDTO = location.state?.workout as WorkoutDTO;
    const axiosPrivate = useAxiosPrivate();

    const isExampleWorkout = workout.user_id === localStorage.getItem('adminId');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]); // Replace 'any' with the appropriate type for exercises
    //const [exercisesDetails, setExercisesDetails] = useState<[]>([]);


    useEffect(() => {
        async function getExercises()
        {
            setErrorMsg('');
            setLoading(true);

            try
            {
                const response = await axiosPrivate.get(API.WORKOUT_EXERCISES.GET_ALL + `/${id}`);
                setExercises(() => response.data.map((item: WorkoutExercisesDTO) => item.exercise));
            }
            catch (error)
            {
                setErrorMsg('Failed to fetch exercises for this workout.');
            }

            setLoading(false);
        }

        getExercises();
    }, [])



    const handleClose = () => {
        // Implement close functionality, e.g., navigate back or hide details
        console.log('Close button clicked');
        navigate(-1); // Navigate back to the previous page
    }

    return (
        <div className="card mx-auto" style={{ width: '60rem' }}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{workout.name}</h5>
                <button
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
                />
            </div>
            <div className="card-body">
                <p className="card-text">{workout.description}</p>
                {exercises.length > 0 ? (
                    <ExerciseList list={exercises}/>
                ) : (
                    <p className="text-muted">No exercises in this workout.</p>
                )}
            </div>
            <div className="card-footer d-flex justify-content-between">
                {!isExampleWorkout &&
                    <Link
                        to={`/root/workoutDetails/edit/${id}`}
                        state={{ workout }}
                        className="btn btn-outline-primary"
                    >
                        Edit
                    </Link>
                }
                <button className="btn btn-primary" onClick={handleClose}>Close</button>
            </div>
            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </div>
    )
};

export default WorkoutDetails;
