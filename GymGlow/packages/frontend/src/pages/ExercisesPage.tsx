import {useQuery} from "@tanstack/react-query";
import ExerciseExplanationList from "../components/Exercise Explanation/ExerciseExplanationList.tsx";
import {getExercisesToChooseFrom} from "../utils/GetExamplesFromBackend.tsx";

const ExercisesPage = () => {

    const {data: exercisesToChooseFrom, isLoading, isError, error} = useQuery({
        queryKey: ['exercisesToChooseFrom'],
        queryFn: getExercisesToChooseFrom,
        staleTime: 30000, // every 30 seconds call queryFn again
    })

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {isError && <div className="alert alert-danger" role="alert">{error.message}</div>}
            {exercisesToChooseFrom && <ExerciseExplanationList list={exercisesToChooseFrom!}/>}
        </>
    );
};

export default ExercisesPage;
