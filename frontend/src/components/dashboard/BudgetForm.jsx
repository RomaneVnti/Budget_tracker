import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function BudgetForm(props) {
  const { user } = useAuth();

  const initialStartDate = new Date().toISOString().slice(0, 10);
  const currentDate = new Date();
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const initialEndDate = lastDayOfMonth.toISOString().slice(0, 10);

  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetPeriodStart, setBudgetPeriodStart] = useState(initialStartDate);
  const [budgetPeriodEnd, setBudgetPeriodEnd] = useState(initialEndDate);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const budgetData = {
      budget_amount: parseFloat(budgetAmount),
      budget_period_start: budgetPeriodStart,
      budget_period_end: budgetPeriodEnd,
      category_id: parseInt(categoryId),
      user_id: user ? user.id : '',
    };
  
    try {
      const response = await axios.post('http://localhost:8000/budget/createOneBudget', budgetData);
  
      if (response.status === 200) {
        console.log('Budget créé avec succès');
  
        // Rappeler la route pour récupérer le totalMonthlyBudget ici
        axios
          .get(`http://localhost:8000/budget/totalMonthlyBudget/${user.id}`)
          .then((response) => {
            props.updateTotalMonthlyBudget(response.data.totalMonthlyBudget);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération du total du budget mensuel:', error);
          });
  
        // Réinitialisez les champs du formulaire si nécessaire
        setBudgetAmount('');
        setCategoryId('');
  
      } else {
        console.error('Erreur lors de la création du budget');
      }
    } catch (error) {
      console.error('Erreur lors de la création du budget :', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/budget/getCategories');
        if (response.status === 200) {
          const data = response.data;
          setCategories(data);
        } else {
          console.error('Erreur lors du chargement des catégories');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="budgetForm">
      <h2>Créer un nouveau budget</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budgetAmount">Montant du budget</label>
          <input
            type="number"
            id="budgetAmount"
            name="budgetAmount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            required
          />
        </div>
        {/* Champ de date de début invisible */}
        <input type="hidden" name="budgetPeriodStart" value={budgetPeriodStart} />
        {/* Champ de date de fin invisible */}
        <input type="hidden" name="budgetPeriodEnd" value={budgetPeriodEnd} />
        <div className="form-group">
          <label htmlFor="categoryId">Catégorie</label>
          <select
            id="categoryId"
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="" disabled>Choisissez une catégorie</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Créer le budget</button>
      </form>
    </div>
  );
}
