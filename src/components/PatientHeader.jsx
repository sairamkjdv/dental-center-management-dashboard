import React from "react";
import { useNavigate } from "react-router-dom";

export default function PatientHeader({ name }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px"
    }}>
      <h1>Patient Dashboard</h1>
      <div>
        <span style={{ marginRight: "10px" }}>👤 {name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
