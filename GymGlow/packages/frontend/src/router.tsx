import { redirect } from "react-router";
import {createBrowserRouter} from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import Layout from "./components/Navigation and Layout/Layout.tsx";
import RequireToken from "./components/Token/RequireToken.tsx";
import WorkoutsPage from "./pages/WorkoutsPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RootPage from "./pages/RootPage.tsx";
import WorkoutDetails from "./components/My Workouts/WorkoutDetails.tsx";
import ExercisesPage from "./pages/ExercisesPage.tsx";
import CreateWorkout from "./pages/CreateWorkout.tsx";
import ExampleWorkout from "./pages/ExampleWorkout.tsx";
import EditWorkout from "./components/My Workouts/EditWorkout.tsx";


export const router = createBrowserRouter([
    {path: "/", element: <Layout />, children: [
        /*public routes:*/
        {index: true, element: <LandingPage />},

        /*private routes:*/
        {path: "/", element: <RequireToken/>, children: [
            {path: "root", element: <RootPage />, children: [
                {path: "home", index:true, element: <HomePage />},
                {path: "workouts", element: <WorkoutsPage />},
                {path: "workoutDetails/:id", element: <WorkoutDetails />},
                {path: "workoutDetails/edit/:id", element: <EditWorkout />},
                {path: "exercises", element: <ExercisesPage />},
                {path: "createWorkout", element: <CreateWorkout />},
                {path: "example", element: <ExampleWorkout />}
            ]}
        ]},


        {path: "*", loader: () => redirect("/") },]},
]);