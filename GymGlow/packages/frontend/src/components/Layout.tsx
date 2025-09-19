import { Outlet } from "react-router-dom";
import LogoutButton from "./LogoutButton.tsx";

export default function Layout()
{
    return (
    <>
        {/* Full-width sticky header */}
        <header className="sticky-top border-bottom bg-white py-2 w-100">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Left: App Name */}
                    <h2 className="m-0 text-primary">Gym Glow</h2>
                    <LogoutButton />
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