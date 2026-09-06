import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo">airbnb</Link>

        <nav className="header-nav">
          <Link to="/">Places to stay</Link>
        </nav>

        <div className="header-right">
          <Link to="/">Become a host</Link>
        </div>
      </div>

      <div className="search-bar container">
        <div className="search-field">
          <label>Location</label>
          <input type="text" placeholder="Where are you going?" />
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
        <button className="search-button">🔍</button>
      </div>
    </header>
  );
}

export default Header;