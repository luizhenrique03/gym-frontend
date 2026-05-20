import { useParams, useNavigate } from "react-router-dom";
import { classes } from "../../../data/mockClasses";
import "./ClassDetails.css";
import { useState } from "react";

import {
  savePresence,
  hasConfirmed,
  removePresence
} from "../../../storage/classPresence";

export default function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const classItem = classes.find(
    (item) => item.id === Number(id)
  );

  const [confirmed, setConfirmed] = useState(
    classItem ? hasConfirmed(classItem.id) : false
  );

  const [studentsCount, setStudentsCount] = useState(
    classItem
      ? (hasConfirmed(classItem.id)
          ? classItem.confirmedStudents + 1
          : classItem.confirmedStudents)
      : 0
  );

  if (!classItem) {
    return <h1>Aula não encontrada</h1>;
  }

  const safeClass = classItem;

  function handleConfirmPresence() {
    if (confirmed) {
      removePresence(safeClass.id);
      setStudentsCount((prev) => prev - 1);
      setConfirmed(false);

      setTimeout(() => navigate("/dashboard"), 800);
      return;
    }

    savePresence(safeClass.id);
    setStudentsCount((prev) => prev + 1);
    setConfirmed(true);

    setTimeout(() => navigate("/dashboard"), 800);
  }

  return (
    <div>
      

      <div className="class-details-page">

        {/* HEADER */}
        <div className="class-header">
          <button
            className="back-button"
            onClick={() => navigate("/classes")}
          >
            ← Voltar
          </button>

          <h1>{safeClass.title}</h1>

          <p className="teacher">
            👨‍🏫 Professor: {safeClass.teacher}
          </p>
        </div>

        {confirmed && (
          <span className="confirmed-badge">
            ✓ Você confirmou presença
          </span>
        )}

        <div className="class-details-info">
          <span>📅 {safeClass.date}</span>
          <span>⏰ {safeClass.time}</span>
          <span>👥 {studentsCount} alunos confirmados</span>
        </div>

        <div className="description-box">
          <h2>Sobre a aula</h2>
          <p>{safeClass.description}</p>
        </div>

        {/* BOTÃO PRINCIPAL (SEPARADO) */}
        <button
          className={`presence-button ${confirmed ? "confirmed" : ""}`}
          onClick={handleConfirmPresence}
        >
          {confirmed
            ? "Cancelar Presença"
            : "Confirmar Presença"}
        </button>

      </div>
    </div>
  );
}