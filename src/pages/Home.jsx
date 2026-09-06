import './Home.css';
import heroImage from '../assets/airbnb-hero-banner.png';
import img1 from '../assets/sandton-city-hotel.jpeg';
import img2 from '../assets/the-michelangelo-hotel.jpg';
import img3 from '../assets/palazzo-hotel.avif';
import img4 from '../assets/hyde-park-hotel.jpg';
import tripImage from '../assets/trip-image.jpg';
import homeImage from '../assets/home-exeprience.jpg';

function Home() {
  const suggestedLocations = [
    { title: 'Sandton City Hotel', distance: '55 mi away', image: img1, color: '#FF385C' },
    { title: 'Joburg City Hotel', distance: '150 mi away', image: img2, color: '#E31C5F' },
    { title: 'Woodmead Hotel', distance: '30 mi away', image: img3, color: '#D93900' },
    { title: 'Hyde Park Hotel', distance: '34 mi away', image: img4, color: '#C13515' },
  ];

  return (
    <>
      <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay">
          <h1>Not sure where to go? Perfect.</h1>
          <button className="hero-cta">I'm flexible</button>
        </div>
      </div>

      <section className="inspiration container">
        <h2>Inspiration for your next trip</h2>
        <div className="inspiration-grid">
          {suggestedLocations.map((location) => (
            <div key={location.title} className="inspiration-card">
              <img src={location.image} alt={location.title} />
              <div className="inspiration-info" style={{ backgroundColor: location.color }}>
                <p className="inspiration-title">{location.title}</p>
                <p className="inspiration-distance">{location.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="experiences container">
        <h2>Discover Airbnb Experiences</h2>
        <div className="experiences-grid">
          <div className="experience-card" style={{ backgroundImage: `url(${tripImage})` }}>
            <p className="experience-title">Things to do on your trip</p>
            <button className="experience-button">Experiences</button>
          </div>
          <div className="experience-card" style={{ backgroundImage: `url(${homeImage})` }}>
            <p className="experience-title">Things to do from home</p>
            <button className="experience-button">Online Experiences</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;