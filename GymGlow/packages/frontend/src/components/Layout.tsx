import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import cuteKoalaRunningPic from '../assets/cute-koala-running.jpg';
import useTokens from "../hooks/useTokens.ts";

export default function Layout() {
    const [loggedIn, setLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));
    const {access, setAccess, setRefresh} = useTokens();

    useEffect(() => {
        setLoggedIn(access !== "");
    }, [access])

    function logout()
    {
        setAccess('');
        setRefresh('');
        setLoggedIn(false);
        window.location.href = "/";
    }

    return (
    <>
        {/* Full-width sticky header */}
        <header className="sticky-top border-bottom bg-white py-2 w-100">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Left: App Name */}
                    <h2 className="m-0 text-primary">Gym Glow</h2>

                    {loggedIn && (
                        <>
                            <img src={cuteKoalaRunningPic}
                            alt="Logo"
                            className="img-fluid"
                            width={60}
                            height={60}
                            />
                            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
      </header>

      {/* Main content with padding */}
      <div className="container py-4">
        <Outlet />
      </div>
    </>
  );
}