import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching patient by email, password, and role
    const user = users.find(
      (u) =>
        u.email === email.trim() &&
        u.password === password &&
        u.role === "Patient"
    );

    if (user) {
      // Check if patient record exists
      const patients = JSON.parse(localStorage.getItem("patients")) || [];
      const patientRecord = patients.find((p) => p.id === user.patientId);

      if (patientRecord) {
        // Save the whole user to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigate("/patient-dashboard");
      } else {
        setError("Patient record not found.");
      }
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Patient Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: "10px" }}
      />
      <br />
      <button onClick={handleLogin} style={{ marginTop: "10px" }}>
        Login
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default PatientLogin;
