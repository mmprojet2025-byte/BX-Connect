function ActivityList({ activities, handleEdit, handleDelete }) {
  if (activities.length === 0) {
    return <p style={styles.empty}>Aucune activité disponible pour le moment.</p>;
  }

  return (
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

          <button onClick={() => handleEdit(a)} style={styles.editButton}>
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
  );
}

const styles = {
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

export default ActivityList;