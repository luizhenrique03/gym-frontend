import { Navigate } from "react-router-dom";
import type { JSX } from "react/jsx-dev-runtime";
import type { User } from "../types/user";

interface Props {
  children: JSX.Element;
  user: User | null;
}

export default function PlanRoute({ children, user }: Props) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.plan) {
    return <Navigate to="/plans" replace />;
  }

  return children;
}