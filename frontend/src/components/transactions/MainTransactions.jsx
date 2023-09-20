import React, { useState } from 'react';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import '../../style/transactions/MainTransaction.css';
import TransactionArray from './TransactionsArray';

export default function MainTransactions() {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const currentDate = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(currentDate.getMonth());

  const navigateMonth = (direction) => {
    if (direction === 'previous') {
      setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
    } else if (direction === 'next') {
      setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12);
    }
  };

  const currentMonth = months[currentMonthIndex];

  return (
    <div>
      <div className="month-navigation">
        <div className="iconPrevious">
          <GrFormPrevious onClick={() => navigateMonth('previous')} />
        </div>
        <h1>{currentMonth} {currentDate.getFullYear()}</h1>
        <div className="iconNext">
          <GrFormNext onClick={() => navigateMonth('next')} />
        </div>
      </div>
      <TransactionArray monthIndex={currentMonthIndex} />
    </div>
  );
}
