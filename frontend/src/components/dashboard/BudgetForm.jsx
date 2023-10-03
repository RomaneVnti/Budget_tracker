import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { IoMdClose } from 'react-icons/io';
import {FaEuroSign} from 'react-icons/fa';
import '../../style/dashboard/BudgetForm.css';
import Select, { components } from "react-select";

export default function BudgetForm(props) {
  const { user } = useAuth();

  const currentDate = new Date(); // Obtenez la date actuelle
  const currentMonth = currentDate.getMonth() + 1; // Obtenez le mois actuel en ajoutant 1
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 0);
  
  const initialStartDate = new Date().toISOString().slice(0, 10);
  const initialEndDate = lastDayOfMonth.toISOString().slice(0, 10); // Définissez initialEndDate ici

  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetPeriodStart, setBudgetPeriodStart] = useState(initialStartDate);
  const [budgetPeriodEnd, setBudgetPeriodEnd] = useState(initialEndDate);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [message, setMessage] = useState(''); // Ajout du message
  const [messageClass, setMessageClass] = useState(''); // Ajout de la classe CSS



  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgetData = {
      budget_amount: parseFloat(budgetAmount),
      budget_period_start: `${currentDate.getFullYear()}-${(currentMonth).toString().padStart(2, '0')}-01`, 
      budget_period_end: `${currentDate.getFullYear()}-${(currentMonth).toString().padStart(2, '0')}-${lastDayOfMonth.getDate()}`, // Utilisez le dernier jour du mois précédent
      category_id: selectedCategory ? selectedCategory.value : null,
      user_id: user ? user.id : '',
    };

    try {
      const response = await axios.post('http://localhost:8000/budget/createOrUpdateBudget', budgetData);

      if (response.status === 201 || response.status === 200) {
        console.log('Budget créé avec succès');
        setMessage('Budget créé avec succès'); // Mettez à jour le message en cas de succès
        setMessageClass('success');

        axios
          .get(`http://localhost:8000/budget/totalMonthlyBudget/${user.id}`)
          .then((response) => {
            props.updateTotalMonthlyBudget(response.data.totalMonthlyBudget);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération du total du budget mensuel:', error);
          });

        setBudgetAmount('');
        setSelectedCategory(null);
      } else {
        console.error('Erreur lors de la création du budget');
        setMessage('Erreur lors de la création du budget'); // Mettez à jour le message en cas d'erreur
        setMessageClass('error'); 
      }
    } catch (error) {
      console.error('Erreur lors de la création du budget :', error);
      setMessage('Erreur lors de la création/mise à jour du budget'); // Mettez à jour le message en cas d'erreur
      setMessageClass('error'); 
    }
  };

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

  const handleFormClose = () => {
    setIsFormVisible(false);
    props.onFormClose();
  };

  return (
    <div className="budgetForm">
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div className="iconCloseBudget" onClick={handleFormClose}>
            <IoMdClose />
          </div>
          <div className="form-group">
            <h2>Créer un nouveau budget</h2>
            
            <label htmlFor="budgetAmount">Montant du budget</label>
            <div className="inputLogo">
            <input
              type="number"
              id="budgetAmount"
              name="budgetAmount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              required
            />
            <div className="Logoprice">
                <FaEuroSign/>
            </div>
            </div>
            
          </div>
          <input type="hidden" name="budgetPeriodStart" value={budgetPeriodStart} />
          <input type="hidden" name="budgetPeriodEnd" value={budgetPeriodEnd} />
          <div className="form-group">
          <label htmlFor="categoryId">Catégorie</label>
          <Select
            id="categoryId"
            name="categoryId"
            value={selectedCategory}
            onChange={(selectedOption) => setSelectedCategory(selectedOption)}
            options={categories}
            required
            className="custom-select"
            placeholder="Choisissez une catégorie"
          />
        </div>
        <div className="buttonSubmit">
        <button className='buttonBudgetSubmit' type="submit">Créer le budget</button>
        <div className={`message ${messageClass}`}>{message}</div> {/* Affichez le message ici */}

        </div>
        </form>
      )}
    </div>
  );
}
