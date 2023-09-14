import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/HeaderDashboard.css';


export default function MainDasboardTitle() {
  const { user } = useAuth();
  const [totalMonthlyBudget, setTotalMonthlyBudget] = useState(null);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(null);
  const [remainingBudget, setRemainingBudget] = useState(null); // État pour le budget restant


  useEffect(() => {
    if (user) {
      // Utilisez user.userId pour extraire l'ID de l'utilisateur
      const userId = user.id;

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
        

      // Effectuez une requête GET pour récupérer le total des dépenses réelles de l'utilisateur
      axios
        .get(`http://localhost:8000/transaction/totalExpenseAmount/${userId}`)
        .then((response) => {

          // Mettez à jour l'état local avec le total des dépenses réelles récupéré
          setTotalExpenseAmount(response.data);
          
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du total des dépenses réelles:', error);
        });

    }
  }, [user]);

  useEffect(() => {
    if (totalMonthlyBudget !== null && totalExpenseAmount !== null) {
      // Calculez le budget restant en soustrayant les dépenses aux revenus mensuels
      const remaining = totalMonthlyBudget - totalExpenseAmount;
      setRemainingBudget(remaining);
    }
  }, [totalMonthlyBudget, totalExpenseAmount]);


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
            <div className='totalMonthlyBudget'>
              {totalMonthlyBudget ?? '0'}
            </div>
          </div>

          <div className='BoxtitleDepenseReelle'>
            <div className="titleDepense">
              Dépenses réelles
            </div>
            <div className='totalExpenseAmount'>
            {totalExpenseAmount ?? '0'}
            </div>
          </div>

          <div className='BudgetRestant'>
            <div className="titleDepense">
              Budget restant
            </div>
            <div className='remainingBudget'>
            {remainingBudget !== null ? remainingBudget : 'Calcul en cours...'}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
