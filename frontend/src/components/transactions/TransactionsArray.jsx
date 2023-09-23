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
  const [transactions, setTransactions] = useState([]);
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
    setTransactions((prevTransactions) => {
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

  const loadTransactions = (year, month) => {
    if (user) {
      const userId = user.id;
      axios
        .get(`http://localhost:8000/transaction/history/${userId}?year=${year}&month=${month}&type=dépense`)
        .then((response) => {
          setTransactions(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des transactions :', error);
          setError(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentMonthIndex + 1;
    loadTransactions(year, month);
  }, [user, currentMonthIndex]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  return (
    <main className="mainArrayTransaction">
      <h2>Dépenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>+/-</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .filter((transaction) => transaction.type_transaction === 'dépense')
            .map((filteredTransaction) => (
              <tr key={filteredTransaction.id_transaction}>
                <td>{formatDate(filteredTransaction.date)}</td>
                <td>{filteredTransaction.description}</td>
                <td>{filteredTransaction.category.categoryName}</td>
                <td className="text-red">-{filteredTransaction.transaction_amount}</td>
                <td>
                  <button onClick={() => handleOpenUpdateForm(filteredTransaction)}>
                    <AiOutlineEdit />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isUpdateModalOpen && selectedTransaction && (
        <div className="update-modal">
          <TransactionsUpdateForm
            transactionId={selectedTransaction.id_transaction}
            onClose={handleCloseUpdateForm}
            onUpdateSuccess={updateTransactionInArray}
            loadTransactions={loadTransactions}
            currentMonthIndex={currentMonthIndex}
          />
        </div>
      )}
    </main>
  );
}
