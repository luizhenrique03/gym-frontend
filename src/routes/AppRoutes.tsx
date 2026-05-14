import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

import Workouts from "../pages/workouts/workouts";
import WorkoutDetails from "../pages/workouts/workoutDetails";

import Progress from "../pages/progress/progresso";

import Classes from "../pages/classes/Classes";
import ClassDetails from "../pages/classes/ClassDetails";

export default function AppRoutes() {

  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/plans" element={<h1>Plans</h1>} />

        <Route path="/workouts" element={<Workouts />} />

        <Route
          path="/workouts/:id"
          element={<WorkoutDetails />}
        />

        <Route path="/progress" element={<Progress />} />

        <Route path="/classes" element={<Classes />} />

        <Route
          path="/classes/:id"
          element={<ClassDetails />}
        />

      </Route>

    </Routes>
  );
}