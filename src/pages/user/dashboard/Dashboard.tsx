import "./Dashboard.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { workouts } from "../../../data/mockWorkouts";
import { getHistory } from "../../../storage/workoutHistory";

import { classes } from "../../../data/mockClasses";
import { hasConfirmed } from "../../../storage/classPresence";

import { getNutritionHistory } from "../../../storage/nutritionHistory";

type Exercise = {
  id: number;
  name: string;
  sets: string;
  calories: number;
};

type NutritionEntry = {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  water: number;
};

export default function Dashboard() {
  const navigate = useNavigate();

  const todayKey = new Date().toISOString().split("T")[0];

  // =======================
  // WORKOUT HISTORY (SEMANA)
  // =======================
  const [history, setHistory] = useState(getHistory());

  useEffect(() => {
    const update = () => setHistory(getHistory());
    update();
    window.addEventListener("focus", update);
    return () => window.removeEventListener("focus", update);
  }, []);

  const startOfWeek = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    start.setHours(0, 0, 0, 0);
    return start;
  }, []);

  const weeklyHistory = history.filter((item) => {
    return new Date(item.date) >= startOfWeek;
  });

  const completed = weeklyHistory.length;

  const totalCalories = weeklyHistory.reduce(
    (t, i) => t + i.calories,
    0
  );

  const progressPercent =
    workouts.length > 0 ? (completed / workouts.length) * 100 : 0;

  const lastWorkout = weeklyHistory[0];

  const lastWorkoutIndex = workouts.findIndex(
    (w) => w.id === lastWorkout?.id
  );

  const nextWorkout =
    workouts[
      lastWorkoutIndex >= 0 &&
      lastWorkoutIndex < workouts.length - 1
        ? lastWorkoutIndex + 1
        : 0
    ];

  // =======================
  // NUTRIÇÃO (SÓ LÊ, NÃO CALCULA)
  // =======================
  const [nutritionHistory, setNutritionHistory] = useState(
    getNutritionHistory()
  );

  useEffect(() => {
    const update = () => setNutritionHistory(getNutritionHistory());
    update();
    window.addEventListener("focus", update);
    return () => window.removeEventListener("focus", update);
  }, []);

  const todayNutrition = nutritionHistory.find(
    (item: NutritionEntry) => item.date === todayKey
  );

  const totalProtein = todayNutrition?.protein ?? 0;
  const totalCarbs = todayNutrition?.carbs ?? 0;
  const totalWater = todayNutrition?.water ?? 0;

  // =======================
  // AULAS
  // =======================
  const confirmedClasses = classes.filter((item) =>
    hasConfirmed(item.id)
  );

  return (
  

      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Olá, Luiz 👋</h1>
            <p>Continue evoluindo hoje.</p>
          </div>
        </div>

        {/* CARDS */}
        <div className="stats-grid">
          <div className="stats-card">
            <span>🔥 Calorias (treino)</span>
            <h2>{totalCalories}</h2>
            <small>Essa semana</small>
          </div>

          <div className="stats-card">
            <span>🏋️ Treinos</span>
            <h2>{completed}</h2>
            <small>Concluídos</small>
          </div>

          <div className="stats-card">
            <span>📈 Progresso</span>
            <h2>{Math.round(progressPercent)}%</h2>
            <small>Meta semanal</small>
          </div>

          {/* NUTRIÇÃO (SÓ MOSTRA O QUE JÁ FOI SALVO) */}
          <div className="stats-card">
            <span>🍗 Proteína</span>
            <h2>{totalProtein}g</h2>
            <small>Hoje</small>
          </div>

          <div className="stats-card">
            <span>🍞 Carboidratos</span>
            <h2>{totalCarbs}g</h2>
            <small>Hoje</small>
          </div>

          <div className="stats-card">
            <span>💧 Água</span>
            <h2>{(totalWater / 1000).toFixed(1)}L</h2>
            <small>Hoje</small>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="dashboard-content">
          <div className="dashboard-left">
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Meta semanal 💪</h2>
                <span>
                  {completed}/{workouts.length}
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="dashboard-right">
            <div
              className="next-workout-card"
              onClick={() =>
                navigate(`/workouts/${nextWorkout.id}`)
              }
            >
              <div className="next-top">
                <span>Próximo treino</span>
                <h2>{nextWorkout.name}</h2>
              </div>

              <p>{nextWorkout.duration}</p>

              <div className="exercise-list">
                {nextWorkout.exercises.map((ex: Exercise) => (
                  <div key={ex.id} className="exercise-item">
                    <span>{ex.name}</span>
                    <small>{ex.sets}</small>
                  </div>
                ))}
              </div>
            </div>

            {confirmedClasses.map((item) => (
              <div key={item.id} className="confirmed-class-card">
                <div className="confirmed-header">
                  <span>✓ Aula confirmada</span>
                  <h2>{item.title}</h2>
                </div>

                <div className="confirmed-info">
                  <p>👨‍🏫 {item.teacher}</p>
                  <p>📅 {item.date}</p>
                  <p>⏰ {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}