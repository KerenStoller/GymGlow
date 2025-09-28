import { useRef, useState, useEffect } from 'react';
import type {WorkoutPlanRequest} from "../types/WorkoutPlanRequest.ts";
import type {ExerciseDTO} from "../types/ExerciseDTO.ts";
import axios from "../api/axios.ts";
import {API} from "../utils/endpoints.ts";

type WorkoutFormProps = {
    functionOnSubmit: (new_workout: WorkoutPlanRequest) => void;
    mode?: string;
    inModal?: boolean;
}

const WorkoutForm : React.FC<WorkoutFormProps> = ({functionOnSubmit, mode, inModal}) => {
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());

    const buttonText = mode ? 'Update Workout' : 'Create Workout';

    useEffect(() => {
        async function getExercises(){
            //TODO: implement loading and error handling
            // or just add the React Query

            try
            {
                const response = await axios.get(API.EXERCISES.GET_ALL);
                setExercises(response.data);
            }
            catch (e: any)
            {
                console.error(e.message);
            }
        }

        getExercises();
    }, []);


    function handleExerciseToggle(exerciseId: string) {
        setSelectedExercises(prev => {
            const next = new Set(prev);
            if (next.has(exerciseId)) {
                next.delete(exerciseId);
            } else {
                next.add(exerciseId);
            }
            return next;
        });
    }


    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        functionOnSubmit({ title: title.current!.value, description: description.current!.value, exercisesIds: [...selectedExercises] });
        title.current!.value = '';
        description.current!.value = '';
        setSelectedExercises(new Set());
    }

    return (
        <div
            className={`card ${inModal ? '' : 'mx-auto'}`}
            style={{
                width: inModal ? '100%' : '60rem',
                padding: inModal ? '0' : '20px',
                border: inModal ? 'none' : '1px solid #ccc',
                boxShadow: inModal ? 'none' : '0 0 10px rgba(0,0,0,0.1)',
                backgroundColor: inModal ? 'transparent' : '#fff'
            }}
        >
            <form onSubmit={handleSubmit}
                  className="auth-form"
                style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxWidth: '300px'
                }}>
                <input
                    type="text"
                    ref={title}
                    placeholder="Workout Title"
                    className="form-control"
                    required={true}
                />
                <textarea
                    ref={description}
                    placeholder="Workout Description"
                    className="form-control"
                    required={true}
                />
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="exerciseDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Select Exercises
                    </button>
                    <ul
                        className="dropdown-menu"
                        aria-labelledby="exerciseDropdown"
                        style={{ maxHeight: '200px', overflowY: 'auto' }}
                        onClick={e => e.stopPropagation()} // stops closing the drowpdown on clicking inside
                    >
                        {exercises.map((exercise: ExerciseDTO) => (
                            <li key={exercise.id}>
                                <div className="form-check ms-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={exercise.name}
                                        id={exercise.id}
                                        checked={selectedExercises.has(exercise.id)}
                                        onChange={() => handleExerciseToggle(exercise.id)}
                                    />
                                    <label className="form-check-label" htmlFor={exercise.id}>
                                        {exercise.name}
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="btn btn-outline-primary btn-sm" type="submit">{buttonText}</button>
            </form>
        </div>
    );
};

export default WorkoutForm;
