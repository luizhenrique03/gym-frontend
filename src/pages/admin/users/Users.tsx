import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";

// 📦 STORE (fonte única de dados)
import { usersStore } from "../../../storage/usersStore";

export default function Users() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔁 pegando dados do store
  const [users] = useState(usersStore.data);

  // 🔍 FILTRO DE BUSCA
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div className="users-page">

      {/* HEADER */}
      <div className="users-header">
        <h1>👤 Alunos</h1>

        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABELA */}
      <div className="users-table">

        <div className="users-row users-head">
          <span>Nome</span>
          <span>Email</span>
          <span>Plano</span>
          <span>Status</span>
        </div>

        {filteredUsers.map((user) => (
          <div key={user.id} className="users-row">

            {/* NOME CLICÁVEL */}
            <span
              className="clickable"
              onClick={() => navigate(`/admin/users/${user.id}`)}
            >
              {user.name}
            </span>

            <span>{user.email}</span>
            <span>{user.plan}</span>

            {/* STATUS (SÓ EXIBE, NÃO EDITA AQUI) */}
            <span
              className={
                user.status === "Ativo"
                  ? "status active"
                  : "status inactive"
              }
            >
              {user.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}