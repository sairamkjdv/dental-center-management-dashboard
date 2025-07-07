import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import CalendarView from "./pages/CalendarView";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionManager from "./components/SessionManager";

export default function App() {
  return (
    <>
      <SessionManager />
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin-only */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/patients" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Patients />
          </ProtectedRoute>
        } />
        <Route path="/appointments" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Appointments />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <CalendarView />
          </ProtectedRoute>
        } />

        {/* Patient-only */}
        <Route path="/patient-dashboard" element={
          <ProtectedRoute allowedRoles={["Patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
