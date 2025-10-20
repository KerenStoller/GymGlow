import { useRef, useState, useEffect } from 'react';
import type {WorkoutPlanRequest} from "../types/Requests/WorkoutPlanRequest.ts";
import type {ExerciseExplanationDTO} from "../types/Data Transfer Objects/ExerciseExplanationDTO.ts";
import type {ExerciseDetails} from "../types/Requests/WorkoutPlanRequest.ts";
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
    const [exercisesToChooseFrom, setExercisesToChooseFrom] = useState<ExerciseExplanationDTO[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<ExerciseDetails[]>([]);


    const buttonText = mode ? 'Update Workout' : 'Create Workout';

    useEffect(() => {
        async function getExercises(){
            //TODO: implement React Query

            try
            {
                const response = await axios.get(API.EXERCISES.GET_ALL);
                setExercisesToChooseFrom(response.data);
            }
            catch (e: any)
            {
                console.error(e.message);
            }
        }

        getExercises();
    }, []);

    function handleExerciseToggle(exercise: ExerciseDetails)
    {
        setSelectedExercises(prev => {
            const exists = prev.find(e => e.id === exercise.id);
            if (exists)
            {
                return prev.filter(e => e.id !== exercise.id);
            } else
            {
                return [...prev, exercise];
            }
        });
    }

    function handleSubmit(event: React.FormEvent)
    {
        event.preventDefault();
        functionOnSubmit(
            { title: title.current!.value, description: description.current!.value,
            exercises: [...selectedExercises] });
        title.current!.value = '';
        description.current!.value = '';
        setSelectedExercises([]);
    }

    function updateExerciseField(id: string, field: "sets" | "reps" | "weight", value: any) {
        setSelectedExercises(prev => {
            return prev.map(exercise =>
                exercise.id === id ? { ...exercise, [field]: value } : exercise);
        });
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
                  style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px'}}
            >
                <input
                    type="text" ref={title} placeholder="Workout Title" className="form-control" required={true}
                />
                <textarea
                    ref={description} placeholder="Workout Description" className="form-control" required={true}
                />

                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle" type="button"
                        id="exerciseDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                    >
                        Select Exercises
                    </button>
                    <div
                        className="dropdown-menu" style={{ maxHeight: '400px', overflowY: 'auto' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <table className="table" style={{ tableLayout: 'auto', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Sets</th>
                                    <th>Reps</th>
                                    <th>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exercisesToChooseFrom.map(exercise => {
                                    const selected = selectedExercises.find(e => e.id === exercise.id);
                                    const details = selected || { id: exercise.id, sets: 0, reps: 0, weight: "0" };

                                    return (
                                        <tr key={exercise.id}>
                                            <td style={{ width: '250px', textAlign: 'left' }}>
                                                <label
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <input type="checkbox" checked={!!selected} onChange={() => handleExerciseToggle(details)}/>
                                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {exercise.name}
                                                    </span>
                                                </label>
                                            </td>
                                            <td style={{ width: '60px' }}>
                                                <input type="number" min="0" value={details.sets} disabled={!selected} style={{ width: '50px' }}
                                                    onChange={e => updateExerciseField(exercise.id, "sets", Number(e.target.value))}
                                                />
                                            </td>
                                            <td style={{ width: '60px' }}>
                                                <input type="number" min="0" value={details.reps} disabled={!selected} style={{ width: '50px' }}
                                                    onChange={e => updateExerciseField(exercise.id, "reps", Number(e.target.value))}
                                                />
                                            </td>
                                            <td style={{ width: '150px' }}>
                                                <input type="text" value={details.weight} disabled={!selected} style={{ width: '120px' }}
                                                    onChange={e => updateExerciseField(exercise.id, "weight", e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <button className="btn btn-outline-primary btn-sm" type="submit">{buttonText}</button>
            </form>
        </div>
    );
};

export default WorkoutForm;
