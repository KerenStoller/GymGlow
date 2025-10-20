import WorkoutList from "../components/WorkoutList.tsx";
import {useState, useEffect} from "react";
import type {WorkoutDTO} from "../types/Data Transfer Objects/WorkoutDTO.ts";
import axios from "../api/axios.ts";
import {API} from "../utils/endpoints.ts";


const ExampleWorkout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [showExample, setShowExample] = useState<boolean>(true);
    const [exampleFetched, setExampleFetched] = useState<WorkoutDTO[]>([]);

    useEffect(() => {
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

        getExample();
    }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            {showExample && <WorkoutList list={exampleFetched!}/>}
        </>
    );
};

export default ExampleWorkout;
