function ActivityList({ activities, handleEdit, handleDelete, handleRegister }) {
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

          <div style={styles.actions}>
            {handleRegister && (
              <button
                onClick={() => handleRegister(a.id)}
                style={styles.registerButton}
              >
                ✅ S’inscrire
              </button>
            )}

            {handleEdit && (
              <button onClick={() => handleEdit(a)} style={styles.editButton}>
                ✏️ Modifier
              </button>
            )}

            {handleDelete && (
              <button
                onClick={() => handleDelete(a.id)}
                style={styles.deleteButton}
              >
                🗑️ Supprimer
              </button>
            )}
          </div>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#f9fafb",
    borderRadius: "14px",
    padding: "18px",
    border: "1px solid #e5e7eb",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "15px",
    color: "#1f2937",
    fontSize: "20px",
  },
  description: {
    color: "#444",
    marginBottom: "12px",
    lineHeight: "1.5",
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
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
    flexWrap: "wrap",
  },
  registerButton: {
    padding: "10px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
  editButton: {
    padding: "10px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#f59e0b",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
  deleteButton: {
    padding: "10px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#dc2626",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ActivityList;