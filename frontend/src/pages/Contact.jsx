import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage("Message envoyé avec succès !");
        setFormData({
          nom: "",
          email: "",
          message: ""
        });
      } else {
        setSuccessMessage("Erreur lors de l’envoi du message.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setSuccessMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Contact</h1>
      <p>Envoyez-nous un message.</p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.button}>
          Envoyer
        </button>
      </form>

      {successMessage && <p style={styles.message}>{successMessage}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "12px",
    fontSize: "16px"
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    minHeight: "120px"
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold"
  }
};

export default Contact;