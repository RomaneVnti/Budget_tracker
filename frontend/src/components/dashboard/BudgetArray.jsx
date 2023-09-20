import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/MainDashboardArray.css';
import axios from 'axios';

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}
export default function BudgetArray() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  // Effectue une requête pour obtenir les 10 dernières transactions de l'utilisateur
  useEffect(() => {
    if (user) {
      const userId = user.id;

      // Faites une requête AJAX (par exemple avec axios) pour récupérer les transactions depuis votre API
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

  return (
    <main className="mainArray">
      <h2>Vos dernières transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
              <tr key={transaction.id_transaction}>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category.categoryName}</td>
              <td>{transaction.transaction_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
