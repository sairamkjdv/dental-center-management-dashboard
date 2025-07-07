import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      toast.warn("You must be logged in to access this page.");
    } else if (!allowedRoles.includes(user.role)) {
      toast.error("Access denied for this role.");
    }
  }, [user, allowedRoles]);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
