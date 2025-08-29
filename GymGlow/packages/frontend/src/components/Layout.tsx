import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
      <div className="container py-4">
          <div className="sticky-top">
              <div>Gym Glow</div>
          </div>
          <Outlet />
      </div>
    );
}