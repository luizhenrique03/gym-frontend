import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-header">
        <h1>📊 Dashboard</h1>
        <p>Visão geral do sistema</p>
      </div>

      {/* CARDS */}
      <div className="admin-cards">

        <div className="admin-card">
          <span>👤 Alunos</span>
          <h2>120</h2>
        </div>

        <div className="admin-card">
          <span>🏋️ Workouts</span>
          <h2>45</h2>
        </div>

        <div className="admin-card">
          <span>🧠 Exercícios</span>
          <h2>300</h2>
        </div>

        <div className="admin-card">
          <span>🏫 Classes</span>
          <h2>18</h2>
        </div>

        <div className="admin-card">
          <span>📦 Plans</span>
          <h2>8</h2>
        </div>

        <div className="admin-card">
          <span>🍽️ Nutrition</span>
          <h2>90</h2>
        </div>

      </div>

    </div>
  );
}