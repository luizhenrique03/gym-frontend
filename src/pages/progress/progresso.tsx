import { getHistory } from "../../storage/workoutHistory";

import Navbar from "../../components/Navbar/Navbar";

import "../styles/Progress.css";

export default function Progress() {

  const history = getHistory();

  return (
    <div>

      <Navbar />

      <div className="progress-page">

        <h1>Progresso 📊</h1>

        {history.length === 0 && (
          <p className="empty-history">
            Nenhum treino finalizado ainda.
          </p>
        )}

        <div className="history-grid">

          {history.map((item, index) => (

            <div key={index} className="history-card">

              <h3>{item.name}</h3>

              <p>⏱ {item.time}</p>

              <p>🔥 {item.calories} kcal</p>

              <p>📅 {item.date}</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}