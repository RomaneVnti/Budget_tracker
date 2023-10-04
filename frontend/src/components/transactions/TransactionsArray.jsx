import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../style/transactions/TransactionsArray.css';
import { AiOutlineEdit } from 'react-icons/ai';
import TransactionsUpdateForm from './TransactionsUpdateForm';

// Fonction utilitaire pour formater la date au format 'jj/mm'
function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}

// Composant principal de la liste des transactions
export default function TransactionArray() {
  const { user } = useAuth(); // Récupération de l'utilisateur actuellement authentifié
  const [expenseTransactions, setExpenseTransactions] = useState([]); 
  const [incomeTransactions, setIncomeTransactions] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); 
  const [selectedTransaction, setSelectedTransaction] = useState(null); 

  // Fonction pour ouvrir le formulaire de mise à jour de la transaction
  const handleOpenUpdateForm = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUpdateModalOpen(true);
  };

  // Fonction pour fermer le formulaire de mise à jour de la transaction
  const handleCloseUpdateForm = () => {
    setSelectedTransaction(null);
    setIsUpdateModalOpen(false);
  };

  // Fonction pour mettre à jour une transaction dans la liste des dépenses
const updateTransactionInArray = (updatedTransaction) => {
  setExpenseTransactions((prevTransactions) => {
    // Utilisation de la fonction `setExpenseTransactions` pour mettre à jour l'état des transactions de dépenses
    const updatedIndex = prevTransactions.findIndex(
      // Recherche de l'index de la transaction à mettre à jour dans le tableau précédent
      (transaction) => transaction.id_transaction === updatedTransaction.id_transaction
    );

    if (updatedIndex !== -1) {
      // Vérification si l'index de la transaction à mettre à jour a été trouvé (non égal à -1)
      const updatedTransactions = [...prevTransactions]; // Création d'une copie du tableau des transactions précédentes
      updatedTransactions[updatedIndex] = updatedTransaction; // Remplacement de la transaction à l'index trouvé par la nouvelle transaction mise à jour
      return updatedTransactions; // Retour du nouveau tableau mis à jour
    } else {
      // Si l'index n'a pas été trouvé, retourner simplement le tableau précédent sans modification
      return prevTransactions;
    }
  });
};


 // Fonction pour supprimer une transaction de la liste des dépenses
const deleteTransactionFromArray = (transactionId) => {
  setExpenseTransactions((prevTransactions) => {
    // Utilisation de la fonction `setExpenseTransactions` pour mettre à jour l'état des transactions de dépenses
    const updatedTransactions = prevTransactions.filter(
      // Utilisation de la méthode `filter` pour créer un nouveau tableau en filtrant les transactions
      (transaction) => transaction.id_transaction !== transactionId
      // La condition de filtrage vérifie si l'ID de la transaction n'est pas égal à l'ID de la transaction à supprimer
    );
    return updatedTransactions; // Retour du nouveau tableau après suppression de la transaction
  });
};


  // Fonction pour charger les transactions de dépenses depuis l'API
  const loadExpenseTransactions = (year, month) => {
    if (user) {
      const userId = user.id;
      axios
        .get(`http://localhost:8000/transaction/history/${userId}?year=${year}&month=${month}&type=dépense`)
        .then((response) => {
          const filteredTransactions = response.data.filter((transaction) => {
            // Filtrer uniquement les transactions de type "dépense" pour le mois et l'année donnés
            return transaction.type_transaction === 'dépense' && 
                   new Date(transaction.date).getFullYear() === year && 
                   new Date(transaction.date).getMonth() === month - 1;
          });
          setExpenseTransactions(filteredTransactions); // Mettre à jour les transactions de dépenses
          setLoading(false); // Indiquer que le chargement est terminé
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des transactions de dépenses :', error);
          setError(error); 
          setLoading(false);
        });
    }
  };

  // Fonction pour charger les transactions de recettes depuis l'API
  const loadIncomeTransactions = (year, month) => {
    if (user) {
      const userId = user.id;
      axios
        .get(`http://localhost:8000/transaction/history/${userId}?year=${year}&month=${month}&type=recette`)
        .then((response) => {
          const filteredTransactions = response.data.filter((transaction) => {
            // Filtrer uniquement les transactions de type "recette" pour le mois et l'année donnés
            return transaction.type_transaction === 'recette' && 
                   new Date(transaction.date).getFullYear() === year && 
                   new Date(transaction.date).getMonth() === month - 1;
          });
          setIncomeTransactions(filteredTransactions); // Mettre à jour les transactions de recettes
          setLoading(false); 
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des transactions de recettes :', error);
          setError(error); 
          setLoading(false);
        });
    }
  };

  // Utilisation de useEffect pour charger les transactions au chargement du composant
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentMonthIndex + 1;
    loadExpenseTransactions(year, month);
    loadIncomeTransactions(year, month);
  }, [user, currentMonthIndex]);

  // Si les données sont en cours de chargement, afficher un message de chargement
  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  // Si une erreur s'est produite, afficher un message d'erreur
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
