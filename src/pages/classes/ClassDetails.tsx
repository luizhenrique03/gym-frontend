import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

import { classes } from "../../data/mockClasses";

import "../styles/ClassDetails.css";

import { useState } from "react";

import {
  savePresence,
  hasConfirmed,
  removePresence
} from "../../storage/classPresence";

export default function ClassDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const classItem = classes.find(
    (item) => item.id === Number(id)
  );

  // HOOKS SEMPRE NO TOPO
  const [confirmed, setConfirmed] = useState(
    classItem ? hasConfirmed(classItem.id) : false
  );

  const [studentsCount, setStudentsCount] = useState(
    classItem
      ? (
          hasConfirmed(classItem.id)
            ? classItem.confirmedStudents + 1
            : classItem.confirmedStudents
        )
      : 0
  );

  // VERIFICAÇÃO DEPOIS DOS HOOKS
  if (!classItem) {
    return <h1>Aula não encontrada</h1>;
  }

  // TS SABE QUE EXISTE
  const safeClass = classItem;

  function handleConfirmPresence() {

    // CANCELAR PRESENÇA
    if (confirmed) {

      removePresence(safeClass.id);

      setStudentsCount((prev) => prev - 1);

      setConfirmed(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

      return;
    }

    // CONFIRMAR PRESENÇA
    savePresence(safeClass.id);

    setStudentsCount((prev) => prev + 1);

    setConfirmed(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }

  return (
    <div>

      <Navbar />

      <div className="class-details-page">

        <h1>{safeClass.title}</h1>

        <p className="teacher">
          👨‍🏫 Professor: {safeClass.teacher}
        </p>

        {confirmed && (
          <span className="confirmed-badge">
            ✓ Você confirmou presença
          </span>
        )}

        <div className="class-details-info">

          <span>📅 {safeClass.date}</span>

          <span>⏰ {safeClass.time}</span>

          <span>
            👥 {studentsCount} alunos confirmados
          </span>

        </div>

        <div className="description-box">

          <h2>Sobre a aula</h2>

          <p>{safeClass.description}</p>

        </div>

        <button
          className={confirmed ? "confirmed" : ""}
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