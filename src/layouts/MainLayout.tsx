import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

export default function MainLayout() {

  return (
    <div className="app-layout">

      <Navbar />

            <div className="app-content">   

        <Outlet />
      </div>

    </div>
  );
}