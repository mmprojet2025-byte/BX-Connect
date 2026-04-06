import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Bx-Connect</div>

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
            isActive ? "navbar-link active-link" : "navbar-link"
          }
          onClick={closeMenu}
        >
          Accueil
        </NavLink>

        <NavLink
          to="/activites"
          className={({ isActive }) =>
            isActive ? "navbar-link active-link" : "navbar-link"
          }
          onClick={closeMenu}
        >
          Activités
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "navbar-link active-link" : "navbar-link"
          }
          onClick={closeMenu}
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;