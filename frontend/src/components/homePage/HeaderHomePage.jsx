import React, { useState, useEffect } from 'react';
import '../../style/login/Login.css';
import logo from '../../assets/logo3.png';
import '../../style/homePage/HeaderHomePage.css';
import { AiOutlineMenu } from 'react-icons/ai';
import DropdownMenu from './DropDownMenu'; // Importez le composant DropdownMenu
import { useAuth } from '../../context/AuthContext'; // Importez useAuth

export default function HeaderHomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleLoginForm } = useAuth(); // Utilisez useAuth pour accéder à toggleLoginForm

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Gestionnaire d'événement pour fermer le menu en redimensionnant la fenêtre
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    console.log('Clic sur le bouton Se connecter'); // Ajoutez cette ligne
    toggleLoginForm(); // Utilisez la fonction toggleLoginForm pour ouvrir le formulaire
  };

  return (
    <header className='Header'>
      <nav>
        <div className="container-header">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="links">
            <a className="about-link" href="/a-propos">À propos</a>
            <div className="small-button-false" onClick={toggleLoginForm}>
              {/* Utilisez la fonction handleClick pour ouvrir le formulaire */}
              <div className="button clip-contents">
                <p className="get-it">Se connecter</p>
              </div>
            </div>
          </div>

          {/* Bouton du menu burger */}
          <div className="burgerMenu" onClick={toggleMenu}>
            <AiOutlineMenu />
          </div>

          {/* Utilisez le composant DropdownMenu ici */}
          <DropdownMenu isOpen={menuOpen} />
        </div>
      </nav>
    </header>
  );
}
