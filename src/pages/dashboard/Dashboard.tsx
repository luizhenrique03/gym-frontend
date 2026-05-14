import Navbar from "../../components/Navbar/Navbar";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="top-section">

          <div className="left-side">

            <div className="meta">
              <h2>Meta semanal 💪</h2>

              <div className="progress-bar">
                <div className="progress"></div>
              </div>

              <p>3/6 dias completos</p>
            </div>

            <div className="cards">
              <div className="card">🔥 1800 kcal</div>
              <div className="card">⚡ 3 Dias Seguidos</div>
            </div>

          </div>

          <div className="next-workout">
            <h2>Próximo Treino</h2>

            <p>Peito - 18h</p>

            <div className="exercise-list">
              <p>• Supino</p>
              <p>• Crucifixo</p>
              <p>• Tríceps</p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}