import { useParams, useNavigate } from "react-router-dom";
import "./UserDetails.css";

// 📦 STORE
import { usersStore } from "../../../storage/usersStore";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔍 pega usuário direto do store
  const user = usersStore.data.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div className="user-details">
        <h2>Usuário não encontrado</h2>
        <button onClick={() => navigate("/admin/users")}>
          Voltar
        </button>
      </div>
    );
  }

  // 🔁 TOGGLE STATUS (AQUI É A MUDANÇA REAL)
  function toggleStatus() {
    const target = usersStore.data.find((u) => u.id === Number(id));

    if (target) {
      target.status =
        target.status === "Ativo" ? "Inativo" : "Ativo";
    }

    // volta pra lista (pra ver atualização)
    navigate("/admin/users");
  }

  return (
    <div className="user-details">

      {/* HEADER */}
      <div className="user-details-header">
        <h1>👤 Detalhes do Aluno</h1>
        <button onClick={() => navigate("/admin/users")}>
          Voltar
        </button>
      </div>

      {/* INFO PRINCIPAL */}
      <div className="user-card">

        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <div className="user-info-grid">
          <div>
            <span>CPF</span>
            <p>{user.cpf}</p>
          </div>

          <div>
            <span>Plano</span>
            <p>{user.plan}</p>
          </div>

          <div>
            <span>Status</span>
            <p className={user.status === "Ativo" ? "active" : "inactive"}>
              {user.status}
            </p>
          </div>
        </div>

      </div>

      {/* ESTATÍSTICAS */}
      <div className="user-stats">

        <div className="stat-card">
          <span>🏋️ Treinos</span>
          <h3>{user.workouts}</h3>
        </div>

        <div className="stat-card">
          <span>🔥 Calorias</span>
          <h3>{user.calories}</h3>
        </div>

        <div className="stat-card">
          <span>📈 Frequência</span>
          <h3>{user.frequency}</h3>
        </div>

      </div>

      {/* NUTRIÇÃO */}
      <div className="user-nutrition">

        <h3>🍽️ Nutrição</h3>

        <div className="nutrition-grid">
          <div>
            <span>Proteína</span>
            <p>{user.protein}g</p>
          </div>

          <div>
            <span>Água</span>
            <p>{user.water}L</p>
          </div>
        </div>

      </div>

      {/* HISTÓRICO */}
      <div className="user-history">

        <h3>🧠 Histórico</h3>

        <p>Último treino: {user.lastWorkout}</p>
        <p>Última aula: {user.lastClass}</p>

      </div>

      {/* AÇÕES */}
      <div className="user-actions">

        <button className="edit">
          Editar
        </button>

        {/* 🔥 AQUI ESTÁ A LÓGICA REAL */}
        <button className="deactivate" onClick={toggleStatus}>
          Alternar Status
        </button>

        <button className="delete">
          Inativar
        </button>

      </div>

    </div>
  );
}