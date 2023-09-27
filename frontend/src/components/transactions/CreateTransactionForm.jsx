import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { IoMdClose } from 'react-icons/io';
import '../../style/transactions/CreateForm.css';

import { useAuth } from '../../context/AuthContext';

function CreateTransactionForm({ onClose }) {
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    transaction_amount: '',
    date: '',
    type_transaction: 'recette',
    description: '',
    category_id: '', // Utilisez formData.category_id pour stocker l'ID de la catégorie
    user_id: user ? user.id : ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/budget/getCategories');
        if (response.status === 200) {
          const categoriesData = response.data;
          const formattedCategories = categoriesData.map((category) => ({
            value: category.category_id,
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    // Mettez à jour formData.category_id avec la valeur sélectionnée
    setFormData({
      ...formData,
      category_id: selectedOption ? selectedOption.value : '',
    });
  };

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    if (!formData.description) {
      setFormErrors({ description: "Le champ Description est requis." });
      return;
    }

    setFormErrors({});

    formData.user_id = user ? user.id : '';

    console.log('Données de la transaction à envoyer :', formData);

    try {
      const response = await axios.post('http://localhost:8000/transaction/create', {
        ...formData,
      });

      if (response.status === 201 || response.status === 200) {
        console.log('Transaction créée avec succès !');
        onClose();


        setMessage('Transaction créée avec succès !');
        setMessageClass('success');
      } else {
        console.error('Erreur lors de la création de la transaction :', response.data);
        setMessage('Erreur lors de la création de la transaction.');
        setMessageClass('error');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la transaction :', error);
      setMessage('Erreur lors de la création de la transaction.');
      setMessageClass('error');
    }
  };

  return (
    <div className="create-transaction-form">
      <form onSubmit={handleCreateTransaction}>
        <div className="iconCloseBudget" onClick={onClose}>
          <IoMdClose />
        </div>
        <h2>Créer une nouvelle transaction</h2>
        <div className="form-group">
          <label>Montant de la transaction</label>
          <input
            type="number"
            name="transaction_amount"
            value={formData.transaction_amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type de transaction</label>
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
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={25}
          />
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <Select
            id="categoryId"
            name="categoryId"
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categories}
            required
            className="custom-select"
            placeholder="Choisissez une catégorie"
          />
        </div>
        <div className="containerButton">
          <button className="transactionCreate" type="submit">Créer une transaction</button>
        </div>
      </form>
      {formErrors.description && <p className="error-message">{formErrors.description}</p>}
      <div className={`message ${messageClass}`}>{message}</div>
    </div>
  );
}

export default CreateTransactionForm;
