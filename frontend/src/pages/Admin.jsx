import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "",
    lieu: "",
    categorie: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/api/activities"),
      fetch("http://localhost:8080/api/registrations"),
      fetch("http://localhost:8080/api/contact"),
    ])
      .then(async ([a, r, m]) => {
        const activitiesData = await a.json();
        const registrationsData = await r.json();
        const messagesData = await m.json();

        setActivities(activitiesData);

        setRegistrations(
          registrationsData.sort(
            (a, b) => new Date(b.dateInscription) - new Date(a.dateInscription)
          )
        );

        setMessages(
          messagesData.sort(
            (a, b) => new Date(b.dateEnvoi) - new Date(a.dateEnvoi)
          )
        );

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement admin :", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadActivities = () => {
    fetch("http://localhost:8080/api/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des activités :", error)
      );
  };

  const loadRegistrations = () => {
    fetch("http://localhost:8080/api/registrations")
      .then((res) => res.json())
      .then((data) =>
        setRegistrations(
          data.sort(
            (a, b) => new Date(b.dateInscription) - new Date(a.dateInscription)
          )
        )
      )
      .catch((error) =>
        console.error("Erreur lors du chargement des inscriptions :", error)
      );
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
    if (!window.confirm("Voulez-vous vraiment supprimer cette activité ?")) {
      return;
    }

    fetch(`http://localhost:8080/api/activities/${id}`, {
      method: "DELETE",
    })
      .then(() => loadActivities())
      .catch((error) =>
        console.error("Erreur lors de la suppression :", error)
      );
  };

  const handleDeleteRegistration = (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette inscription ?")) {
      return;
    }

    fetch(`http://localhost:8080/api/registrations/${id}`, {
      method: "DELETE",
    })
      .then(() => loadRegistrations())
      .catch((error) =>
        console.error("Erreur lors de la suppression de l'inscription :", error)
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

  if (loading) {
    return <p className="admin-loading">Chargement...</p>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Espace Admin</h1>
          <p className="admin-subtitle">
            Gérez les activités, les inscriptions et les messages de contact.
          </p>
        </div>

        <button onClick={handleLogout} className="admin-logout-button">
          Se déconnecter
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Activités</h3>
          <p>{activities.length}</p>
        </div>

        <div className="stat-card">
          <h3>Inscriptions</h3>
          <p>{registrations.length}</p>
        </div>

        <div className="stat-card">
          <h3>Messages</h3>
          <p>{messages.length}</p>
        </div>
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

          <div className="admin-panel">
            <h2 className="admin-panel-title">Liste des inscriptions</h2>

            {registrations.length === 0 ? (
              <p className="empty-text">Aucune inscription pour le moment.</p>
            ) : (
              <div>
                {registrations.map((registration) => (
                  <div key={registration.id} className="registration-card">
                    <p>
                      <strong>Participant :</strong> {registration.user.nom}
                    </p>
                    <p>
                      <strong>Email :</strong> {registration.user.email}
                    </p>
                    <p>
                      <strong>Activité :</strong> {registration.activity.titre}
                    </p>
                    <p>
                      <strong>Date d’inscription :</strong>{" "}
                      {new Date(registration.dateInscription).toLocaleString(
                        "fr-BE",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>

                    <button
                      className="delete-registration-button"
                      onClick={() =>
                        handleDeleteRegistration(registration.id)
                      }
                    >
                      Supprimer l’inscription
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-panel">
            <h2 className="admin-panel-title">Messages de contact</h2>

            {messages.length === 0 ? (
              <p className="empty-text">Aucun message pour le moment.</p>
            ) : (
              <div>
                {messages.map((msg) => (
                  <div key={msg.id} className="message-card">
                    <p>
                      <strong>Nom :</strong> {msg.nom}
                    </p>
                    <p>
                      <strong>Email :</strong> {msg.email}
                    </p>
                    <p>
                      <strong>Message :</strong> {msg.message}
                    </p>
                    <p>
                      <strong>Date :</strong>{" "}
                      {new Date(msg.dateEnvoi).toLocaleString("fr-BE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;