import type {ExerciseDTO} from "./ExerciseDTO.ts";

export interface WorkoutExercisesDTO {
    id: string;
    exercise: ExerciseDTO;
    sets: string;
    reps: string;
    weigth: string;
}