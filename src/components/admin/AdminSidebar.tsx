import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      {/* LOGO */}
      <div className="admin-logo">
        ADMIN <span>PANEL</span>
      </div>

      {/* LINKS */}
      <div className="admin-sidebar-links">
        <NavLink to="/admin/dashboard">📊 Dashboard</NavLink>
        <NavLink to="/admin/users">👤 Alunos</NavLink>
        <NavLink to="/admin/workouts">🏋️ Workouts</NavLink>
        <NavLink to="/admin/exercises">🧠 Exercícios</NavLink>
        <NavLink to="/admin/classes">🏫 Classes</NavLink>
        <NavLink to="/admin/plans">📦 Plans</NavLink>
        <NavLink to="/admin/nutrition">🍽️ Nutrition</NavLink>
      </div>

      {/* FOOTER */}
      <div className="admin-sidebar-footer">
        <div className="admin-profile">
          <div className="admin-profile-avatar">A</div>
          <div>
            <h4>Admin</h4>
            <p>Sistema</p>
          </div>
        </div>
      </div>

    </aside>
  );
}