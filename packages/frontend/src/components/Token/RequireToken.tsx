import {Navigate, Outlet} from 'react-router-dom'
import useTokens from "../../hooks/useTokens.ts";

const RequireToken = () => {
    const { accessToken } = useTokens();

    return (
        accessToken !== ''
            ? <Outlet />
            : <Navigate to="/" />
    );
};

export default RequireToken;
