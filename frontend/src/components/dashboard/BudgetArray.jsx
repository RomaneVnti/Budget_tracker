import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/BudgetArray.css';
import axios from 'axios';

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}

export default function BudgetArray() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  // Effectuez la requête pour obtenir toutes les transactions de l'utilisateur
  useEffect(() => {
    if (user) {
      const userId = user.id;

      // Faites une requête AJAX pour récupérer toutes les transactions depuis votre API
      // Remplacez cette URL par l'URL de votre API
      axios.get(`http://localhost:8000/transaction/history/${userId}`)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des transactions :', error);
        });
    }
  }, [user]);

  // Affichez uniquement les 5 dernières transactions
  const lastFiveTransactions = transactions.slice(0, 5);

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
              <td className={transaction.type_transaction === 'recette' ? 'text-green' : 'text-red'}>
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
