// DropdownMenuDashboard.jsx
import React from 'react';
import { Link, Navigate } from 'react-router-dom'; // Importez Link et Navigate depuis react-router-dom
import '../../style/homePage/DropDownMenu.css';

export default function DropdownMenuDashboard({ isOpen }) {
  const dropdownClass = isOpen ? 'dropdown-menu active' : 'dropdown-menu';

  return (
    <ul className={dropdownClass}>
      <li><Link to="/homePage">Accueil</Link></li>
      <li><Link to="/transactions">Transactions</Link></li>
      <li><Link to="/statistiques">Statistiques</Link></li>
      <li><Link to="/paramètres">Paramètres</Link></li>
      <li><Link to="/login">Déconnexion</Link></li>
    </ul>
  );
}
