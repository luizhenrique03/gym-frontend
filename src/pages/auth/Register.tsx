import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

import { saveUser } from "../../storage/userStorage";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cep, setCep] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  function handleRegister() {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !cpf ||
      !birthDate ||
      !cep ||
      !phone
    ) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    // 🔥 SALVA O USUÁRIO
    saveUser({
      name,
      email,
      password,
      cpf,
      birthDate,
      cep,
      phone,
      plan: "",
      photo: "",
    });

    navigate("/plans");
  }

  return (
    <div className="Login-container">
      <div className="Login-box">
        <h2>Registro</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar Senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="CPF"
          onChange={(e) => setCpf(e.target.value)}
        />

        <input
          type="date"
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="CEP"
          onChange={(e) => setCep(e.target.value)}
        />

        <input
          type="text"
          placeholder="Telefone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={handleRegister}>
          Criar Conta
        </button>
      </div>
    </div>
  );
}