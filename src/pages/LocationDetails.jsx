import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './LocationDetails.css';

function LocationDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();
  const [reserveError, setReserveError] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState(false);

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

  const nights = checkIn && checkOut
  ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
  : 0;
  const subtotal = nights * listing.price;
  const weeklyDiscountAmount = nights >= 7? listing.weeklyDiscount : 0;
  const total = subtotal -weeklyDiscountAmount + listing.cleaningFee + listing.serviceFee + listing.occupancyTaxes;


    const handleReserve = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
      
        try {
          await api.post('/reservations', {
            accommodation: id,
            checkIn,
            checkOut,
            guests,
            totalCost: total,
          });
          setReserveSuccess(true);
          setReserveError('');
        } catch (err) {
          setReserveError(err.response?.data?.message || 'Failed to reserve');
        }
    };

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

        <div className="cost-calculator">
            <p className="calc-price"><span className="calc-price-amount">R{listing.price}</span> / night</p>

            <div className="calc-dates">
                <div className="calc-date-field">
                <label>Check-in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                </div>
                <div className="calc-date-field">
                <label>Check-out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                </div>
            </div>

            <div className="calc-guests-field">
                <label>Guests</label>
                <input
                type="number"
                min="1"
                max={listing.guests}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                />
            </div>

            {nights > 0 && (
                <div className="calc-breakdown">
                <div className="calc-line">
                    <span>R{listing.price} x {nights} nights</span>
                    <span>R{subtotal}</span>
                </div>
                {weeklyDiscountAmount > 0 && (
                    <div className="calc-line calc-discount">
                    <span>Weekly discount</span>
                    <span>-R{weeklyDiscountAmount}</span>
                    </div>
                )}
                <div className="calc-line">
                    <span>Cleaning fee</span>
                    <span>R{listing.cleaningFee}</span>
                </div>
                <div className="calc-line">
                    <span>Service fee</span>
                    <span>R{listing.serviceFee}</span>
                </div>
                <div className="calc-line">
                    <span>Occupancy taxes and fees</span>
                    <span>R{listing.occupancyTaxes}</span>
                </div>
                <div className="calc-line calc-total">
                    <span>Total</span>
                    <span>R{total}</span>
                </div>
                </div>
            )}

            <button className="reserve-button" disabled={nights === 0} onClick={handleReserve}>
            Reserve
            </button>
            {reserveSuccess && <p className="reserve-success">Reservation confirmed!</p>}
            {reserveError && <p className="reserve-error">{reserveError}</p>}
            </div>
      </div>
    </div>
  );
}

export default LocationDetails;