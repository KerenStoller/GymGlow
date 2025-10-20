import {useEffect, useState} from "react";
import axios from "../api/axios.ts";
import {API} from "../utils/endpoints.ts";
import ExerciseExplanationList from "../components/ExerciseExplanationList.tsx";

const ExercisesPage = () => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [exercisesFetched, setExercisesFetched] = useState<any[]>([]);
    const [showExercises, setShowExercises] = useState<boolean>(false);

    useEffect(() => {
        async function getExercises(){
            setLoading(true);

            try
            {
                const response = await axios.get(API.EXERCISES.GET_ALL);
                setExercisesFetched(response.data);
                setShowExercises(true);
            }
            catch (e: any)
            {
                setErrorMsg(e.message);
            }

            setLoading(false);
        }

        getExercises();
    }, [])

    return (
        <>
            {loading && <div>Loading...</div>}
            {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
            {showExercises && <ExerciseExplanationList list={exercisesFetched!}/>}
        </>
    );
};

export default ExercisesPage;
