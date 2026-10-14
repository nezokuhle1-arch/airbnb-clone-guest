import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import airbnbLogo from '../assets/airbnb_logo.webp';

function Header() {
  const username = localStorage.getItem('username');
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/location?search=${encodeURIComponent(term.trim())}`);
  };

  
  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo"><img src={airbnbLogo} alt="airbnb" /></Link>

        <nav className="header-nav">
          <Link to="/">Places to stay</Link>
        </nav>

        <div className="header-right">
          <Link to="/">Become a host</Link>
          {username ? (
            <span className="user-pill">Hi, {username}</span>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

    
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
    </header>
  );
}

export default Header;