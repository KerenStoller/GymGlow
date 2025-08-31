//dto = Data Transfer Objects

export interface WorkoutPlanDTO
{
    id: string;
    user_id: string;
    name: string;
    description: string | null;
}
