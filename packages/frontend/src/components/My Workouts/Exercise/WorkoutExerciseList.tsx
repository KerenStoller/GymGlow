import WorkoutExerciseCard from "./WorkoutExerciseCard.tsx"
import type WorkoutExerciseDTO from "../../../types/Data Transfer Objects/WorkoutExerciseDTO.tsx";

type Props = {
    list: WorkoutExerciseDTO[];
}

const WorkoutExerciseList: React.FC<Props> = ({list}) => {
    return (
        <div className="container pt-2">
            {list.length === 0 ? (
            <div className="text-center">
                <p className="fs-5 text-muted">No exercises in this workout.</p>
            </div>
            ) : (
                <div
                  className="d-flex flex-column gap-3 overflow-auto w-100"
                >
                    {list.map((exercise) =>
                        <div className="w-100 d-flex justify-content-center" key={exercise.id}>
                            <WorkoutExerciseCard {...exercise} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkoutExerciseList;
