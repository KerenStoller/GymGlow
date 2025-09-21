import {useEffect, useState} from "react";
import {API} from "../utils/endpoints.ts";
import {useAxiosPrivate} from "../hooks/useAxiosPrivate.ts";
import WorkoutList from "../components/WorkoutList.tsx";

const WorkoutsPage = () => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [allWorkoutsFetched, setAllWorkoutsFetched] = useState<any[]>([]);
    const [showAllWorkouts, setShowAllWorkouts] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
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

        getAllWorkouts();
    }, []);

    return (
        <>
            {loading && <div>Loading...</div>}
            {errorMsg && <div className="alert alert-danger" role="alert">{errorMsg}</div>}
            {showAllWorkouts && <WorkoutList list={allWorkoutsFetched}/>}
        </>
    );
};

export default WorkoutsPage;
