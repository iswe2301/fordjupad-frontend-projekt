import { NavLink } from "react-router-dom" // Importera NavLink
import { useAuth } from "../context/AuthContext"

// Header-komponent
const Header = () => {

  const { user, logout } = useAuth(); // Importera user och logout från AuthContext

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 px-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Länk till startsidan */}
          <NavLink to="/" className="navbar-brand"><i className="bi bi-book"></i> BookFinder</NavLink>

          {/* Knapp för att visa hamburgermeny på mobil */}
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menyn */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <NavLink to="/" className="nav-link mx-4"><i className="bi bi-house-door"></i> Hem</NavLink>
              </li>

              {/* Om användaren är inloggad, visa länk till /mina-sidor */}
              {user && (
                <li className="nav-item">
                  <NavLink to="/mina-sidor" className="nav-link mx-4"><i className="bi bi-person"></i> Mina sidor</NavLink>
                </li>
              )}

              {/* Om användaren inte är inloggad, visa länkar till /logga-in och /registrera på samma rad */}
              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/logga-in" className="nav-link mx-4"><i className="bi bi-box-arrow-in-right"></i> Logga in</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/registrera" className="nav-link ms-4 last"><i className="bi bi-person-plus"></i> Registrera</NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-outline-light ms-4 last"><i className="bi bi-box-arrow-right"></i> Logga ut</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;