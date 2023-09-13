import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function MainDasboardTitle() {
  const { user } = useAuth();
  const [totalMonthlyBudget, setTotalMonthlyBudget] = useState(null);

  useEffect(() => {
    if (user) {
      console.log('Objet user:', user);
  
      // Utilisez user.userId pour extraire l'ID de l'utilisateur
      const userId = user.id;
      console.log('ID de l\'utilisateur:', userId);
  
      // Effectuez une requête GET pour récupérer le total du budget mensuel de l'utilisateur
      axios
        .get(`http://localhost:8000/budget/totalMonthlyBudget/${userId}`)
        .then((response) => {
          // Mettez à jour l'état local avec le total du budget mensuel récupéré
          setTotalMonthlyBudget(response.data.totalMonthlyBudget);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du total du budget mensuel:', error);
        });
    }
  }, [user]);

  // Fonction pour mettre en majuscule la première lettre d'une chaîne
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <main className='main'>
      <div>
        <div className="titleFirstName">
          {user && `Bonjour, ${capitalizeFirstLetter(user.firstName)}!`}
        </div>

        <div className="Title">
          <h1>
            <div>Tableau de bord</div>
            <div className='subtitle2'>Septembre 2023</div>
          </h1>
        </div>

        <div className="BoxDepense">
          <div className='BoxtitleDepensePrevisionnelle'>
            <div className="titleDepense">
              Dépenses prévisionnelles
            </div>
            <div>
              {totalMonthlyBudget !== null ? totalMonthlyBudget : '0'}
            </div>
          </div>

          <div className='BoxtitleDepenseReelle'>
            <div className="titleDepense">
              Dépenses réelles
            </div>
            <div></div>
          </div>

          <div className='BudgetRestant'>
            <div className="titleDepense">
              Budget restant
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
