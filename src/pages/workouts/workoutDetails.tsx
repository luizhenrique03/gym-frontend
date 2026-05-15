import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import { workouts } from "../../data/mockWorkouts";
import "../../pages/styles/WorkoutDetails.css";
import { saveHistory } from "../../storage/workoutHistory";

import { useEffect, useState } from "react";

export default function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const workout = workouts.find(
    (workout) => workout.id === Number(id)
  );

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [done, setDone] = useState<number[]>([]);
  const [showFinishModal, setShowFinishModal] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  if (!workout) {
    return <h1>Treino não encontrado</h1>;
  }

  const safeWorkout = workout;

  function formatTime(totalSeconds: number) {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  const totalExercises = safeWorkout.exercises.length;
  const completedExercises = done.length;

  const progress = Math.round(
    (completedExercises / totalExercises) * 100
  );

  function toggleExercise(exerciseId: number) {
    setDone((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  }

  function calculateCalories() {
    return safeWorkout.exercises
      .filter((ex) => done.includes(ex.id))
      .reduce((total, ex) => total + (ex.calories || 0), 0);
  }

  function finishWorkout() {
    setIsRunning(false);

    saveHistory({
      id: safeWorkout.id,
      name: safeWorkout.name,
      time: formatTime(seconds),
      calories: calculateCalories(),
      date: new Date().getTime()
    });

    setShowFinishModal(true);
  }

  return (
    <div>
      <Navbar />

      <div className="workout-details-page">

        <div className="workout-card">

          {/* HEADER */}
          <div className="workout-header">

            <button
              className="back-button"
              onClick={() => navigate("/workouts")}
            >
              ← Voltar
            </button>

            <div className="workout-title">
              <h1>{safeWorkout.name}</h1>
              <p className="focus">{safeWorkout.focus}</p>
            </div>

          </div>

          {/* INFO */}
          <div className="info">
            <span>⏱ {formatTime(seconds)}</span>
            <span>🔥 {calculateCalories()} kcal</span>
          </div>

          {/* PROGRESSO */}
          <div className="progress-container">
            <span>
              Progresso: {completedExercises}/{totalExercises}
            </span>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <small>{progress}% concluído</small>
          </div>

          <h2>Exercícios</h2>

          {safeWorkout.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`exercise ${
                done.includes(exercise.id) ? "done" : ""
              }`}
              onClick={() => toggleExercise(exercise.id)}
            >
              <input
                type="checkbox"
                checked={done.includes(exercise.id)}
                readOnly
              />

              <h3>{exercise.name}</h3>

              <span>{exercise.sets}</span>
            </div>
          ))}

          {/* BOTÃO FINALIZAR (CLASSE ESPECÍFICA!) */}
          <button
            className="finish-button"
            onClick={finishWorkout}
          >
            Finalizar Treino
          </button>

        </div>

        {/* MODAL */}
        {showFinishModal && (
          <div className="modal-overlay">
            <div className="modal">

              <h2>Confirmar encerramento</h2>

              <p>
                <strong>Treino:</strong> {safeWorkout.name}
              </p>

              <p>
                <strong>Tempo:</strong> {formatTime(seconds)}
              </p>

              <p>
                <strong>Calorias gastas:</strong> {calculateCalories()} kcal
              </p>

              <button onClick={() => navigate("/dashboard")}>
                Confirmar Finalização
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}