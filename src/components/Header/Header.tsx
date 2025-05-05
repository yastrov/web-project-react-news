import { NavLink } from "react-router-dom";
import worldIcon from "../../assets/world.gif";
import "./Header.css";
function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <NavLink to="/">
          <img src={worldIcon} alt="Мир" className="header-icon" />
          <span className="header-name">All News</span>
        </NavLink>
      </div>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
              end
            >
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Новости
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              О нас
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
