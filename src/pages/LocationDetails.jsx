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
    </div>
  );
}

export default LocationDetails;