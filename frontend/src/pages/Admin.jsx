import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

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
      .then((data) => setActivities(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des activités :", error)
      );
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
    })
      .then((response) => response.json())
      .then(() => {
        setFormData({
          titre: "",
          description: "",
          date: "",
          lieu: "",
          categorie: "",
        });
        setEditingId(null);
        loadActivities();
      })
      .catch((error) =>
        console.error("Erreur lors de l'enregistrement de l'activité :", error)
      );
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/activities/${id}`, {
      method: "DELETE",
    })
      .then(() => loadActivities())
      .catch((error) =>
        console.error("Erreur lors de la suppression :", error)
      );
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

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Espace Admin</h1>
          <p className="admin-subtitle">
            Ajoute, modifie et supprime les activités de la plateforme.
          </p>
        </div>

        <button onClick={handleLogout} className="admin-logout-button">
          Se déconnecter
        </button>
      </div>

      <div className="admin-layout">
        <div className="admin-left-column">
          <div className="admin-panel">
            <h2 className="admin-panel-title">
              {editingId ? "Modifier une activité" : "Ajouter une activité"}
            </h2>

            <ActivityForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              editingId={editingId}
              cancelEdit={cancelEdit}
            />
          </div>
        </div>

        <div className="admin-right-column">
          <div className="admin-panel">
            <h2 className="admin-panel-title">Liste des activités</h2>

            <ActivityList
              activities={activities}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;