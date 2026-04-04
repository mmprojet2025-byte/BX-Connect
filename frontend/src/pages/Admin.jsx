import { useEffect, useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";

function Admin() {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "",
    lieu: "",
    categorie: "",
  });
  const [editingId, setEditingId] = useState(null);

   const loadActivities = () => {
    fetch("http://localhost:8080/api/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data));
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8080/api/activities/${editingId}`
      : "http://localhost:8080/api/activities";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      setFormData({
        titre: "",
        description: "",
        date: "",
        lieu: "",
        categorie: "",
      });
      setEditingId(null);
      loadActivities();
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/activities/${id}`, {
      method: "DELETE",
    }).then(loadActivities);
  };

  const handleEdit = (a) => {
    setFormData({
      titre: a.titre,
      description: a.description,
      date: a.date.slice(0, 16),
      lieu: a.lieu,
      categorie: a.categorie,
    });
    setEditingId(a.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      titre: "",
      description: "",
      date: "",
      lieu: "",
      categorie: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin</h1>

      <ActivityForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
        cancelEdit={cancelEdit}
      />

      <ActivityList
        activities={activities}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Admin;