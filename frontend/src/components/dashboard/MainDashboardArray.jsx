import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/MainDashboardArray.css';
import { AiOutlinePlus } from 'react-icons/ai';
import BudgetForm from './BudgetForm'; // Importez le composant du formulaire

export default function MainDashboardArray() {
  const { user } = useAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <main className="mainArray">
      <div>MainDashboardArray</div>
      <div className="buttonCreateDepense">
        <button onClick={toggleFormVisibility}>
          <div className="iconPlus">
            <AiOutlinePlus />
          </div>
          <div className="texteButton">Ajouter un budget</div>
        </button>
      </div>

      {isFormVisible && <BudgetForm /> /* Affichez le formulaire si isFormVisible est vrai */}
    </main>
  );
}
