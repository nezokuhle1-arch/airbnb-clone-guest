import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';
import airbnbLogo from '../assets/airbnb_logo.webp';

function Header() {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login' || pathname === '/signup';

  // Re-read the username whenever login or logout rings the "authchange" doorbell
  useEffect(() => {
    const syncUser = () => setUsername(localStorage.getItem('username'));
    window.addEventListener('authchange', syncUser);
    return () => window.removeEventListener('authchange', syncUser);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/location?search=${encodeURIComponent(term.trim())}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.dispatchEvent(new Event('authchange'));
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo"><img src={airbnbLogo} alt="airbnb" /></Link>

        {!isLoginPage && (
          <nav className="header-nav">
            <Link to="/">Places to stay</Link>
          </nav>
        )}

        <div className="header-right">
          <Link to="/">Become a host</Link>
          {username ? (
            <>
              <span className="user-pill">Hi, {username}</span>
              <button className="logout-button" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/signup" className="auth-link">Sign up</Link>
            </>
          )}
        </div>
      </div>

      {!isLoginPage && (
        <form className="search-bar container" onSubmit={handleSearch}>
          <div className="search-field">
            <label>Location</label>
            <input
              type="text"
              placeholder="Where are you going?"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div className="search-field">
            <label>Check in</label>
            <input type="date" />
          </div>
          <div className="search-field">
            <label>Check out</label>
            <input type="date" />
          </div>
          <div className="search-field">
            <label>Guests</label>
            <input type="number" placeholder="Add guests" min="1" />
          </div>
          <button type="submit" className="search-button">🔍</button>
        </form>
      )}
    </header>
  );
}

export default Header;