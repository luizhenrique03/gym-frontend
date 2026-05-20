import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* SIDEBAR FIXA */}
      <AdminSidebar />

      {/* CONTEÚDO DINÂMICO */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}