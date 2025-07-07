import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendar-custom.css";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";

export default function CalendarView() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("day"); // 'day' or 'week'
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== "Admin") {
      toast.error("Access denied. Admins only.");
      navigate("/");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
    filterAppointments(new Date(), "day", stored);
  }, [navigate]);

  const filterAppointments = (date, mode = viewMode, allAppointments = appointments) => {
    setSelectedDate(date);

    const result = allAppointments.filter((a) => {
      const apptDate = new Date(a.dateTime);
      const targetDate = new Date(date);

      if (mode === "day") {
        return apptDate.toDateString() === targetDate.toDateString();
      } else {
        // Weekly: Sunday to Saturday
        const startOfWeek = new Date(targetDate);
        startOfWeek.setDate(targetDate.getDate() - targetDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return apptDate >= startOfWeek && apptDate <= endOfWeek;
      }
    });

    setFilteredAppointments(result);
  };

  const handleToggleView = () => {
    const newView = viewMode === "day" ? "week" : "day";
    setViewMode(newView);
    filterAppointments(selectedDate, newView);
  };

  return (
    <div>
      <AdminHeader title="Calendar View" />
      <div style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
        {/* 📅 Calendar */}
        <div style={{ flex: "1 1 300px", marginRight: "30px" }}>
          <h3>Select Date</h3>
          <Calendar
            onChange={(date) => filterAppointments(date, viewMode)}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const hasAppt = appointments.some(
                  (a) => new Date(a.dateTime).toDateString() === date.toDateString()
                );
                return hasAppt ? "has-appointment" : null;
              }
            }}
          />
          <button onClick={handleToggleView} style={{ marginTop: "15px" }}>
            View: {viewMode === "day" ? "Switch to Weekly" : "Switch to Daily"}
          </button>
        </div>

        {/* 🗓 Appointments */}
        <div style={{ flex: "2 1 400px" }}>
          <h3>
            Appointments for{" "}
            {viewMode === "day"
              ? selectedDate.toDateString()
              : `Week of ${selectedDate.toLocaleDateString()}`}
          </h3>

          {filteredAppointments.length === 0 ? (
            <p>No appointments for this {viewMode}.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9f9f9" }}>
                  <th style={cellStyle}>Patient</th>
                  <th style={cellStyle}>Reason</th>
                  <th style={cellStyle}>Date & Time</th>
                  <th style={cellStyle}>Status</th>
                  <th style={cellStyle}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((a, i) => (
                  <tr key={i}>
                    <td style={cellStyle}>{a.patientName}</td>
                    <td style={cellStyle}>{a.reason}</td>
                    <td style={cellStyle}>{new Date(a.dateTime).toLocaleString()}</td>
                    <td style={cellStyle}>{a.status}</td>
                    <td style={cellStyle}>₹{a.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left"
};
