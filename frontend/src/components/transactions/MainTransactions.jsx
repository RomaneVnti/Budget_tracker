import React, { useState } from 'react'; 
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import '../../style/transactions/MainTransaction.css'; 
import TransactionArray from './TransactionsArray'; 

export default function MainTransactions() { 
  const months = [ // Création d'un tableau contenant les noms des mois
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const currentDate = new Date(); // Obtention de la date actuelle
  const [currentMonthIndex, setCurrentMonthIndex] = useState(currentDate.getMonth()); // Création d'un état pour stocker l'index du mois actuel, initialisé avec le mois actuel

  const navigateMonth = (direction) => { // Définition de la fonction navigateMonth pour changer de mois
    setCurrentMonthIndex((prevIndex) => ( // Utilisation de la fonction setCurrentMonthIndex pour mettre à jour l'index du mois actuel
      direction === 'previous' ? (prevIndex - 1 + 12) % 12 : (prevIndex + 1) % 12 // Utilisation d'un opérateur ternaire pour déterminer la nouvelle valeur de l'index en fonction de la direction
    ));
  };

  const currentMonth = months[currentMonthIndex]; // Obtention du nom du mois actuel en utilisant l'index

  return (
    <div>
      <div className="month-navigation">
        <GrFormPrevious onClick={() => navigateMonth('previous')} /> 
        <h1>{currentMonth} {currentDate.getFullYear()}</h1>
        <GrFormNext onClick={() => navigateMonth('next')} /> 
      </div>
      <TransactionArray monthIndex={currentMonthIndex} /> 
    </div>
  );
}
