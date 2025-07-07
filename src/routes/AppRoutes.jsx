import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import PatientDashboard from "../pages/PatientDashboard";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {user && user.role === "Admin" && <Route path="/admin" element={<AdminDashboard />} />}
        {user && user.role === "Patient" && <Route path="/patient" element={<PatientDashboard />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
