import React from 'react';
import { useAuth } from './context/authContext'; // Assurez-vous que le chemin est correct

function Header() {
  const { user } = useAuth(); // Obtenez les informations de l'utilisateur depuis le contexte

  if (!user) {
    // Si l'utilisateur n'est pas connecté, ne pas afficher le header
    return null;
  }

  return (
    <header>
      <div>Bienvenue, {user.name} !</div>
    </header>
  );
}

export default Header;
