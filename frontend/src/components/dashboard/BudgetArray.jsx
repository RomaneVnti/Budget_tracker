import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import '../../style/dashboard/BudgetArray.css'; 
import axios from 'axios'; 

// Fonction pour formater une date au format "JJ/MM/AAAA"
function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}

// Fonction pour obtenir l'année et le mois actuels
function getCurrentMonthYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Les mois vont de 0 à 11, ajoutez 1.
  return { year: currentYear, month: currentMonth };
}

// Composant principal BudgetArray
export default function BudgetArray() {
  const { user } = useAuth(); // Utilisation du hook useAuth pour obtenir l'utilisateur connecté
  const [transactions, setTransactions] = useState([]); // État local pour stocker les transactions
  const { year, month } = getCurrentMonthYear(); // Obtention de l'année et du mois actuels

  // Utilisation du hook useEffect pour effectuer des effets de bord lorsque le composant est monté ou que l'utilisateur change
  useEffect(() => {
    if (!user) {
      return; // Sortie précoce si l'utilisateur n'est pas connecté
    }

    // Fonction asynchrone pour récupérer les transactions de l'utilisateur
    const fetchTransactions = async () => {
      try {
        const userId = user.id; // Obtention de l'ID de l'utilisateur
        // Requête HTTP GET pour récupérer les transactions de l'utilisateur
        const response = await axios.get(`http://localhost:8000/transaction/history/${userId}`);
        setTransactions(response.data); // Mise à jour de l'état avec les transactions obtenues
      } catch (error) {
        //console.error('Erreur lors de la récupération des transactions :', error); 
      }
    };

    fetchTransactions(); // Appel de la fonction pour récupérer les transactions
  }, [user]); // Déclenchement de l'effet lorsque l'utilisateur change

  // Filtrage des transactions du mois en cours
  const currentMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionYear = transactionDate.getFullYear();
    const transactionMonth = transactionDate.getMonth() + 1;

    return transactionYear === year && transactionMonth === month;
  });

  // Sélection des cinq dernières transactions du mois en cours
  const lastFiveTransactions = currentMonthTransactions.slice(0, 5);

  // Rendu JSX du composant
  return (
    <main className="mainArray">
      <h2>Vos dernières transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>+/-</th>
          </tr>
        </thead>
        <tbody>
          {lastFiveTransactions.map((transaction) => (
            <tr key={transaction.id_transaction}>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category.categoryName}</td>
              <td className={`text-${transaction.type_transaction === 'recette' ? 'green' : 'red'}`}>
                {transaction.type_transaction === 'recette' ? '+' : '-'}
                {transaction.transaction_amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
