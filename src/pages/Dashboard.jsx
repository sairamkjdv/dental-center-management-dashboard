import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initLocalStorage } from "../localStorageInit";
import AdminHeader from "../components/AdminHeader";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser || loggedUser.role !== "Admin") {
      toast.error("Access denied. Admins only.");
      navigate("/");
      return;
    }
    setUser(loggedUser);
  }, [navigate]);

  const handleResetSampleData = () => {
    if (window.confirm("This will overwrite all data with sample data. Proceed?")) {
      localStorage.clear();
      initLocalStorage();
      toast.success("Sample data has been restored!");
      window.location.reload();
    }
  };

  if (!user) return <p>Loading...</p>;

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const patients = JSON.parse(localStorage.getItem("patients")) || [];

  const pending = appointments.filter(a => a.status === "pending").length;
  const completed = appointments.filter(a => a.status === "completed").length;

  const totalRevenue = appointments.reduce((acc, appointment) => {
    const amount = parseFloat(appointment.amount);
    return acc + (isNaN(amount) ? 0 : amount);
  }, 0);

  const patientVisits = {};
  appointments.forEach(a => {
    if (!patientVisits[a.patientName]) {
      patientVisits[a.patientName] = 0;
    }
    patientVisits[a.patientName]++;
  });

  const topPatients = Object.entries(patientVisits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const upcomingAppointments = appointments
    .filter(a => new Date(a.dateTime) > new Date())
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    .slice(0, 10);

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        rightContent={
          <button
            onClick={handleResetSampleData}
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Reset Sample Data
          </button>
        }
      />

      <div style={{ padding: "20px" }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          Welcome to the Dental Center Dashboard.
        </p>

        <p><strong>Revenue:</strong> ₹{totalRevenue}</p>
        <p><strong>Pending:</strong> {pending}</p>
        <p><strong>Completed:</strong> {completed}</p>
        <p><strong>Top Patients:</strong> {topPatients.length}</p>

        <h2>Next 10 Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={cellStyle}>Patient</th>
                <th style={cellStyle}>Reason</th>
                <th style={cellStyle}>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((a, index) => (
                <tr key={index}>
                  <td style={cellStyle}>{a.patientName}</td>
                  <td style={cellStyle}>{a.reason}</td>
                  <td style={cellStyle}>{new Date(a.dateTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 style={{ marginTop: "30px" }}>Top Patients</h2>
        {topPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Visits</th>
              </tr>
            </thead>
            <tbody>
              {topPatients.map(([name, count], index) => (
                <tr key={index}>
                  <td style={cellStyle}>{name}</td>
                  <td style={cellStyle}>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left"
};
