import { useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        return JSON.parse(storedUser);
      } catch {
        return null;
      }
    }

    return null;
  });

  // 🔐 Login REAL (quando tiver backend)
  function login(userData: User, token: string) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  }

  // 🔥 Login MOCK (pra desenvolvimento)
  function loginMock() {
    const fakeUser: User = {
      id: 1,
      name: "Luiz Henrique",
      email: "luiz@teste.com",
      plan: "premium", // remove pra testar sem plano
    };

    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("token", "mock-token");
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, login, loginMock, logout }}>
      {children}
    </AuthContext.Provider>
  );
}