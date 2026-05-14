import Navbar from "../../components/Navbar/Navbar";
import "../styles/Dashboard.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { workouts } from "../../data/mockWorkouts";
import { getHistory } from "../../storage/workoutHistory";

export default function Dashboard() {

  const navigate = useNavigate();

  const [history, setHistory] = useState(getHistory());

  useEffect(() => {

    const update = () => {
      setHistory(getHistory());
    };

    window.addEventListener("focus", update);

    return () => {
      window.removeEventListener("focus", update);
    };

  }, []);

  // 📅 início da semana
  const startOfWeek = useMemo(() => {

    const now = new Date();

    const start = new Date(now);

    start.setDate(now.getDate() - now.getDay());

    start.setHours(0, 0, 0, 0);

    return start;

  }, []);

  // 🔥 treinos apenas da semana atual
  const weeklyHistory = history.filter((item) => {

    const itemDate = new Date(item.date);

    return itemDate >= startOfWeek;

  });

  // ✅ quantidade concluída
  const completed = weeklyHistory.length;

  // 🔥 calorias reais da semana
  const totalCalories = weeklyHistory.reduce(
    (total, item) => total + item.calories,
    0
  );

  // 📊 porcentagem da barra
  const progressPercent =
    workouts.length > 0
      ? (completed / workouts.length) * 100
      : 0;

  // ✅ último treino concluído
  const lastWorkout = weeklyHistory[0];

  // ✅ índice do último treino
  const lastWorkoutIndex = workouts.findIndex(
    (workout) => workout.id === lastWorkout?.id
  );

  // ✅ próximo treino automático
  const nextWorkout =
    workouts[
      lastWorkoutIndex >= 0 &&
      lastWorkoutIndex < workouts.length - 1
        ? lastWorkoutIndex + 1
        : 0
    ];

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="top-section">

          <div className="left-side">

            <div className="meta">

              <h2>Meta semanal 💪</h2>

              <div className="progress-bar">

                <div
                  className="progress"
                  style={{ width: `${progressPercent}%` }}
                />

              </div>

              <p>
                {completed}/{workouts.length} treinos esta semana
              </p>

            </div>

            <div className="cards">

              <div className="card">
                🔥 {totalCalories} kcal
              </div>

              <div className="card">
                ⚡ {completed} concluídos
              </div>

            </div>

          </div>

          {/* CARD PRÓXIMO TREINO */}
          <div
            className="next-workout"
            onClick={() => navigate(`/workouts/${nextWorkout.id}`)}
            style={{ cursor: "pointer" }}
          >

            <h2>Próximo Treino</h2>

            <p>
              {nextWorkout.name} - {nextWorkout.duration}
            </p>

            <div className="exercise-list">

              {nextWorkout.exercises.map((ex) => (

                <p key={ex.id}>
                  • {ex.name} ({ex.sets})
                </p>

              ))}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}