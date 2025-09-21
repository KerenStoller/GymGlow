import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation.tsx";

const RootPage = () => {
    return (
        <>
            <MainNavigation/>
            <Outlet />
        </>
    );
};

export default RootPage;
