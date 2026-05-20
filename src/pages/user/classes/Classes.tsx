
import { classes } from "../../../data/mockClasses";

import "./Classes.css";

import { useNavigate } from "react-router-dom";

import {
  hasConfirmed
} from "../../../storage/classPresence";

export default function Classes() {

  const navigate = useNavigate();

  return (
    <div>

      

      <div className="classes-page">

        <h1>Aulas 🏋️</h1>

        <div className="classes-grid">

          {classes.map((item) => {

            const confirmed = hasConfirmed(item.id);

            const totalStudents = confirmed
              ? item.confirmedStudents + 1
              : item.confirmedStudents;

            return (

              <div
                key={item.id}
                className={`class-card ${
                  confirmed ? "confirmed-card" : ""
                }`}
                onClick={() => navigate(`/classes/${item.id}`)}
              >

                {confirmed && (
                  <span className="confirmed-label">
                    ✓ Confirmado
                  </span>
                )}

                <h2>{item.title}</h2>

                <p>👨‍🏫 {item.teacher}</p>

                <div className="class-info">

                  <span>📅 {item.date}</span>

                  <span>⏰ {item.time}</span>

                  <span>
                    👥 {totalStudents} alunos
                  </span>

                </div>

              </div>

            );
          })}

        </div>

      </div>

    </div>
  );
}