import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

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

        <div className="register-grid">

          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />

          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

        </div>

        <button onClick={handleRegister}>
          Criar Conta
        </button>

      </div>

    </div>
  );
}