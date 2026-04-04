function ActivityForm({
  formData,
  handleChange,
  handleSubmit,
  editingId,
  cancelEdit,
}) {
  return (
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
        <button type="button" style={styles.cancelButton} onClick={cancelEdit}>
          Annuler la modification
        </button>
      )}
    </form>
  );
}

const styles = {
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
};

export default ActivityForm;