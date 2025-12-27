export interface WorkoutPlanRequest {
    title: string;
    description: string;
    exercises: ExerciseDetails[];
}

export type ExerciseDetails = {
    id: string;
    sets: number;
    reps: number;
    weight: string;
}