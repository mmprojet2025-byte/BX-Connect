import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const nom = localStorage.getItem("nom");
  const role = localStorage.getItem("role");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nom");

    navigate("/login");

    window.location.reload();
  };

  return (

    <nav className="navbar">

      <div className="navbar-logo">
        Bx-Connect
      </div>

      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "navbar-link active-link"
              : "navbar-link"
          }
          onClick={closeMenu}
        >
          Accueil
        </NavLink>

        <NavLink
          to="/activites"
          className={({ isActive }) =>
            isActive
              ? "navbar-link active-link"
              : "navbar-link"
          }
          onClick={closeMenu}
        >
          Activités
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "navbar-link active-link"
              : "navbar-link"
          }
          onClick={closeMenu}
        >
          {nom && (
  <NavLink
    to="/mes-inscriptions"
    className={({ isActive }) =>
      isActive
        ? "navbar-link active-link"
        : "navbar-link"
    }
    onClick={closeMenu}
  >
    Mes inscriptions
  </NavLink>
)}


          Contact
        </NavLink>

        {role === "ROLE_ADMIN" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "navbar-link active-link"
                : "navbar-link"
            }
            onClick={closeMenu}
          >
            Admin
          </NavLink>
        )}

        {!nom && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active-link"
                  : "navbar-link"
              }
              onClick={closeMenu}
            >
              Connexion
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active-link"
                  : "navbar-link"
              }
              onClick={closeMenu}
            >
              Inscription
            </NavLink>
          </>
        )}

        {nom && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginLeft: "15px",
              color: "white",
              fontWeight: "bold",
            }}
          >

            <span>
              {nom}
            </span>

            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "#111827",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Déconnexion
            </button>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;