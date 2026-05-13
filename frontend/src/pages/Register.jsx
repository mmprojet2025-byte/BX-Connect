import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    fetch("http://localhost:8080/api/auth/register", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        nom,
        email,
        motDePasse,
      }),

    })

      .then((response) => response.json())

      .then((data) => {

        setMessage(data.message);

        if (data.success) {

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })

      .catch((error) => {

        console.error("Erreur inscription :", error);

        setMessage("Erreur serveur");
      });
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Créer un compte</h1>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px" }}
      >

        <div style={{ marginBottom: "10px" }}>

          <label>Nom</label>

          <br />

          <input
            type="text"
            placeholder="Votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

        </div>

        <div style={{ marginBottom: "10px" }}>

          <label>Email</label>

          <br />

          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

        </div>

        <div style={{ marginBottom: "10px" }}>

          <label>Mot de passe</label>

          <br />

          <input
            type="password"
            placeholder="Votre mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
            }}
          />

        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
          }}
        >
          Créer le compte
        </button>

      </form>

      <p style={{ marginTop: "15px" }}>
        Déjà un compte ?{" "}
        <a href="/login">
          Se connecter
        </a>
      </p>

      {message && (

        <p style={{ marginTop: "15px" }}>
          {message}
        </p>

      )}

    </div>
  );
}

export default Register;
