import { NavLink } from "react-router-dom" // Importera NavLink
import { useAuth } from "../context/AuthContext"

const Header = () => {

  const { user, logout } = useAuth(); // Importera user och logout från AuthContext

  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/">Hem</NavLink></li>
          <li>
            {/* Om användaren är inloggad, visa länk till /mina-sidor */}
            {user && <NavLink to="/mina-sidor">Mina sidor</NavLink>}
          </li>
          <li>
            {/* Om användaren inte är inloggad, visa länk till /mina-sidor, annars visa knapp för att logga ut */}
            {!user ? <NavLink to="/mina-sidor">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header