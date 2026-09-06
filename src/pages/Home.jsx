import './Home.css';
import heroImage from '../assets/airbnb-hero-banner.png';

function Home() {
  return (
    <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay">
        <h1>Not sure where to go? Perfect.</h1>
        <button className="hero-cta">I'm flexible</button>
      </div>
    </div>
  );
}

export default Home;