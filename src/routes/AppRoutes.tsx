import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// USER
import Dashboard from "../pages/user/dashboard/Dashboard";
import Workouts from "../pages/user/workouts/workouts";
import WorkoutDetails from "../pages/user/workouts/workoutDetails";
import Progress from "../pages/progress/progresso";
import Classes from "../pages/user/classes/Classes";
import ClassDetails from "../pages/user/classes/ClassDetails";
import Nutrition from "../pages/user/nutrition/Nutrition";
import Profile from "../pages/user/profile/profile";

// ADMIN
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import Users from "../pages/admin/users/Users";
import ClassesAdmin from "../pages/admin/classes/ClassesAdmin";
import WorkoutsAdmin from "../pages/admin/workouts/WorkoutsAdmin";
import Exercises from "../pages/admin/exercises/Exercises";
import PlansAdmin from "../pages/admin/Plans/PlansAdmin";
import UserDetails from "../pages/admin/users/UserDetails";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED AREA */}
      <Route element={<ProtectedRoute />}>


        {/* USER AREA */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<h1>Plans</h1>} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetails />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetails />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/profile" element={<Profile />} />
        </Route>


        {/* ADMIN AREA */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/:id" element={<UserDetails />} />
          <Route path="/admin/classes" element={<ClassesAdmin />} />
          <Route path="/admin/workouts" element={<WorkoutsAdmin />} />
          <Route path="/admin/exercises" element={<Exercises />} />
          <Route path="/admin/plans" element={<PlansAdmin />} />
        </Route>

      </Route>

    </Routes>
  );
}