import { NavLink } from "react-router-dom" // Importera NavLink

const Header = () => {
  return (
    <header>
        <nav>
            <ul>
                <li><NavLink to="/">Hem</NavLink></li>
                <li><NavLink to="/logga-in">Logga in</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header