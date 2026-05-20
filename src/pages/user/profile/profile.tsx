
import "./Profile.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../storage/userStorage";
import { saveUser } from "../../../storage/userStorage";

// ======================
// LOAD USER
// ======================
const loadUser = (): User | null => {
  const data = localStorage.getItem("user");
  if (!data) return null;

  return JSON.parse(data);
};

export default function Profile() {
  const navigate = useNavigate();

  const user = loadUser();

  // hooks sempre no topo
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [cep, setCep] = useState(user?.cep ?? "");
  const [password, setPassword] = useState(user?.password ?? "");
  const [photo, setPhoto] = useState(user?.photo ?? "");

  if (!user) {
    return (
      
        <div className="profile-page">
          <h2>Nenhum usuário encontrado</h2>
        </div>
      
    );
  }

  const safeUser = user;

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function handleSave() {
    const updated: User = {
      name: safeUser.name,
      email: safeUser.email,
      cpf: safeUser.cpf,
      birthDate: safeUser.birthDate,
      plan: safeUser.plan ?? "",

      phone,
      cep,
      password,
      photo,
    };

    saveUser(updated);

    alert("Perfil atualizado com sucesso!");

    // volta pro dashboard
    navigate("/dashboard");
  }

  return (
  

      <div className="profile-page">
        <h1 className="profile-title">Meu Perfil 👤</h1>

        <div className="profile-container">
          <div className="profile-card">

            {/* AVATAR */}
            <div className="profile-avatar-section">

              <div className="profile-avatar-big">
                {photo ? (
                  <img src={photo} alt="avatar" />
                ) : (
                  safeUser.name.charAt(0).toUpperCase()
                )}
              </div>

              {/* BOTÃO CUSTOMIZADO DE UPLOAD */}
              <label className="upload-btn">
                Escolher imagem
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>

            </div>

            {/* INFO */}
            <div className="profile-info">
              <p><strong>Nome:</strong> {safeUser.name}</p>
              <p><strong>Email:</strong> {safeUser.email}</p>
              <p><strong>CPF:</strong> {safeUser.cpf}</p>

              <label>Telefone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} />

              <label>CEP</label>
              <input value={cep} onChange={(e) => setCep(e.target.value)} />

              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={handleSave}>
                Salvar alterações
              </button>
            </div>

          </div>
        </div>
      </div>
  );
}