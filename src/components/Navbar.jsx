import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navStyle = {
    padding: "10px 20px",
    background: "#0077cc",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const linkStyle = (path) => ({
    marginRight: "20px",
    color: isActive(path) ? "#ffcc00" : "#fff",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: isActive(path) ? "bold" : "normal"
  });

  return (
    <div style={navStyle}>
      <div>
        <span
          style={linkStyle("/dashboard")}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>
        <span
          style={linkStyle("/patients")}
          onClick={() => navigate("/patients")}
        >
          Patients
        </span>
        <span
          style={linkStyle("/appointments")}
          onClick={() => navigate("/appointments")}
        >
          Appointments
        </span>
        <span
          style={linkStyle("/calendar")}
          onClick={() => navigate("/calendar")}
        >
          Calendar
        </span>
      </div>
      <div>
        👨‍⚕️ Admin
        <button onClick={handleLogout} style={{ marginLeft: "15px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}
