//dto = Data Transfer Objects
import type { ExerciseDTO } from "./ExerciseDTO";

export interface WorkoutDTO
{
    id: string;
    user_id: string;
    name: string;
    description: string | null;
}

// Type guard to check if an object is of type WorkoutDTO
export function isWorkoutDTO(workout: WorkoutDTO | ExerciseDTO): workout is WorkoutDTO {
  return 'user_id' in workout;
}