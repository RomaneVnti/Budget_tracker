import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
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
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null); // Ajout de l'état pour stocker l'ID de la transaction sélectionnée

  // Gestionnaire d'ouverture de la pop-up
  const handleOpenUpdateForm = (transactionId) => {
    setSelectedTransactionId(transactionId);
    setIsCreateFormOpen(true);
  };

  // Gestionnaire de fermeture de la pop-up
  const handleCloseUpdateForm = () => {
    setSelectedTransactionId(null);
    setIsCreateFormOpen(false);
  };

  const navigateMonth = (direction) => {
    if (direction === 'previous') {
      setCurrentMonthIndex((prevIndex) => (prevIndex - 1 + 12) % 12);
    } else if (direction === 'next') {
      setCurrentMonthIndex((prevIndex) => (prevIndex + 1) % 12);
    }
  };

  useEffect(() => {
    if (user) {
      const userId = user.id;

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentMonthIndex + 1;
      axios.get(`http://localhost:8000/transaction/history/${userId}?year=${year}&month=${month}&type=dépense`)
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
                  <button onClick={() => handleOpenUpdateForm(filteredTransaction.id_transaction)}>
                    <AiOutlineEdit />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pop-up de mise à jour de la transaction */}
      {isCreateFormOpen && selectedTransactionId !== null && (
        <div className="popup">
          <TransactionsUpdateForm
            transactionId={selectedTransactionId}
            onClose={handleCloseUpdateForm}
          />
        </div>
      )}
    </main>
  );
}
