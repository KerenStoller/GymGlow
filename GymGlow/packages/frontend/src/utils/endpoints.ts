export const API =
{
    AUTH: {
        LOGIN: `/auth/login`,
        SIGNUP: `/auth/signup`,
        LOGOUT: `/auth/logout`,
        ADMIN: `/auth/admin`,
        REFRESH: `/auth/refresh`,
    },
    WORKOUT_PLANS: {
        GET_ALL: `/workouts`,
        GET_EXAMPLE: `/workouts/example`,
        CREATE: `/workouts/create`,
        DELETE: `/workouts/delete`,
        UPDATE: `/workouts/update`,
    },
    EXERCISES: {
        GET_ALL: `/exercises/all_exercises`,
    },
    WORKOUT_EXERCISES: {
        GET_ALL: `/workout_exercises/get_exercises`,
    }
}