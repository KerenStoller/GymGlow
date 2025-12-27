import ExerciseExplanationCard from "./ExerciseExplanationCard.tsx"
import type {ExerciseExplanationDTO} from "../../types/Data Transfer Objects/ExerciseExplanationDTO.ts"

type Props = {
    list: ExerciseExplanationDTO[];
}

const ExerciseExplanationList: React.FC<Props> = ({list}) => {

    return (
        <div className="container pt-2">
            {list.length === 0 ? (
            <div className="text-center">
                <p className="fs-5 text-muted">You have no exercises yet.</p>
            </div>
            ) : (
                <div
                  className="d-flex flex-column gap-3 overflow-auto w-100"
                >
                    {list.map((exercise) =>
                        <div className="w-100 d-flex justify-content-center" key={exercise.id}>
                            <ExerciseExplanationCard {...exercise} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExerciseExplanationList;
