import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/HeaderDashboard.css';
import logo from '../../assets/logo3.png';
import { AiOutlineMenu } from 'react-icons/ai';
import DropdownMenuDashboard from './DropDownMenuDashboard';
import HomePage from '../homePage/HomePage'
import { Link } from 'react-router-dom';

export default function HeaderDashBoard() {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Ajout du state pour le menu

  // Fonction pour basculer l'état du menu ouvert/fermé
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Récupération des informations de l'utilisateur lorsqu'il est connecté
    if (user && user.id) {
      axios
        .get(`http://localhost:8000/users/${user.id}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
        });
    }
  }, [user]);

  const handleLogout = () => {
    // Déconnexion de l'utilisateur
    sessionStorage.removeItem('auth_token');
    setUser(null);
    window.location.href = '/homePage'; // Rediriger vers la page d'accueil après la déconnexion
  };

  return (
    <header className="header">
      <nav>
        <div className="container-header">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="links">
            <div className="navigationLinks">
              <Link to="/dashboard" className="about-link">Accueil</Link>
              <Link to="/transactions" className="about-link">Transactions</Link>
              <Link to="/statistique" className="about-link">Statistiques</Link>
              <Link to="/paramètres" className="about-link">Paramètres</Link>
            </div>
            <div className="small-button-false" onClick={handleLogout}>
              <div className="button clip-contents">
                <p className="get-it">Se déconnecter</p>
              </div>
            </div>
          </div>
          <div className="burgerMenu" onClick={toggleMenu}>
            <AiOutlineMenu />
          </div>

         
          <DropdownMenuDashboard isOpen={menuOpen} />
          
          {user ? null : <HomePage />} 
        </div>
      </nav>
    </header>
  );
}
