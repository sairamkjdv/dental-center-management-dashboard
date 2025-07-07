import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHeader from "../components/AdminHeader";

export default function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    contact: "",
    healthInfo: "",
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

    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);
  }, [navigate]);

  const saveToLocal = (updated) => {
    localStorage.setItem("patients", JSON.stringify(updated));
    setPatients(updated);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        files: [...(prev.files || []), { name: file.name, url: reader.result }],
      }));
      toast.success("File uploaded");
    };
    reader.readAsDataURL(file);
  };

  const handleAddOrUpdate = () => {
    if (!form.name || !form.dob || !form.contact || !form.healthInfo) {
      toast.warn("Please fill all fields");
      return;
    }

    const updated = [...patients];

    if (editIndex !== null) {
      updated[editIndex] = { ...updated[editIndex], ...form };
      setEditIndex(null);
      toast.success("Patient updated!");
    } else {
      const id = "p" + (patients.length + 1);
      updated.push({ id, ...form });
      toast.success("Patient added!");
    }

    saveToLocal(updated);
    setForm({ name: "", dob: "", contact: "", healthInfo: "", files: [] });
  };

  const handleEdit = (index) => {
    setForm(patients[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const updated = [...patients];
      updated.splice(index, 1);
      saveToLocal(updated);
      toast.info("Patient deleted.");
    }
  };

  return (
    <div>
      <AdminHeader title="Patients" />
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input type="date" name="dob" value={form.dob} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} />
          <input type="text" name="healthInfo" placeholder="Health Info" value={form.healthInfo} onChange={handleChange} />
          <input type="file" onChange={handleFileUpload} />
          <button onClick={handleAddOrUpdate}>
            {editIndex !== null ? "Update" : "Add"} Patient
          </button>
        </div>

        <h2>Patient List</h2>
        {patients.length === 0 ? (
          <p>No patients yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>DOB</th>
                <th style={cellStyle}>Contact</th>
                <th style={cellStyle}>Health Info</th>
                <th style={cellStyle}>Attachments</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{p.name}</td>
                  <td style={cellStyle}>{p.dob}</td>
                  <td style={cellStyle}>{p.contact}</td>
                  <td style={cellStyle}>{p.healthInfo}</td>
                  <td style={cellStyle}>
                    {(p.files || []).map((file, j) => (
                      <div key={j}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                      </div>
                    ))}
                  </td>
                  <td style={cellStyle}>
                    <button onClick={() => handleEdit(i)}>Edit</button>
                    <button onClick={() => handleDelete(i)} style={{ marginLeft: "5px" }}>Delete</button>
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
  border: "1px solid #ddd",
  textAlign: "left",
  verticalAlign: "top"
};
