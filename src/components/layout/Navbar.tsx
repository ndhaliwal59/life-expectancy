import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/layout.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          LifeSpan<span>Calculator</span>
        </Link>
        <div className="nav-menu">
          {isAuthenticated ? (
            <>
              <span className="nav-greeting">Hello, {user?.name}</span>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={logout} className="nav-link nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
