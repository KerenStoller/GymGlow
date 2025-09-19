import {useState} from 'react';
import WorkoutTabButton from './Workouts/WorkoutTabButton.tsx';
import {API} from "../utils/endpoints.ts"
import WorkoutOrExerciseList from "./Workouts/WorkoutOrExerciseList.tsx";
import WorkoutForm from "./Workouts/WorkoutForm.tsx";
import type {WorkoutPlanRequest} from "../types/WorkoutPlanRequest.ts";
import type {WorkoutDTO} from "../types/WorkoutDTO.ts";
import type {ExerciseDTO} from "../types/ExerciseDTO.ts";
import axios from "../api/axios.ts";
import {useAxiosPrivate} from "../hooks/useAxiosPrivate.ts";

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
    const axiosPrivate = useAxiosPrivate();

    async function getAllWorkouts() {
        setLoading(true);

        try
        {
            const response = await axiosPrivate.get(API.WORKOUT_PLANS.GET_ALL);
            setAllWorkoutsFetched(response.data);
            setShowAllWorkouts(true);
        }
        catch (e: any)
        {
            setErrorMsg(e.message);
        }

        setLoading(false);
    }

    async function createNewWorkout(new_workout: WorkoutPlanRequest) {
        setErrorMsg('');
        setLoading(true);

        try
        {
            await axiosPrivate.post(
                API.WORKOUT_PLANS.CREATE,
                {name: new_workout.title, description: new_workout.description},
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

    async function getExample() {
        if (exampleFetched.length > 0)
        {
            setShowExample(true);
            return;
        }

        setLoading(true);
        try
        {
            const response2 = await axios.get(API.WORKOUT_PLANS.GET_EXAMPLE);
            setExampleFetched(response2.data);
            setShowExample(true);
        }
        catch (e: any)
        {
            setErrorMsg(e.message);
        }

        setLoading(false);
    }

    async function deleteWorkout(workout_id: string) {
        setErrorMsg('');
        setLoading(true);

        try
        {
            await axiosPrivate.delete(
                API.WORKOUT_PLANS.DELETE + `/${workout_id}`);
            setAllWorkoutsFetched(allWorkoutsFetched.filter(
                workout => workout.id !== workout_id));
        }
        catch(e: any)
        {
            setErrorMsg(e.message);
        }

        setLoading(false);
    }

    async function editWorkout(workout_id: string, new_workout: WorkoutPlanRequest) {
        setErrorMsg('');
        setLoading(true);
        const {title, description} = new_workout;

        try
        {
            await axiosPrivate.put(
                API.WORKOUT_PLANS.UPDATE + `/${workout_id}`,
                {name: title, description},
                {
                    headers: { 'Content-Type': 'application/json' },
                });

            setAllWorkoutsFetched(allWorkoutsFetched.map(workout => {
                if (workout.id === workout_id) {
                    return {...workout, name: title, description};
                }
                return workout;
            }));
        }
        catch (e: any)
        {
            setErrorMsg(e.message);
        }

        setLoading(false);
    }

    async function getExercises(){
        setLoading(true);

        try
        {
            const response = await axios.get(API.WORKOUT_PLANS.GET_ALL_EXERCISES);
            setExercisesFetched(response.data);
            setShowExercises(true);
        }
        catch (e: any)
        {
            setErrorMsg(e.message);
        }

        setLoading(false);
    }

    return (
        <>
            <section id="workouts tab buttons options">
                <h3 className="m-0 text-primary">Let’s Get Moving!</h3>
                <menu>
                    <WorkoutTabButton
                        onSelect={
                            async () => {
                                setErrorMsg('');
                                await getAllWorkouts();
                                setSelectedTab('All Workouts');}
                        }
                        isSelected={selectedTab === "All Workouts"}
                    >my workouts</WorkoutTabButton>
                    <WorkoutTabButton
                        onSelect={
                            async () => {
                                setErrorMsg('');
                                setCreateSuccess(false);
                                setSelectedTab("New Workout");}
                        }
                        isSelected={NewWorkout}
                    >create a new workout</WorkoutTabButton>
                    <WorkoutTabButton
                        onSelect={
                            async () => {
                                setErrorMsg('');
                                await getExample();
                                setSelectedTab("Example");
                            }
                        }
                        isSelected={selectedTab === "Example"}
                    >Workout examples</WorkoutTabButton>
                    <WorkoutTabButton
                        onSelect={
                            async () => {
                                setErrorMsg('');
                                await getExercises();
                                setSelectedTab("Exercises");}
                            }
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