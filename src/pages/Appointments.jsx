import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exportAppointmentsToCSV } from "../utils/exportToCSV";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";

export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    dateTime: "",
    reason: "",
    status: "pending",
    amount: "",
    files: []
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== "Admin") {
      toast.error("Access denied. Admins only.");
      navigate("/");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, [navigate]);

  const saveToLocal = (updated) => {
    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!form.patientName || !form.dateTime || !form.reason || !form.amount) {
      toast.warn("Please fill all fields");
      return;
    }

    const updated = [...appointments];
    if (editIndex !== null) {
      updated[editIndex] = form;
      toast.success("Appointment updated!");
      setEditIndex(null);
    } else {
      updated.push(form);
      toast.success("Appointment added!");
    }

    saveToLocal(updated);
    setForm({
      patientName: "",
      dateTime: "",
      reason: "",
      status: "pending",
      amount: "",
      files: []
    });
  };

  const handleEdit = (index) => {
    setForm(appointments[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updated = [...appointments];
      updated.splice(index, 1);
      saveToLocal(updated);
      toast.info("Appointment deleted.");
    }
  };

  const handleExport = () => {
    exportAppointmentsToCSV(appointments);
    toast.success("Appointments exported!");
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

    files.forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Invalid file type: ${file.name}`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          files: [...(prev.files || []), { name: file.name, url: reader.result }]
        }));
        toast.success(`${file.name} uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <AdminHeader title="Appointments" />
      <div style={{ padding: "20px" }}>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={form.patientName}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="dateTime"
          value={form.dateTime}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={handleChange}
        />
        <input type="file" multiple onChange={handleFileUpload} />
        {form.files.length > 0 && (
          <p style={{ marginTop: "5px", fontStyle: "italic" }}>
            {form.files.length} file(s) selected
          </p>
        )}

        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"} Appointment
        </button>
        <button onClick={handleExport} style={{ marginLeft: "10px" }}>
          Export to CSV
        </button>

        <hr />
        <h2>All Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f2f2f2" }}>
              <tr>
                <th style={cellStyle}>Patient</th>
                <th style={cellStyle}>Reason</th>
                <th style={cellStyle}>Date & Time</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Amount</th>
                <th style={cellStyle}>Attachments</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{a.patientName}</td>
                  <td style={cellStyle}>{a.reason}</td>
                  <td style={cellStyle}>{new Date(a.dateTime).toLocaleString()}</td>
                  <td style={cellStyle}>{a.status}</td>
                  <td style={cellStyle}>₹{a.amount}</td>
                  <td style={cellStyle}>
                    {a.files && a.files.length > 0 ? (
                      <ul style={{ paddingLeft: "15px", margin: 0 }}>
                        {a.files.map((file, j) => (
                          <li key={j}>
                            <a href={file.url} target="_blank" rel="noreferrer">
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td style={cellStyle}>
                    <button onClick={() => handleEdit(i)}>Edit</button>
                    <button onClick={() => handleDelete(i)} style={{ marginLeft: "5px" }}>
                      Delete
                    </button>
                  </td>
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
  border: "1px solid #ccc",
  textAlign: "left",
  verticalAlign: "top"
};
