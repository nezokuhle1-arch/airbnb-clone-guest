import './Footer.css';

function Footer() {
  const linkColumns = [
    { title: 'Support', links: ['Help Center', 'Safety information', 'Cancellation options', 'Report a concern'] },
    { title: 'Community', links: ['Disaster relief housing', 'Support: Afghan refugees', 'Combating discrimination'] },
    { title: 'Hosting', links: ['Try hosting', 'AirCover for Hosts', 'Explore hosting resources'] },
    { title: 'About', links: ['Newsroom', 'Careers', 'Investors', 'Airbnb Luxe'] },
  ];

  return (
    <footer className="footer">
      <div className="footer-columns container">
        {linkColumns.map((col) => (
          <div key={col.title} className="footer-column">
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom container">
        <p>© 2026 Airbnb, Inc.</p>
        <div className="footer-bottom-right">
          <span>🇿🇦 South Africa English (US)</span>
          <span>$ USD</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;