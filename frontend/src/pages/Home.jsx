import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.title}>Bienvenue sur Bx-Connect</h1>

        <p style={styles.subtitle}>
          Une plateforme simple et moderne pour gérer, valoriser et suivre les
          activités de votre association.
        </p>

        <div style={styles.buttons}>
          <Link to="/activites" style={styles.primaryButton}>
            Voir les activités
          </Link>

          <Link to="/admin" style={styles.secondaryButton}>
            Aller vers l’admin
          </Link>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Ce que permet la plateforme</h2>

        <div style={styles.featuresGrid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📋 Gérer les activités</h3>
            <p style={styles.cardText}>
              Crée, modifie et supprime facilement les activités de ton
              association depuis un espace centralisé.
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>👀 Voir les activités</h3>
            <p style={styles.cardText}>
              Consulte la liste des activités disponibles dans une interface
              claire et agréable.
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>⚙️ Organiser plus simplement</h3>
            <p style={styles.cardText}>
              Structure ton travail avec une application pensée pour être simple,
              propre et évolutive.
            </p>
          </div>
        </div>
      </section>

      <section style={styles.whySection}>
        <div style={styles.whyContent}>
          <h2 style={styles.sectionTitle}>Pourquoi utiliser Bx-Connect ?</h2>

          <p style={styles.whyIntro}>
            Bx-Connect aide les associations à mieux gérer leurs activités,
            mieux s’organiser au quotidien et offrir une expérience plus claire
            aux membres et aux participants.
          </p>

          <div style={styles.whyGrid}>
            <div style={styles.whyCard}>
              <h3 style={styles.whyCardTitle}>Centraliser</h3>
              <p style={styles.whyCardText}>
                Regroupe les informations importantes dans un seul espace :
                activités, gestion et suivi.
              </p>
            </div>

            <div style={styles.whyCard}>
              <h3 style={styles.whyCardTitle}>Organiser</h3>
              <p style={styles.whyCardText}>
                Facilite le travail administratif avec une interface simple pour
                ajouter, modifier et supprimer les activités.
              </p>
            </div>

            <div style={styles.whyCard}>
              <h3 style={styles.whyCardTitle}>Valoriser</h3>
              <p style={styles.whyCardText}>
                Mets en avant les actions de l’association avec une présentation
                plus claire et plus professionnelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>+50</h2>
            <p style={styles.statText}>Activités organisées</p>
          </div>

          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>100%</h2>
            <p style={styles.statText}>Simple à utiliser</p>
          </div>

          <div style={styles.statCard}>
            <h2 style={styles.statNumber}>+10</h2>
            <p style={styles.statText}>Associations connectées</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  hero: {
    background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
    color: "#ffffff",
    padding: "70px 30px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
  },
  title: {
    fontSize: "42px",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "18px",
    maxWidth: "750px",
    margin: "0 auto 30px auto",
    lineHeight: "1.6",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  primaryButton: {
    backgroundColor: "#ffffff",
    color: "#1d4ed8",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "600",
    border: "1px solid rgba(255,255,255,0.5)",
  },
  featuresSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  sectionTitle: {
    textAlign: "center",
    color: "#111827",
    marginBottom: "10px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "12px",
    color: "#111827",
  },
  cardText: {
    margin: 0,
    color: "#4b5563",
    lineHeight: "1.6",
  },
  whySection: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px 24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
  },
  whyContent: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  whyIntro: {
    textAlign: "center",
    color: "#4b5563",
    maxWidth: "760px",
    margin: "0 auto 30px auto",
    lineHeight: "1.7",
  },
  whyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  whyCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "16px",
    padding: "22px",
    border: "1px solid #e5e7eb",
  },
  whyCardTitle: {
    marginTop: 0,
    marginBottom: "10px",
    color: "#1f2937",
  },
  whyCardText: {
    margin: 0,
    color: "#4b5563",
    lineHeight: "1.6",
  },
  statsSection: {
    backgroundColor: "#1f2937",
    borderRadius: "20px",
    padding: "40px 20px",
    color: "#ffffff",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    textAlign: "center",
  },
  statCard: {
    padding: "20px",
  },
  statNumber: {
    fontSize: "36px",
    margin: 0,
    marginBottom: "10px",
    fontWeight: "bold",
  },
  statText: {
    margin: 0,
    color: "#d1d5db",
  },
};

export default Home;