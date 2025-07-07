import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function AdminHeader({ title, rightContent }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div>
      <Navbar /> {/* ✅ Global Admin Navbar */}
      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          borderBottom: "1px solid #ddd"
        }}
      >
        <h2>{title}</h2>
        {rightContent && rightContent}
      </div>
    </div>
  );
}
