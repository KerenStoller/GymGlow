/*
import {useState} from "react";
import {useLoaderData} from "react-router-dom";
import {API} from "../../utils/emdpoints.ts";
import type {WorkoutPlanDTO} from "../../types/workoutPlanResponse.ts";
*/

const Workouts = () => {
    /*
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const token = useLoaderData();
    async function getWorkouts()
    {
        setLoading(true);
        const url = API.WORKOUT_PLANS.GET_ALL;

        try
        {
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}})

            if(!response.ok)
            {
                const err = await response.json().catch(() => ({}));
                if (response.status === 404)
                {
                    throw new Error('endpoint not found');
                }
                else
                {
                    throw err;
                }
            }

            const workouts: WorkoutPlanDTO[] = await response.json();

            if (workouts.length === 0)
            {
                setResult("You have no workouts yet.");
                setLoading(false);
                return;
            }
            else
            {
                setResult(workouts[0].name);
                setLoading(false);
            }
        }
        catch (error)
        {
            setLoading(false);
            setErrorMsg('Action failed');
        }

    }
    */
    return (
        <div>

        </div>
    );
};

export default Workouts;
