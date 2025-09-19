import { redirect } from "react-router";
import {createBrowserRouter} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import {createTokenLoader, validateNoToken} from "./utils/token.ts";
import Layout from "./components/Layout";
import RequireToken from "./components/RequireToken.tsx";

export const router = createBrowserRouter([
    {path: "/", element: <Layout />, children: [
        /*public routes:*/
        {index: true, element: <LandingPage />, loader: validateNoToken},

        /*private routes:*/
        {path: "/", element: <RequireToken/>, children: [
            {path: "home", loader: createTokenLoader(), element: <HomePage />},
        ]},

        {path: "*", loader: () => redirect("/") },]},
]);