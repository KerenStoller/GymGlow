//dto = Data Transfer Objects

export interface WorkoutDTO
{
    id: string;
    user_id: string;
    title: string;
    description: string | null;
}