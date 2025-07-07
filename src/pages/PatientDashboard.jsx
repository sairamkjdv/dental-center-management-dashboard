import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser || loggedUser.role !== "Patient") {
      toast.error("Access denied. Patients only.");
      navigate("/");
      return;
    }

    setUser(loggedUser);
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const currentPatient = patients.find(p => p.id === loggedUser.patientId);
    setPatient(currentPatient);

    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const myAppointments = allAppointments.filter(
      a => a.patientId === loggedUser.patientId
    );

    setAppointments(myAppointments);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    toast.success("You have been logged out.");
    navigate("/");
  };

  if (!user || !patient) return <p>Loading...</p>;

  const now = new Date();
  const upcoming = appointments.filter(a => new Date(a.dateTime) >= now);
  const history = appointments.filter(a => new Date(a.dateTime) < now);

  return (
    <div>
      {/* 🧭 Top Blue Bar */}
      <div style={{
        background: "#0077cc",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0 }}>Patient Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "#fff",
            color: "#0077cc",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* 👤 Welcome Section */}
      <div style={{ padding: "10px 20px", background: "#f8f8f8" }}>
        <h3 style={{ margin: 0 }}>
          <strong>👤 Welcome, {patient.name}</strong>
        </h3>
      </div>

      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "40px" }}>
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Health Info:</strong> {patient.healthInfo}</p>
        </div>

        <h2>Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={theadStyle}>
                <th style={cellStyle}>Date & Time</th>
                <th style={cellStyle}>Reason</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Amount</th>
                <th style={cellStyle}>Attachments</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((a, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{new Date(a.dateTime).toLocaleString()}</td>
                  <td style={cellStyle}>{a.reason}</td>
                  <td style={cellStyle}>{a.status}</td>
                  <td style={cellStyle}>₹{a.amount}</td>
                  <td style={cellStyle}>{renderFiles(a.files)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 style={{ marginTop: "30px" }}>Appointment History</h2>
        {history.length === 0 ? (
          <p>No past appointments.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={theadStyle}>
                <th style={cellStyle}>Date & Time</th>
                <th style={cellStyle}>Reason</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Amount</th>
                <th style={cellStyle}>Attachments</th>
              </tr>
            </thead>
            <tbody>
              {history.map((a, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{new Date(a.dateTime).toLocaleString()}</td>
                  <td style={cellStyle}>{a.reason}</td>
                  <td style={cellStyle}>{a.status}</td>
                  <td style={cellStyle}>₹{a.amount}</td>
                  <td style={cellStyle}>{renderFiles(a.files)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// 📎 Attachments Renderer
function renderFiles(files) {
  if (!files || files.length === 0) return "—";
  return (
    <ul style={{ paddingLeft: "15px", margin: 0 }}>
      {files.map((file, i) => (
        <li key={i}>
          <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
        </li>
      ))}
    </ul>
  );
}

// 💠 Table Styling
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px"
};

const theadStyle = {
  backgroundColor: "#f1f1f1"
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
  verticalAlign: "top"
};
