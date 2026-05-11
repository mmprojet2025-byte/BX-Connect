import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        motDePasse: motDePasse,
        mot_de_passe: motDePasse,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("isAdmin", "true");
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);

          navigate("/admin");
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        setMessage("Erreur serveur");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Connexion Admin</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Mot de passe</label>
          <br />
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Se connecter
        </button>
      </form>

      {message && (
        <p style={{ color: "red", marginTop: "15px" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;