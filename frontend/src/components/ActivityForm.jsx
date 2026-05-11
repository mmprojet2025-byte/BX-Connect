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

      <input
        type="number"
        name="capaciteMax"
        placeholder="Capacité maximale"
        value={formData.capaciteMax}
        onChange={handleChange}
        style={styles.input}
        min="0"
      />

      <input
        type="number"
        name="placesDisponibles"
        placeholder="Places disponibles"
        value={formData.placesDisponibles}
        onChange={handleChange}
        style={styles.input}
        min="0"
      />

      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="payante"
          checked={formData.payante}
          onChange={handleChange}
        />
        Activité payante
      </label>

      <input
        type="number"
        name="prix"
        placeholder="Prix en €"
        value={formData.prix}
        onChange={handleChange}
        style={styles.input}
        min="0"
        step="0.01"
        disabled={!formData.payante}
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
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
  },
  textarea: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    minHeight: "100px",
    resize: "vertical",
    outline: "none",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    color: "#374151",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "600",
  },
  cancelButton: {
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#6b7280",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ActivityForm;