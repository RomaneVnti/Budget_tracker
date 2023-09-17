import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/HeaderDashboard.css';
import BudgetForm from './BudgetForm'; // Importez BudgetForm

export default function MainDasboardTitle() {
  const { user } = useAuth();
  const [totalMonthlyBudget, setTotalMonthlyBudget] = useState(null);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(null);
  const [remainingBudget, setRemainingBudget] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (user) {
      const userId = user.id;

      axios
        .get(`http://localhost:8000/budget/totalMonthlyBudget/${userId}`)
        .then((response) => {
          setTotalMonthlyBudget(response.data.totalMonthlyBudget);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du total du budget mensuel:', error);
        });

      axios
        .get(`http://localhost:8000/transaction/totalExpenseAmount/${userId}`)
        .then((response) => {
          setTotalExpenseAmount(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du total des dépenses réelles:', error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (totalMonthlyBudget !== null && totalExpenseAmount !== null) {
      const remaining = totalMonthlyBudget - totalExpenseAmount;
      setRemainingBudget(remaining);
    }
  }, [totalMonthlyBudget, totalExpenseAmount]);

  const updateTotalMonthlyBudget = (newBudgetAmount) => {
    // Mettez à jour le montant total du budget ici
    setTotalMonthlyBudget(newBudgetAmount);
  };

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
        {/* Intégration du formulaire de création de budget */}
        <BudgetForm updateTotalMonthlyBudget={updateTotalMonthlyBudget} />
      </div>
    </main>
  );
}
