import {useEffect, useState} from "react";
import useTokens from "../hooks/useTokens.ts";
import useLogout from "../hooks/useLogout.tsx";
import cuteKoalaRunningPic from "../assets/cute-koala-running.jpg";

const LogoutButton = () =>
{
    const {accessToken} = useTokens();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const logout = useLogout()

    useEffect(() => {
        setLoggedIn(accessToken !== "");
        console.log("im in logout button effect!")
    }, [accessToken])

    return (
    <>
        {loggedIn &&
        (<>
            <img src={cuteKoalaRunningPic}
                 alt="Logo"
                 className="img-fluid"
                 width={60}
                 height={60}
            />
            <button className="btn btn-outline-danger" onClick={
                () => {
                    logout();
                    setLoggedIn(false);
                }
            }>Logout</button>
        </>)}
    </>
    );
};

export default LogoutButton;
