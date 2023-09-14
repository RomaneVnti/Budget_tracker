import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';


export default function BudgetForm() {
    const { user, setUser } = useAuth();

    const [budgetAmount, setBudgetAmount] = useState('');
    const [budgetPeriodStart, setBudgetPeriodStart] = useState('');
    const [budgetPeriodEnd, setBudgetPeriodEnd] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/budget/getCategories');
                console.log('Response from fetchCategories:', response);
                if (response.status === 200) {
                    const data = response.data;
                    console.log('Categories data:', data);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const budgetData = {
            budget_amount: parseFloat(budgetAmount),
            budget_period_start: budgetPeriodStart,
            budget_period_end: budgetPeriodEnd,
            category_id: parseInt(categoryId),
            user_id: user ? user.id : '', // Utilisation de l'ID de l'utilisateur connecté s'il est disponible
        };

        try {
            // Envoyez les données du formulaire au serveur pour créer le budget en utilisant Axios
            const response = await axios.post('http://localhost:8000/budget/createOneBudget', budgetData);
            console.log('Response from createOneBudget:', response); // Log de la réponse du serveur

            if (response.status === 201) {
                // Budget créé avec succès
                console.log('Budget créé avec succès');
                // Réinitialisez les champs du formulaire si nécessaire
                setBudgetAmount('');
                setBudgetPeriodStart('');
                setBudgetPeriodEnd('');
                setCategoryId('');
            } else {
                console.error('Erreur lors de la création du budget');
            }
        } catch (error) {
            console.error('Erreur lors de la création du budget :', error);
        }
    };
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
        <div className="form-group">
          <label htmlFor="budgetPeriodStart">Début de la période</label>
          <input
            type="date"
            id="budgetPeriodStart"
            name="budgetPeriodStart"
            value={budgetPeriodStart}
            onChange={(e) => setBudgetPeriodStart(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="budgetPeriodEnd">Fin de la période</label>
          <input
            type="date"
            id="budgetPeriodEnd"
            name="budgetPeriodEnd"
            value={budgetPeriodEnd}
            onChange={(e) => setBudgetPeriodEnd(e.target.value)}
            required
          />
        </div>
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
