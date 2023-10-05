import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function BudgetArray() {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchBudgets = async () => {
      try {
        const userId = user.id;
        const response = await axios.get(`http://localhost:8000/budget/allBudgets/${userId}`);
        setBudgets(response.data);
        console.log('Budgets récupérés avec succès :', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des budgets :', error);
      }
    };

    fetchBudgets();
  }, [user]);

  return (
    <main className="mainArray">
      <h2>Vos budgets</h2>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.budget_id}>
              <td>{budget.category.categoryName}</td>
              <td>{budget.budget_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
