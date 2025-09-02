import { useState } from 'react';
import type {WorkoutPlanRequest} from "../../types/WorkoutPlanRequest.ts";

type WorkoutFormProps = {
    functionOnSubmit: (new_workout: WorkoutPlanRequest) => void;
    mode?: string;
    inModal?: boolean;
}

const WorkoutForm : React.FC<WorkoutFormProps> = ({functionOnSubmit, mode, inModal}) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const buttonText = mode ? 'Update Workout' : 'Create Workout';

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        functionOnSubmit({ title, description });
        setTitle('');
        setDescription('');
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Workout Title"
                    className="form-control"
                    required={true}
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Workout Description"
                    className="form-control"
                    required={true}
                />
                <button className="btn btn-outline-primary btn-sm" type="submit">{buttonText}</button>
            </form>
        </div>
    );
};

export default WorkoutForm;
