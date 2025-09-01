import { useState } from 'react';

type WorkoutFormProps = {
    functionOnSubmit: (title: string, description: string) => void;
}

const WorkoutForm : React.FC<WorkoutFormProps> = ({functionOnSubmit}) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        functionOnSubmit(title, description);
    }

    return (
        <div className="card mx-auto" style={{ width: '60rem', padding: '20px' }}>
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
                <button className="btn btn-outline-primary btn-sm" type="submit">Create Workout</button>
            </form>
        </div>
    );
};

export default WorkoutForm;
