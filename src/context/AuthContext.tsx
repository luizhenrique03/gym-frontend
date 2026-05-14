import { createContext } from "react";
import type { User } from "../types/user";
type AuthContextType  = {
  user: User | null;
  login: (userData: User, token: string) => void;
  loginMock: () => void;
  logout: () => void;
};



export const AuthContext = createContext({} as AuthContextType);