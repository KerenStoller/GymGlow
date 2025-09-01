import {useState} from 'react';
import {useLoaderData} from "react-router-dom";
import type {WorkoutPlanDTO} from "../types/workoutPlanResponse.ts";
import WorkoutTabButton from './Workouts/WorkoutTabButton.tsx';
import WorkoutCard from './Workouts/WorkoutCard.tsx';
import {API} from "../utils/emdpoints.ts"
import WorkoutList from "./Workouts/WorkoutList.tsx";
import WorkoutForm from "./Workouts/WorkoutForm.tsx";

const HomePage = () =>
{
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<"" | "All Workouts" | "New Workout" | "Example">("");
    const NewWorkout = selectedTab === "New Workout";
    const [showAllWorkouts, setShowAllWorkouts] = useState<boolean>(false);
    const [showExample, setShowExample] = useState<boolean>(false);
    const [allWorkoutsFetched, setAllWorkoutsFetched] = useState<WorkoutPlanDTO[]>([]);
    const [exampleFetched, setExampleFetched] = useState<WorkoutPlanDTO>();
    const [createSuccess, setCreateSuccess] = useState<boolean>(false);

    const token = useLoaderData();


    async function callBackend(url: string, options: RequestInit)
    {
        try
        {
            const response = await fetch(url, options);

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

            return response;
        }
        catch (e)
        {
            setErrorMsg('Action failed');
        }
    }

    async function getAllWorkouts()
    {
        setErrorMsg('');
        setLoading(true);
        const url = API.WORKOUT_PLANS.GET_ALL;
        const options = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        };

        const response = await callBackend(url, options);
        if (response && response.ok)
        {
            try
            {
                setAllWorkoutsFetched(await response.json());
                setShowAllWorkouts(true);
            }
            catch (e)
            {
                setErrorMsg('Action failed');
            }
        }
        setLoading(false);
    }

    async function createNewWorkout(title: string, description: string)
    {
        setErrorMsg('');
        setLoading(true);

        const url = API.WORKOUT_PLANS.CREATE;
        const options = {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',},
            body: JSON.stringify({name: title, description: description}),
        };

        const response = await callBackend(url, options);

        if (response && response.status === 201)
        {
            setCreateSuccess(true);
        }

        setLoading(false);
    }

    async function getExample()
    {
        setErrorMsg('');
        if(exampleFetched)
        {
            setShowExample(true);
            return;
        }

        setLoading(true);

        const url = API.WORKOUT_PLANS.GET_EXAMPLE;
        const options = {
            method: 'GET',
        };

        const response = await callBackend(url, options);
        if (response && response.ok)
        {
            try
            {
                setExampleFetched(await response.json());
                setShowExample(true);
            }
            catch (e)
            {
                setErrorMsg('Action failed');
            }
        }

        setLoading(false);
    }

    return (
        <>
            <section id="workouts tab buttons options">
                <h3 className="m-0 text-primary">Let’s Get Moving!</h3>
                <menu>
                    <WorkoutTabButton
                        onSelect={() => {getAllWorkouts(); setSelectedTab("All Workouts")}}
                        isSelected={selectedTab === "All Workouts"}
                    >my workouts</WorkoutTabButton>
                    <WorkoutTabButton
                        onSelect={() => {setCreateSuccess(false); setSelectedTab("New Workout")}}
                        isSelected={NewWorkout}
                    >create a new workout</WorkoutTabButton>
                    <WorkoutTabButton
                        onSelect={() => {getExample(); setSelectedTab("Example")}}
                        isSelected={selectedTab === "Example"}
                    >favorite workout of the day</WorkoutTabButton>
                </menu>
            </section>
            <section id="results">
                { selectedTab === "All Workouts" && showAllWorkouts && <WorkoutList workoutList={allWorkoutsFetched}/>}
                { NewWorkout && !createSuccess && <WorkoutForm functionOnSubmit={createNewWorkout}/>}
                { NewWorkout && createSuccess && <p style={{ color: 'green' }}>Workout created successfully!</p>}
                { selectedTab === "Example" && showExample && <WorkoutCard {...exampleFetched!}/>}
            </section>
            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </>
    );
};

export default HomePage;