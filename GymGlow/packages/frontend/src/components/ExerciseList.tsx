import ExerciseCard from "./ExerciseCard.tsx"
import type {ExerciseDTO} from "../types/ExerciseDTO.ts"

type Props = {
    list: ExerciseDTO[];
}

const ExerciseList: React.FC<Props> = ({list}) => {
    {
        {/*<div className="d-flex flex-column align-items-center gap-3">*/
        }
    }

    return (
        <div className="container pt-2">
            {list.length === 0 ? (
            <div className="text-center">
                <p className="fs-5 text-muted">You have no workouts yet.</p>
            </div>
            ) : (
                <div
                  className="d-flex flex-column gap-3 overflow-auto w-100"
                >
                    {list.map((workout) =>
                        <div className="w-100 d-flex justify-content-center" key={workout.id}>
                            <ExerciseCard {...workout} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExerciseList;
