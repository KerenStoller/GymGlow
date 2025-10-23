import axios from "../api/axios.ts";
import {API} from "./endpoints.ts";
import type {ExerciseExplanationDTO} from "../types/Data Transfer Objects/ExerciseExplanationDTO.ts";

export async function getExercisesToChooseFrom(): Promise<ExerciseExplanationDTO[]> {
    console.log("Fetching exercises from backend...");
    try
    {
        const response = await axios.get<ExerciseExplanationDTO[]>(API.EXERCISES.GET_ALL);
        return response.data;
    }
    catch (e: any)
    {
        console.log(e.data);
        if (e instanceof Error) throw e;
        throw new Error("Unknown error occurred");
    }
}