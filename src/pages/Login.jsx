import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const match = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!match) {
      toast.error("Invalid credentials");
      setForm({ email: "", password: "" });
      setTimeout(() => {
        emailRef.current?.focus();
      }, 100);
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(match));
    toast.success("Login successful!");
    navigate(match.role === "Admin" ? "/dashboard" : "/patient-dashboard");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>

      <input
        ref={emailRef}
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "1rem",
          marginBottom: "10px",
          boxSizing: "border-box"
        }}
      />

      <div style={{ position: "relative", marginBottom: "10px" }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            paddingRight: "35px",
            fontSize: "1rem",
            boxSizing: "border-box"
          }}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#555"
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  );
}
