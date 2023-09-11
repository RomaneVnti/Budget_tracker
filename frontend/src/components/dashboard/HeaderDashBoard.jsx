import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function HeaderDashBoard() {
  const { user } = useAuth();
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

  return (
    <div>
      {user && userData && (
        <div>Bonjour, {userData.firstName}</div>
      )}
    </div>
  );
}
