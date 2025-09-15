import {useState} from 'react';
//import {useLoaderData} from "react-router-dom";
// delete loader?
import WorkoutTabButton from './Workouts/WorkoutTabButton.tsx';
import {API} from "../utils/endpoints.ts"
import {callBackend} from "../utils/callBackend.ts";
import WorkoutOrExerciseList from "./Workouts/WorkoutOrExerciseList.tsx";
import WorkoutForm from "./Workouts/WorkoutForm.tsx";
import type {WorkoutPlanRequest} from "../types/WorkoutPlanRequest.ts";
import type {WorkoutDTO} from "../types/WorkoutDTO.ts";
import type {ExerciseDTO} from "../types/ExerciseDTO.ts";

const HomePage = () =>
{
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [selectedTab, setSelectedTab] = useState<"" | "All Workouts" | "New Workout" | "Example" | "Exercises">("");
    const NewWorkout = selectedTab === "New Workout";
    const [showAllWorkouts, setShowAllWorkouts] = useState<boolean>(false);
    const [showExample, setShowExample] = useState<boolean>(false);
    const [showExercises, setShowExercises] = useState<boolean>(false);
    const [allWorkoutsFetched, setAllWorkoutsFetched] = useState<WorkoutDTO[]>([]);
    const [exampleFetched, setExampleFetched] = useState<WorkoutDTO[]>([]);
    const [exercisesFetched, setExercisesFetched] = useState<ExerciseDTO[]>([]);
    const [createSuccess, setCreateSuccess] = useState<boolean>(false);

    async function getAndSetDataFromResponse(
        response: Response | undefined,
        setFunction:  React.Dispatch<React.SetStateAction<WorkoutDTO[]>>,
        setShow: React.Dispatch<React.SetStateAction<boolean>>)
    {
        // response can be undefined if there was a network error
        if (response && response.ok)
        {
            try
            {
                setFunction(await response.json());
                setShow(true);
            }
            catch (e)
            {
                setErrorMsg('Action failed');
            }
        }
    }

    async function getAllWorkouts() {
        setLoading(true);
        const options = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        };

        const response = await callBackend(API.WORKOUT_PLANS.GET_ALL, options, setErrorMsg);
        await getAndSetDataFromResponse(response, setAllWorkoutsFetched, setShowAllWorkouts);
        setLoading(false);
    }

    async function createNewWorkout(new_workout: WorkoutPlanRequest) {
        setErrorMsg('');
        setLoading(true);

        const options = {
            method: 'POST',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',},
            body: JSON.stringify({name: new_workout.title, description: new_workout.description}),
        };

        const response = await callBackend(API.WORKOUT_PLANS.CREATE, options, setErrorMsg);
        if (response && response.ok)
        {
            setCreateSuccess(true);
        }

        setLoading(false);
    }

    async function getExample() {
        if(exampleFetched.length > 0)
        {
            setShowExample(true);
            return;
        }

        setLoading(true);
        const options = {   method: 'GET',  };

        const response = await callBackend(API.WORKOUT_PLANS.GET_EXAMPLE, options, setErrorMsg);
        getAndSetDataFromResponse(response, setExampleFetched, setShowExample);
        setLoading(false);
    }

    async function deleteWorkout(workout_id: string) {
        setErrorMsg('');
        setLoading(true);

        const url = API.WORKOUT_PLANS.DELETE + `/${workout_id}`;
        const options = {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,}
        };

        const response = await callBackend(url, options, setErrorMsg);
        if (response && response.ok)
        {
            setAllWorkoutsFetched(allWorkoutsFetched.filter(workout => workout.id !== workout_id));
        }

        setLoading(false);
    }

    async function editWorkout(workout_id: string, new_workout: WorkoutPlanRequest) {
        setErrorMsg('');
        setLoading(true);
        const {title, description} = new_workout;

        const url = API.WORKOUT_PLANS.UPDATE + `/${workout_id}`;
        const options = {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',},
            body: JSON.stringify({name: title, description: description}),
        };

        const response = await callBackend(url, options, setErrorMsg);
        if (response && response.ok)
        {
            setAllWorkoutsFetched(allWorkoutsFetched.map(workout => {
                if (workout.id === workout_id) {
                    return {...workout, name: title, description: description};
                }
                return workout;
            }));
        }

        setLoading(false);
    }

    async function getExercises(){
        setLoading(true);
        const options = {   method: 'GET',  };
        const response = await callBackend(API.WORKOUT_PLANS.GET_ALL_EXERCISES, options, setErrorMsg);

        if (response && response.ok)
        {
            try
            {
                setExercisesFetched(await response.json());
                setShowExercises(true);
            }
            catch (e)
            {
                setErrorMsg('Action failed');
            }
        }
        //getAndSetDataFromResponse(response, setExercisesFetched, setShowExercises);

        setLoading(false);
    }

    return (
        <>
            <section id="workouts tab buttons options">
                <h3 className="m-0 text-primary">Let’s Get Moving!</h3>
                <menu>
                    <WorkoutTabButton
                        onSelect={() => {setErrorMsg(''); getAllWorkouts(); setSelectedTab("All Workouts");}}
                        isSelected={selectedTab === "All Workouts"}
                    >my workouts</WorkoutTabButton>
                    <WorkoutTabButton
                        onSelect={() => {setErrorMsg(''); setCreateSuccess(false); setSelectedTab("New Workout");}}
                        isSelected={NewWorkout}
                    >create a new workout</WorkoutTabButton>
                    <WorkoutTabButton
                        onSelect={() => {setErrorMsg(''); getExample(); setSelectedTab("Example");}}
                        isSelected={selectedTab === "Example"}
                    >Workout examples</WorkoutTabButton>
                    <WorkoutTabButton
                        onSelect={() => {setErrorMsg(''); getExercises(); setSelectedTab("Exercises");}}
                        isSelected={selectedTab === "Exercises"}
                    >Exercises</WorkoutTabButton>
                </menu>
            </section>
            <section id="results">
                { selectedTab === "All Workouts" && showAllWorkouts && <WorkoutOrExerciseList list={allWorkoutsFetched} handleDelete={deleteWorkout} handleUpdate={editWorkout}/>}
                { NewWorkout && <WorkoutForm functionOnSubmit={createNewWorkout}/>}
                { NewWorkout && createSuccess && <p style={{ color: 'green' }}>Workout created successfully!</p>}
                { selectedTab === "Example" && showExample && <WorkoutOrExerciseList list={exampleFetched!}/>}
                { selectedTab === "Exercises" && showExercises && <WorkoutOrExerciseList list={exercisesFetched!}/>}
            </section>
            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </>
    );
};

export default HomePage;