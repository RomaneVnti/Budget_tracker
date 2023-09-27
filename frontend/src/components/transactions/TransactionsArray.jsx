import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../style/transactions/TransactionsArray.css';
import { AiOutlineEdit } from 'react-icons/ai';
import TransactionsUpdateForm from './TransactionsUpdateForm';

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}

export default function TransactionArray() {
  const { user } = useAuth();
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleOpenUpdateForm = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateForm = () => {
    setSelectedTransaction(null);
    setIsUpdateModalOpen(false);
  };

  const updateTransactionInArray = (updatedTransaction) => {
    setExpenseTransactions((prevTransactions) => {
      const updatedIndex = prevTransactions.findIndex(
        (transaction) => transaction.id_transaction === updatedTransaction.id_transaction
      );

      if (updatedIndex !== -1) {
        const updatedTransactions = [...prevTransactions];
        updatedTransactions[updatedIndex] = updatedTransaction;
        return updatedTransactions;
      } else {
        return prevTransactions;
      }
    });
  };

  const deleteTransactionFromArray = (transactionId) => {
    setExpenseTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.filter(
        (transaction) => transaction.id_transaction !== transactionId
      );
      return updatedTransactions;
    });
  };

  const loadExpenseTransactions = (year, month) => {
    if (user) {
      const userId = user.id;
      axios
        .get(`http://localhost:8000/transaction/history/${userId}?year=${year}&month=${month}&type=dépense`)
        .then((response) => {
          const filteredTransactions = response.data.filter((transaction) => {
            // Filtrer uniquement les transactions de type "dépense"
            return transaction.type_transaction === 'dépense' && 
                   new Date(transaction.date).getFullYear() === year && 
                   new Date(transaction.date).getMonth() === month - 1;
          });
          setExpenseTransactions(filteredTransactions);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des transactions de dépenses :', error);
          setError(error);
          setLoading(false);
        });
    }
  };

  const loadIncomeTransactions = (year, month) => {
    if (user) {
      const userId = user.id;
      axios
        .get(`http://localhost:8000/transaction/history/${userId}?year=${year}&month=${month}&type=recette`)
        .then((response) => {
          const filteredTransactions = response.data.filter((transaction) => {
            // Filtrer uniquement les transactions de type "recette"
            return transaction.type_transaction === 'recette' && 
                   new Date(transaction.date).getFullYear() === year && 
                   new Date(transaction.date).getMonth() === month - 1;
          });
          setIncomeTransactions(filteredTransactions);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des transactions de recettes :', error);
          setError(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentMonthIndex + 1;
    loadExpenseTransactions(year, month);
    loadIncomeTransactions(year, month);
  }, [user, currentMonthIndex]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  return (
    <main className="mainArrayTransaction">
      <div className="expenseTableContainer">
        <h2>Dépenses</h2>
        <table className='expenseTable'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>+/-</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>
            {expenseTransactions.map((transaction) => (
              <tr key={transaction.id_transaction}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category.categoryName}</td>
                <td className="text-red">-{transaction.transaction_amount}</td>
                <td>
                  <button onClick={() => handleOpenUpdateForm(transaction)} className="icon-buttonUpdate">
                    <AiOutlineEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="incomeTableContainer">
        <h2>Recettes</h2>
        <table className='incomeTable'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>+/-</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>
            {incomeTransactions.map((transaction) => (
              <tr key={transaction.id_transaction}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category.categoryName}</td>
                <td className="text-green">+{transaction.transaction_amount}</td>
                <td>
                  <button onClick={() => handleOpenUpdateForm(transaction)} className="icon-buttonUpdate">
                    <AiOutlineEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

      {isUpdateModalOpen && selectedTransaction && (
        <div className="update-modal">
          <TransactionsUpdateForm
            transactionId={selectedTransaction.id_transaction}
            onClose={handleCloseUpdateForm}
            onUpdateSuccess={updateTransactionInArray}
            onDeleteSuccess={deleteTransactionFromArray}
            loadTransactions={loadExpenseTransactions}
            currentMonthIndex={currentMonthIndex}
          />
        </div>
      )}
    </main>
  );
}
