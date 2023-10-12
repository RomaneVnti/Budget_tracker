import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/HeaderDashboard.css';
import BudgetForm from './BudgetForm'; // Importez le composant du formulaire
import AddBudgetButton from './ButtonBudget';

// fonction capitalizeFirstLetter dans le même fichier
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function MainDasboardTitle() {
  const { user } = useAuth();
  const [totalMonthlyBudget, setTotalMonthlyBudget] = useState(null);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(null);
  const [remainingBudget, setRemainingBudget] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(''); // État pour stocker le mois en cours

  // Obtenez la date actuelle pour le mois en cours
  useEffect(() => {
    const currentDate = new Date();
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril',
      'Mai', 'Juin', 'Juillet', 'Août',
      'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    setCurrentMonth(`${monthNames[currentMonthIndex]} ${currentYear}`);
  }, []);

  // Récupérer les données du budget mensuel et des dépenses réelles
  useEffect(() => {
    if (user) {
      const userId = user.id;

      // Récupération du total du budget mensuel
      axios
        .get(`http://localhost:8000/budget/totalMonthlyBudget/${userId}`)
        .then((response) => {
          setTotalMonthlyBudget(response.data.totalMonthlyBudget);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du total du budget mensuel:', error);
        });

      // Récupération du total des dépenses réelles
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

  // Calculer le budget restant
  useEffect(() => {
    if (totalMonthlyBudget !== null && totalExpenseAmount !== null) {
      const remaining = totalMonthlyBudget - totalExpenseAmount;
      setRemainingBudget(remaining);
    }
  }, [totalMonthlyBudget, totalExpenseAmount]);

  // Fonction pour mettre à jour le montant total du budget
  const updateTotalMonthlyBudget = (newBudgetAmount) => {
    setTotalMonthlyBudget(newBudgetAmount);
  };

  // Fonction pour basculer la visibilité du formulaire de création de budget
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Fonction pour gérer la fermeture du formulaire de budget
  const handleBudgetFormClose = () => {
    setIsFormVisible(false);
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
            <div className='subtitle2'>{currentMonth}</div>
          </h1>
        </div>

        <div className="BoxDepense">
          <div className='BoxtitleDepensePrevisionnelle'>
            <div className="titleDepense">
              Dépenses prévisionnelles
            </div>
            <div className='totalMonthlyBudget'>
            {totalMonthlyBudget !== null ? totalMonthlyBudget.toFixed(2) : '0.00'}
            </div>
          </div>

          <div className='BoxtitleDepenseReelle'>
            <div className="titleDepense">
              Dépenses réelles
            </div>
            <div className='totalExpenseAmount'>
            {totalExpenseAmount !== null ? totalExpenseAmount.toFixed(2) : '0.00'}
            </div>
          </div>

          <div className='BudgetRestant'>
            <div className="titleDepense">
              Budget restant
            </div>
            <div className='remainingBudget'>
              {remainingBudget !== null ? remainingBudget.toFixed(2) : 'Calcul en cours...'}
            </div>
          </div>
        </div>

        <div className='buttonCreateBudget'>
          <AddBudgetButton onClick={toggleFormVisibility} />
        </div>

        {isFormVisible && <BudgetForm updateTotalMonthlyBudget={updateTotalMonthlyBudget} onFormClose={handleBudgetFormClose} />}
      </div>
    </main>
  );
}
