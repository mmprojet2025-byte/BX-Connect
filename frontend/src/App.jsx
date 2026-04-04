import { useEffect, useState } from "react";

function App() {
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
      .then((response) => response.json())
      .then((data) => setActivities(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des activités :", error)
      );
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:8080/api/activities/${editingId}`
      : "http://localhost:8080/api/activities";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(
          editingId ? "Activité modifiée :" : "Activité ajoutée :",
          data
        );

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
      .then(() => {
        loadActivities();
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression :", error)
      );
  };

  const handleEdit = (activity) => {
    setFormData({
      titre: activity.titre,
      description: activity.description,
      date: activity.date.slice(0, 16),
      lieu: activity.lieu,
      categorie: activity.categorie,
    });

    setEditingId(activity.id);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Liste des activités</h1>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="titre"
            placeholder="Titre"
            value={formData.titre}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="lieu"
            placeholder="Lieu"
            value={formData.lieu}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="categorie"
            placeholder="Catégorie"
            value={formData.categorie}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            {editingId ? "Enregistrer les modifications" : "Ajouter une activité"}
          </button>

          {editingId && (
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => {
                setEditingId(null);
                setFormData({
                  titre: "",
                  description: "",
                  date: "",
                  lieu: "",
                  categorie: "",
                });
              }}
            >
              Annuler la modification
            </button>
          )}
        </form>

        {activities.length === 0 ? (
          <p style={styles.empty}>Aucune activité disponible pour le moment.</p>
        ) : (
          <div style={styles.grid}>
            {activities.map((a) => (
              <div key={a.id} style={styles.card}>
                <h2 style={styles.cardTitle}>{a.titre}</h2>

                <p style={styles.description}>
                  <strong>Description :</strong> {a.description}
                </p>

                <p style={styles.info}>📍 {a.lieu}</p>

                <p style={styles.info}>
                  📅 {new Date(a.date).toLocaleDateString("fr-BE")}
                </p>

                <p style={styles.category}>🏷️ {a.categorie}</p>

                <button
                  onClick={() => handleEdit(a)}
                  style={styles.editButton}
                >
                  ✏️ Modifier
                </button>

                <button
                  onClick={() => handleDelete(a.id)}
                  style={styles.deleteButton}
                >
                  🗑️ Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#222",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "100px",
    resize: "vertical",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#6b7280",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#666",
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "15px",
    color: "#1f2937",
  },
  description: {
    color: "#444",
    marginBottom: "12px",
  },
  info: {
    margin: "8px 0",
    color: "#555",
  },
  category: {
    marginTop: "15px",
    fontWeight: "bold",
    color: "#0f766e",
  },
  editButton: {
    marginTop: "15px",
    marginRight: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#f59e0b",
    color: "#fff",
    cursor: "pointer",
  },
  deleteButton: {
    marginTop: "15px",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#dc2626",
    color: "#fff",
    cursor: "pointer",
  },
};

export default App;