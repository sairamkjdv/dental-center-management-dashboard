import React, { useState, useEffect } from "react";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: "", dob: "", contact: "", healthInfo: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);
    console.log("Rendering PatientManagement");
  }, []);

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingId) {
      setPatients(patients.map(p => p.id === editingId ? { ...form, id: editingId } : p));
      setEditingId(null);
    } else {
      setPatients([...patients, { ...form, id: Date.now().toString() }]);
    }
    setForm({ name: "", dob: "", contact: "", healthInfo: "" });
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditingId(patient.id);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Patient Management</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          className="border p-2"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          placeholder="Contact"
          name="contact"
          value={form.contact}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          placeholder="Health Info"
          name="healthInfo"
          value={form.healthInfo}
          onChange={handleChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddOrUpdate}
      >
        {editingId ? "Update Patient" : "Add Patient"}
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Patient List</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2">Name</th>
              <th className="border px-2">DOB</th>
              <th className="border px-2">Contact</th>
              <th className="border px-2">Health Info</th>
              <th className="border px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td className="border px-2">{p.name}</td>
                <td className="border px-2">{p.dob}</td>
                <td className="border px-2">{p.contact}</td>
                <td className="border px-2">{p.healthInfo}</td>
                <td className="border px-2">
                  <button
                    className="text-blue-600 mr-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td className="border px-2 text-center" colSpan="5">
                  No patients added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;
