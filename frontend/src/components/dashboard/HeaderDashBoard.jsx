import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function HeaderDashBoard() {
  const { user, setUser } = useAuth(); // Obtenez également la fonction setUser pour la déconnexion
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      // Utilisez l'ID de l'utilisateur pour récupérer ses informations depuis le backend
      axios.get(`http://localhost:8000/users/${user.id}`)
        .then((response) => {
          setUserData(response.data); // Stockez les informations de l'utilisateur dans l'état local
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
        });
    }
  }, [user]);

  const handleLogout = () => {
    // Par exemple, localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token');

    // Assurez-vous également de vider les données de l'utilisateur
    
    setUser(null);
    window.location.href = '/homePage'
  };

  return (
    <div className="header">
      <div className="logo">
        {/* Insérez votre logo ici */}
        <img src="votre-logo.png" alt="Logo" />
      </div>
      <div className="navigation">
        {/* Ajoutez des liens de navigation ici */}
        <a href="/accueil">Accueil</a>
        <a href="/profil">Profil</a>
        <a href="/parametres">Paramètres</a>
      </div>
      {user && userData && (
        <div className="user-greeting">
          <p>Bonjour, {userData.firstName}</p>
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      )}
    </div>
  );
}
