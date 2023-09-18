import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/HeaderDashboard.css';
import BudgetForm from './BudgetForm'; // Importez le composant du formulaire
import { IoMdClose } from 'react-icons/io';
import AddBudgetButton from './AddBudgetButton'; // Importez le nouveau composant

// Définissez la fonction capitalizeFirstLetter dans le même fichier
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function MainDasboardTitle() {
  const { user } = useAuth();
  const [totalMonthlyBudget, setTotalMonthlyBudget] = useState(null);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(null);
  const [remainingBudget, setRemainingBudget] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Nouvelle variable d'état pour la fenêtre pop-up

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
    // Affichez la fenêtre pop-up
    setShowPopup(true);
  };

  const toggleFormVisibility = () => {
  setIsFormVisible(!isFormVisible); // Inverse la visibilité du formulaire
};

const handleBudgetFormClose = () => {
  setIsFormVisible(false); // Mettez à jour l'état ici pour fermer le formulaire
};


  const closePopup = () => {
    // Fermez la fenêtre pop-up en mettant showPopup à false
    setShowPopup(false);
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

        <div className='buttonCreateBudget'>
          <AddBudgetButton onClick={toggleFormVisibility} />
        </div>

        {isFormVisible && <BudgetForm updateTotalMonthlyBudget={updateTotalMonthlyBudget} onFormClose={handleBudgetFormClose}  />}
        
        {/* Affichez la fenêtre pop-up si showPopup est vrai */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Le budget a été créé avec succès !</p>
              <IoMdClose onClick={closePopup}/>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
