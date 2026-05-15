import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../storage/userStorage";

export default function Navbar() {
  const location = useLocation();

  // 🔥 estado local para forçar re-render
  const [user, setUser] = useState(getUser());

  // 🔥 escuta mudanças no localStorage via evento global
  useEffect(() => {
    function handleUpdate() {
      setUser(getUser());
    }

    window.addEventListener("userUpdated", handleUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUpdate);
    };
  }, []);

  const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-top">
        <h1 className="logo">
          GYM
          <span>FITNESS</span>
        </h1>
      </div>

      {/* LINKS */}
      <nav className="sidebar-links">

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/workouts"
          className={location.pathname.includes("/workouts") ? "active" : ""}
        >
          💪 Treinos
        </Link>

        <Link
          to="/nutrition"
          className={location.pathname === "/nutrition" ? "active" : ""}
        >
          🥗 Nutrição
        </Link>

        <Link
          to="/classes"
          className={location.pathname === "/classes" ? "active" : ""}
        >
          🏃 Aulas
        </Link>

        <Link
          to="/progress"
          className={location.pathname === "/progress" ? "active" : ""}
        >
          📊 Progresso
        </Link>

      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">

        <div className="profile">

          {/* AVATAR */}
          <div className="profile-avatar">
            {user?.photo ? (
              <img src={user.photo} alt="avatar" />
            ) : (
              firstLetter
            )}
          </div>

          {/* INFO */}
          <div>
            <h4>{user?.name || "Usuário"}</h4>

            <Link to="/profile">
              <p>Ver perfil</p>
            </Link>
          </div>

        </div>

      </div>

    </aside>
  );
}