import React from 'react';
import '../../style/dashboard/Footer.css'; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 Budget Tracker</p>
        <ul className="footer-links">
          <li><a href="/">Accueil</a></li>
          <li><a href="/a-propos">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
