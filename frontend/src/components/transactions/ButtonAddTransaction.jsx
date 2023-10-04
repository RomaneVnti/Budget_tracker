import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateTransactionForm from './CreateTransactionForm'; // Importez le formulaire
import '../../style/transactions/ButtonAddTransaction.css';

function AddBudgetTransaction() {
  // État pour gérer l'affichage du formulaire
  const [showForm, setShowForm] = useState(false);

  // Fonction pour gérer le clic sur le bouton d'ajout de transaction
  const handleClick = () => {
    setShowForm(true); // Afficher le formulaire lors du clic
  };

  return (
    <div>
      {showForm ? (
        // Si showForm est vrai, affichez le formulaire de création de transaction
        <CreateTransactionForm onClose={() => setShowForm(false)} />
      ) : (
        // Si showForm est faux, affichez le bouton d'ajout de transaction
        <button className='buttonAddTransaction' onClick={handleClick}>
          <div className="iconPlus">
            <AiOutlinePlus />
          </div>
          <div className="texteButton">Ajouter une transaction</div>
        </button>
      )}
    </div>
  );
}

export default AddBudgetTransaction;
