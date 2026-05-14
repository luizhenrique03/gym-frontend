import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginMock } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    if (email === "luiz@teste.com" && password === "Luiz@123") {
      loginMock();
      navigate("/dashboard");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="Login-container">
      <div className="Login-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}

export default Login;