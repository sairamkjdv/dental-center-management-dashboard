import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SessionManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    const FIXED_TIMEOUT = 15 * 60 * 1000;       // 15 minutes fixed timeout
    const INACTIVITY_TIMEOUT = 10 * 60 * 1000;  // 10 minutes inactivity timeout

    const logout = () => {
      toast.warning("Session expired. You have been logged out.");
      localStorage.removeItem("loggedInUser");
      setTimeout(() => navigate("/"), 1500); // redirect after toast
    };

    // Fixed session timeout
    const fixedTimer = setTimeout(logout, FIXED_TIMEOUT);

    // Inactivity timeout
    let inactivityTimer = setTimeout(logout, INACTIVITY_TIMEOUT);

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logout, INACTIVITY_TIMEOUT);
    };

    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keypress", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);

    return () => {
      clearTimeout(fixedTimer);
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keypress", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
    };
  }, [navigate]);

  return null;
};

export default SessionManager;
