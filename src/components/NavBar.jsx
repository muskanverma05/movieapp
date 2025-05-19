import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useTheme } from "../contexts/ThemeContext";

function NavBar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      {/* Skip link for keyboard users to jump to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <nav className="navbar" aria-label="Primary navigation">
        <div className="navbar-brand">
          <Link to="/" aria-label="Go to home page">
            Movie App
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link" aria-current="page">
            Home
          </Link>
          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            aria-pressed={darkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="dark-mode-toggle"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
