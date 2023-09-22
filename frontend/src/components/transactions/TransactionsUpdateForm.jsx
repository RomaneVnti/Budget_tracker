import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

export default function TransactionsUpdateForm({ transactionId, onClose }) {
  const [formData, setFormData] = useState({
    transaction_amount: '',
    date: '',
    type_transaction: '',
    description: '',
    categoryName: '', // Remplacez category_id par categoryName
  });
  const [categories, setCategories] = useState([]); // État pour stocker les catégories
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger les données de la transaction à partir de l'API
    axios
      .get(`http://localhost:8000/transaction/${transactionId}`)
      .then((response) => {
        const transactionData = response.data;
        setFormData({
          transaction_amount: transactionData.transaction_amount.toString(),
          date: transactionData.date,
          type_transaction: transactionData.type_transaction,
          description: transactionData.description,
          categoryName: transactionData.categoryName, // Remplacez category_id par categoryName
        });
      })
      .catch((error) => {
        console.error('Erreur lors du chargement de la transaction :', error);
        setError(error);
      });

    // Récupérer les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/budget/getCategories');
        if (response.status === 200) {
          const categoriesData = response.data;
          const formattedCategories = categoriesData.map((category) => ({
            value: category.categoryName, // Remplacez category_id par categoryName
            label: category.categoryName,
          }));
          setCategories(formattedCategories);
        } else {
          console.error('Erreur lors du chargement des catégories');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    };

    fetchCategories();
  }, [transactionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données mises à jour de la transaction à l'API
    axios
      .put(`http://localhost:8000/transaction/${transactionId}`, formData)
      .then((response) => {
        // Gérer la réussite de la mise à jour (par exemple, afficher un message de succès)
        console.log('Transaction mise à jour avec succès !');
        onClose(); // Fermer la pop-up de mise à jour après la réussite
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la transaction :', error);
        setError(error);
      });
  };

  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  return (
    <div className="update-transaction-form">
      <h2>Mettre à jour la transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Montant de la transaction :</label>
          <input
            type="number"
            name="transaction_amount"
            value={formData.transaction_amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date :</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type de transaction :</label>
          <select
            name="type_transaction"
            value={formData.type_transaction}
            onChange={handleChange}
            required
          >
            <option value="recette">Recette</option>
            <option value="dépense">Dépense</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description :</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Catégorie :</label>
          <Select
            name="categoryName" // Remplacez category_id par categoryName
            value={categories.find((category) => category.value === formData.categoryName)}
            onChange={(selectedOption) => setFormData({ ...formData, categoryName: selectedOption.value })} // Remplacez category_id par categoryName
            options={categories}
            required
            placeholder="Sélectionnez une catégorie"
          />
        </div>
        <button type="submit">Mettre à jour</button>
        <button type="button" onClick={onClose}>
          Annuler
        </button>
      </form>
    </div>
 

  );
}
