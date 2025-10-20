import { useParams, useLocation, useNavigate } from "react-router-dom";
import {useState, useRef} from "react";
import {API} from "../utils/endpoints.ts";
import {useAxiosPrivate} from "../hooks/useAxiosPrivate.ts";
import type {WorkoutDTO} from "../types/Data Transfer Objects/WorkoutDTO.ts";

const EditWorkout = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const workout: WorkoutDTO = location.state?.workout as WorkoutDTO;
    const axiosPrivate = useAxiosPrivate();

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');


    function onClose() {
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


    async function saveChanges()
    {
        setErrorMsg('');
        setLoading(true);
        const title = titleRef.current!.value;
        const description = descriptionRef.current!.value;

        if(title === workout.title && description === workout.description)
        {
            setLoading(false);
            navigate('/root/workouts');
            return;
        }

        try
        {
            await axiosPrivate.put(
                API.WORKOUT_PLANS.UPDATE + `/${id}`,
                {title, description, exercises: []},
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

    return (
        <div className="card mx-auto" style={{ width: "60rem" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <div className="card-title">
                    <label htmlFor="title" className="form-label">
                        Title:
                    </label>
                    <input
                        id="title"
                        name="title"
                        className="form-control"
                        defaultValue={workout.title}
                        ref={titleRef}
                    />
                </div>
                <button className="btn-close" onClick={onClose} aria-label="Close" />
            </div>

            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description:
                    </label>
                    <input
                    id="description"
                    name="description"
                    className="form-control"
                    defaultValue={workout.description? workout.description : ''}
                    ref={descriptionRef}
                    />
                </div>
            </div>

            <div className="card-footer d-flex justify-content-between">
                <button
                    className="btn btn-outline-danger"
                    onClick={deleteWorkout}
                    disabled={loading}
                >
                    Delete
                </button>
                <button
                    className="btn btn-primary"
                    onClick={saveChanges}
                    disabled={loading}
                >
                    Save
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>
    );
};

export default EditWorkout;
