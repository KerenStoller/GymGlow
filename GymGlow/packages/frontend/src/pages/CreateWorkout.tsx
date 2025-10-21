import {useState} from "react";
import type {WorkoutPlanRequest} from "../types/Requests/WorkoutPlanRequest.ts";
import {API} from "../utils/endpoints.ts";
import WorkoutForm from "../components/Create Workout/WorkoutForm.tsx";
import {useAxiosPrivate} from "../hooks/useAxiosPrivate.ts";

const CreateWorkout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [createSuccess, setCreateSuccess] = useState<boolean>(false);

    const axiosPrivate = useAxiosPrivate();


    async function createNewWorkout(new_workout: WorkoutPlanRequest)
    {
        console.log(new_workout);
        setErrorMsg('');
        setLoading(true);

        try
        {
            await axiosPrivate.post(
                API.WORKOUT_PLANS.CREATE,
                new_workout,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            setCreateSuccess(true);
        }
        catch (e: any)
        {
            setErrorMsg(e.message);
        }

        setLoading(false);
    }

    return (
        <>
            <WorkoutForm functionOnSubmit={createNewWorkout}/>
            {createSuccess && <p style={{color: 'green'}}>Workout created successfully!</p>}
            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </>
    );
};

export default CreateWorkout;
