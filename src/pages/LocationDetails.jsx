import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import './LocationDetails.css';

function LocationDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await api.get(`/accommodations/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Failed to fetch listing', error);
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{listing.type} in {listing.location}</h1>
      <p className="subheading">⭐ {listing.rating} ({listing.reviews} reviews) · {listing.location}</p>

      <div className="gallery">
        <div className="gallery-main">
          {listing.images?.[0] ? (
            <img src={listing.images[0]} alt={listing.title} />
          ) : (
            <div className="gallery-placeholder" />
          )}
        </div>
        <div className="gallery-grid">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="gallery-thumb">
              {listing.images?.[i + 1] ? (
                <img src={listing.images[i + 1]} alt={`${listing.title} ${i + 2}`} />
              ) : (
                <div className="gallery-placeholder" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="details-layout">
        <div className="details-left">
          <div className="host-line">
            <p>Entire rental unit hosted by {listing.host?.username}</p>
            <p className="details-sub">{listing.guests} guests · {listing.bedrooms} bedroom · {listing.bathrooms} bath</p>
          </div>

          <div className="feature-list">
            {listing.enhancedCleaning && <p>✨ Enhanced Clean</p>}
            {listing.selfCheckin && <p>🔑 Self check-in</p>}
          </div>

          <p className="description">{listing.description}</p>

          <div className="section-divider" />

          <h3>Where you'll sleep</h3>
          <p>{listing.bedrooms} bedroom{listing.bedrooms !== 1 && 's'}</p>

          <div className="section-divider" />

          <h3>What this place offers</h3>
          <div className="amenities-grid">
            {listing.amenities?.map((amenity) => (
              <p key={amenity}>{amenity}</p>
            ))}
          </div>
        </div>

        {/* cost calculator goes here, next piece */}
      </div>
    </div>
  );
}

export default LocationDetails;