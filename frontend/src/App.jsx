import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/">Accueil</Link>
        <Link to="/activites">Activités</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activites" element={<Activities />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: "flex",
    gap: "20px",
    padding: "15px",
    backgroundColor: "#111",
  },
};

export default App;