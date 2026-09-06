import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './Location.css';

function Location() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get('/accommodations');
        setListings(response.data);
      } catch (error) {
        console.error('Failed to fetch listings', error);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) =>
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="location-filter-bar">
        <input
          type="text"
          placeholder="Filter by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="filter-pill">Price</span>
        <span className="filter-pill">Type of place</span>
        <span className="filter-pill">Free cancellation</span>
      </div>

      <h2>{filteredListings.length} stays {searchTerm && `in ${searchTerm}`}</h2>

      <div className="location-cards">
        {filteredListings.map((listing) => (
          <Link to={`/location/${listing._id}`} key={listing._id} className="location-card">
            {listing.images?.[0] ? (
              <img src={listing.images[0]} alt={listing.title} />
            ) : (
              <div className="location-card-placeholder" />
            )}
            <div className="location-card-info">
              <p className="location-card-type">{listing.type} in {listing.location}</p>
              <p className="location-card-title">{listing.title}</p>
              <p className="location-card-amenities">{listing.amenities?.join(' · ')}</p>
              <p className="location-card-rating">⭐ {listing.rating} ({listing.reviews} reviews)</p>
              <p className="location-card-price">R{listing.price} / night</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Location;