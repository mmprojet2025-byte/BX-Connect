import { useEffect, useState } from "react";
import ActivityList from "../components/ActivityList";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((error) =>
        console.error("Erreur lors du chargement des activités :", error)
      );
  }, []);

  const handleRegister = async (activityId) => {
    try {
      const response = await fetch("http://localhost:8080/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          activityId: activityId,
        }),
      });

      if (response.ok) {
        setMessage("Inscription réussie !");
      } else {
        const errorText = await response.text();
        setMessage("Erreur : " + errorText);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setMessage("Erreur serveur lors de l'inscription.");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Nos activités</h1>
      <p style={styles.subtitle}>
        Découvrez les différentes activités disponibles sur la plateforme.
      </p>

      {message && <p style={styles.message}>{message}</p>}
<ActivityList
  activities={activities}
  handleRegister={handleRegister}
/>
     
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    marginBottom: "5px",
    color: "#111827",
  },
  subtitle: {
    marginTop: 0,
    marginBottom: "20px",
    color: "#6b7280",
  },
  message: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f3f4f6",
    color: "#111827",
    fontWeight: "500",
  },
};

export default Activities;