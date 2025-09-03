const BASE_URL = "http://localhost:8000";

export const API =
{
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        SIGNUP: `${BASE_URL}/auth/signup`,
        ADMIN: `${BASE_URL}/auth/admin`,
    },
    WORKOUT_PLANS: {
        GET_ALL: `${BASE_URL}/workouts`,
        GET_EXAMPLE: `${BASE_URL}/workouts/example`,
        CREATE: `${BASE_URL}/workouts/create`,
        DELETE: `${BASE_URL}/workouts/delete`,
        UPDATE: `${BASE_URL}/workouts/update`,
        GET_ALL_EXERCISES: `${BASE_URL}/workouts/all_exercises`,
    }
}