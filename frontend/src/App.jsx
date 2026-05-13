import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Contact from "./pages/Contact";

function App() {

  const role = localStorage.getItem("role");
  const isAdmin = role === "ROLE_ADMIN";

  return (
    <Router>

      <div style={styles.app}>

        <Navbar />

        <main style={styles.main}>

          <Routes>

            <Route path="/" element={<Home />} />

            <Route
              path="/activites"
              element={<Activities />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/admin"
              element={
                isAdmin
                  ? <Admin />
                  : <Navigate to="/login" />
              }
            />

          </Routes>

        </main>

      </div>

    </Router>
  );
}

const styles = {

  app: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    fontFamily: "Arial, sans-serif",
  },

  main: {
    padding: "30px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

};

export default App;