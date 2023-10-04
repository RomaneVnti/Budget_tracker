import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Select from 'react-select'; 
import { IoMdClose } from 'react-icons/io'; 
import '../../style/transactions/CreateForm.css'; 
import { useAuth } from '../../context/AuthContext'; 

function CreateTransactionForm({ onClose }) {
  const { user } = useAuth(); // Récupère l'utilisateur authentifié à partir du contexte

  // États pour stocker les données du formulaire, les erreurs et les messages de succès/erreur
  const [categories, setCategories] = useState([]); // État pour stocker les catégories
  const [formErrors, setFormErrors] = useState({}); // État pour les erreurs du formulaire
  const [message, setMessage] = useState(''); // État pour le message
  const [messageClass, setMessageClass] = useState(''); // État pour la classe du message
  const [selectedCategory, setSelectedCategory] = useState(null); // État pour la catégorie sélectionnée

  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    transaction_amount: '', 
    date: '',
    type_transaction: 'recette', 
    description: '', 
    category_id: '', 
    user_id: user ? user.id : '', 
  });

  useEffect(() => {
    // Utilisez useEffect pour effectuer des opérations après le rendu initial

    const fetchCategories = async () => {
      try {
        // Effectue une requête GET pour récupérer les catégories depuis l'API
        const response = await axios.get('http://localhost:8000/budget/getCategories');

        if (response.status === 200) {
          const categoriesData = response.data;

          // Formate les données des catégories pour les options Select
          const formattedCategories = categoriesData.map((category) => ({
            value: category.category_id,
            label: category.categoryName,
          }));

          // Met à jour l'état des catégories avec les options formatées
          setCategories(formattedCategories);
        } else {
          setFormErrors({ categories: "Erreur lors du chargement des catégories." });
        }
      } catch (error) {
        setFormErrors({ categories: "Erreur lors du chargement des catégories : " + error.message });
      }
    };

    fetchCategories(); // Appelez la fonction de chargement des catégories au chargement de la page
  }, []);

  const handleChange = (e) => {
    // Gérez les changements dans les champs de formulaire et mettez à jour l'état formData
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (selectedOption) => {
    // Gérez le changement de catégorie sélectionnée
    setSelectedCategory(selectedOption);

    // Met à jour l'état formData.category_id avec la valeur sélectionnée
    setFormData({
      ...formData,
      category_id: selectedOption ? selectedOption.value : '',
    });
  };

  const handleCreateTransaction = async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    if (!formData.description) {
      // Vérifie si la description est vide
      setFormErrors({ description: "Le champ Description est requis." });
      return; // Arrête la fonction si la description est manquante
    }

    setFormErrors({}); // Réinitialisez les erreurs du formulaire

    formData.user_id = user ? user.id : ''; // Définit l'ID de l'utilisateur dans les données du formulaire

    try {
      // Effectue une requête POST pour créer une nouvelle transaction avec les données du formulaire
      const response = await axios.post('http://localhost:8000/transaction/create', {
        ...formData,
      });

      if (response.status === 201 || response.status === 200) {
        //console.log('Transaction créée avec succès !');
        onClose(); // Ferme le formulaire après la création réussie

        setMessage('Transaction créée avec succès !'); 
        setMessageClass('success'); 

        // Réinitialisez le formulaire après la soumission réussie
        setFormData({
          transaction_amount: '',
          date: '',
          type_transaction: 'recette',
          description: '',
          category_id: '',
          user_id: user ? user.id : '',
        });
      } else {
        setMessage('Erreur lors de la création de la transaction.');
        setMessageClass('error');
      }
    } catch (error) {
      setMessage('Erreur lors de la création de la transaction : ' + error.message);
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
      {formErrors.categories && <p className="error-message">{formErrors.categories}</p>}
      <div className={`message ${messageClass}`}>{message}</div>
    </div>
  );
}

export default CreateTransactionForm;
