export interface ExerciseExplanationDTO {
    id: string;
    name: string;
    description: string | null;
    muscle_group: string | null;
    equipment: string | null;
    tips: string;
}