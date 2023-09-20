import React, { useState } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import '../../style/transactions/MainTransaction.css';

export default function MainTransactions() {
  // Tableau de noms de mois (janvier est à l'indice 0)
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const currentDate = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(currentDate.getMonth());

  const navigateMonth = (direction) => {
    if (direction === 'previous') {
      setCurrentMonthIndex((prevIndex) => prevIndex - 1);
    } else if (direction === 'next') {
      setCurrentMonthIndex((prevIndex) => prevIndex + 1);
    }
  };

  const currentMonth = months[currentMonthIndex];

  return (
    <div>
      <div className="month-navigation">
        <div className="iconPreious">
            <GrFormPrevious onClick={() => navigateMonth('previous')} />
        </div>
        <h1>{currentMonth} {currentDate.getFullYear()}</h1>
        <div className="iconNext">
            <GrFormNext onClick={() => navigateMonth('next')} />
        </div>
      </div>
      {/* Ajoutez le reste de votre contenu ici */}
    </div>
  );
}
