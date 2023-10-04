import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import Select from 'react-select'; 
import '../../style/transactions/UpdateForm.css'; 
import { IoMdClose } from 'react-icons/io'; 

import { useAuth } from '../../context/AuthContext'; 

export default function TransactionsUpdateForm({
  transactionId, // Propriété pour l'ID de la transaction
  onClose, // Propriété pour la fonction de fermeture de la fenêtre modale
  onUpdateSuccess, // Propriété pour la fonction de succès de mise à jour
  onDeleteSuccess, // Propriété pour la fonction de succès de suppression
  loadTransactions, // Propriété pour la fonction de chargement des transactions
  currentMonthIndex, // Propriété pour l'index du mois actuel
}) {
  const { user } = useAuth(); // Utilisation du hook useAuth pour obtenir l'utilisateur connecté

  // État pour stocker les données du formulaire, les erreurs et les messages
  const [formData, setFormData] = useState({
    transaction_amount: '', 
    date: '', 
    type_transaction: '', 
    description: '', 
    category_id: '', 
    user_id: user ? user.id : '',
  });

  const [categories, setCategories] = useState([]); // État pour stocker les catégories
  const [error, setError] = useState(null); // État pour stocker les erreurs
  const [formErrors, setFormErrors] = useState({}); // État pour stocker les erreurs du formulaire
  const [message, setMessage] = useState(''); // État pour stocker les messages de succès ou d'erreur
  const [messageClass, setMessageClass] = useState(''); // État pour stocker la classe CSS du message
  const [selectedCategory, setSelectedCategory] = useState(null); // État pour stocker la catégorie sélectionnée

  // Effet qui se déclenche au chargement initial et récupère les données de la transaction et les catégories
  useEffect(() => {
    axios
      .get(`http://localhost:8000/transaction/${transactionId}`)
      .then((response) => {
        const transactionData = response.data;
        setFormData({
          transaction_amount: transactionData.transaction_amount.toString(),
          date: transactionData.date,
          type_transaction: transactionData.type_transaction,
          description: transactionData.description,
          category_id: transactionData.category_id,
        });
      })
      .catch((error) => {
        console.error('Erreur lors du chargement de la transaction :', error);
        setError(error);
      });

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
          //console.error('Erreur lors du chargement des catégories');
        }
      } catch (error) {
        //console.error('Erreur lors du chargement des catégories :', error);
      }
    };

    fetchCategories();
  }, [transactionId]);

  // Gestionnaire de changement pour les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gestionnaire de changement pour la sélection de catégorie
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setFormData({
      ...formData,
      category_id: selectedOption ? selectedOption.value : '',
    });
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description) {
      setFormErrors({ description: "Le champ Description est requis." });
      return;
    }

    setFormErrors({});//Si la description n'est pas vide, cette ligne réinitialise l'objet d'erreurs formErrors à vide, ce qui supprime tout message d'erreur précédemment affiché

    formData.user_id = user ? user.id : '';//Cette ligne met à jour la propriété user_id de l'objet formData avec l'ID de l'utilisateur connecté

    axios
      .put(`http://localhost:8000/transaction/${transactionId}`, formData)
      .then((response) => {
        console.log('Transaction mise à jour avec succès !');
        onUpdateSuccess(response.data);
        onClose();

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentMonthIndex + 1;
        loadTransactions(year, month);

        setMessage('Transaction mise à jour avec succès !');
        setMessageClass('success');
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la transaction :', error);
        setError(error);

        setMessage('Erreur lors de la mise à jour de la transaction.');
        setMessageClass('error');
      });
  };

  // Gestionnaire de suppression de la transaction
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette transaction définitivement ?")) {
      axios
        .delete(`http://localhost:8000/transaction/${transactionId}`)
        .then(() => {
          console.log('Transaction supprimée avec succès !');
          onDeleteSuccess(transactionId);
          onClose();
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de la transaction :', error);
        });
    }
  };

  // Si une erreur est présente, afficher un message d'erreur
  if (error) {
    return <div>Une erreur s'est produite : {error.message}</div>;
  }

  // Rendu du formulaire et des messages de succès ou d'erreur
  return (
    <div className="update-transaction-form">
      <form onSubmit={handleSubmit}>
        <div className="iconCloseBudget" onClick={onClose}>
          <IoMdClose />
        </div>
        <h2>Modifier ou supprimer la transaction</h2>
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
          <button className="transactionUpdate" type="submit">Mettre à jour</button>
          <button className="transactionDelete" type="button" onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      </form>
      {formErrors.description && <p className="error-message">{formErrors.description}</p>}
      <div className={`message ${messageClass}`}>{message}</div>
    </div>
  );
}
