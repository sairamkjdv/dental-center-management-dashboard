import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PatientIncidents = () => {
  const { id } = useParams(); // patientId from URL
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    treatment: "",
    status: "",
    nextDate: "",
    files: [],
  });

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const allIncidents = JSON.parse(localStorage.getItem("incidents")) || [];

    const found = patients.find((p) => p.id === id);
    setPatient(found);
    setIncidents(allIncidents.filter((i) => i.patientId === id));
  }, [id]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((res) => {
      setForm({ ...form, files: res });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    const newIncident = {
      id: uuidv4(),
      patientId: id,
      ...form,
    };
    const updated = [...all, newIncident];
    localStorage.setItem("incidents", JSON.stringify(updated));
    setIncidents(updated.filter((i) => i.patientId === id));
    // Clear form
    setForm({
      title: "",
      description: "",
      comments: "",
      appointmentDate: "",
      cost: "",
      treatment: "",
      status: "",
      nextDate: "",
      files: [],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incidents for {patient?.name}</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Comments"
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
        />
        <input
          type="datetime-local"
          className="w-full border p-2 rounded"
          value={form.appointmentDate}
          onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Treatment"
          value={form.treatment}
          onChange={(e) => setForm({ ...form, treatment: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Cost"
          type="number"
          value={form.cost}
          onChange={(e) => setForm({ ...form, cost: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          placeholder="Next Date"
          value={form.nextDate}
          onChange={(e) => setForm({ ...form, nextDate: e.target.value })}
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Add Incident
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">Incident History</h2>
      <ul className="space-y-4">
        {incidents.map((i) => (
          <li key={i.id} className="border p-4 rounded shadow">
            <div><strong>{i.title}</strong> - {new Date(i.appointmentDate).toLocaleString()}</div>
            <div>{i.description}</div>
            <div><em>{i.treatment}</em> - ₹{i.cost} - {i.status}</div>
            {i.files?.map((f, idx) => (
              <a
                key={idx}
                href={f.url}
                target="_blank"
                rel="noreferrer"
                className="block text-blue-600 underline"
              >
                {f.name}
              </a>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientIncidents;
