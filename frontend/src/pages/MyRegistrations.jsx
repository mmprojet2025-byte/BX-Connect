import { useEffect, useState } from "react";

function MyRegistrations() {

  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Vous devez être connecté.");
      return;
    }

    fetch("http://localhost:8080/api/registrations/me", {

      headers: {
        Authorization: `Bearer ${token}`,
      },

    })

      .then((response) => response.json())

      .then((data) => {
        setRegistrations(data);
      })

      .catch((error) => {

        console.error(
          "Erreur chargement inscriptions :",
          error
        );

        setMessage("Erreur serveur");
      });

  }, []);

  return (

    <div style={styles.page}>

      <h1 style={styles.title}>
        Mes inscriptions
      </h1>

      {message && (
        <p style={styles.message}>
          {message}
        </p>
      )}

      {registrations.length === 0 ? (

        <p>
          Aucune inscription trouvée.
        </p>

      ) : (

        <div style={styles.grid}>

          {registrations.map((registration) => (

            <div
              key={registration.id}
              style={styles.card}
            >

              <h2 style={styles.cardTitle}>
                {registration.activity?.titre}
              </h2>

              <p>
                📍 {registration.activity?.lieu}
              </p>

              <p>
                📅{" "}
                {new Date(
                  registration.activity?.date
                ).toLocaleDateString("fr-BE")}
              </p>

              <p>
                📌 Statut :
                {" "}
                <strong>
                  {registration.statut}
                </strong>
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

const styles = {

  page: {
    padding: "20px",
  },

  title: {
    marginBottom: "20px",
  },

  message: {
    color: "red",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gap: "20px",
  },

  card: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },

  cardTitle: {
    marginTop: 0,
    color: "#111827",
  },

};

export default MyRegistrations;