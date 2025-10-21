import { Outlet } from "react-router-dom";
import MainNavigation from "../components/Navigation and Layout/MainNavigation.tsx";

const RootPage = () => {
    return (
        <>
            <MainNavigation/>
            <Outlet />
        </>
    );
};

export default RootPage;
