import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateTransactionForm from './CreateTransactionForm'; // Importez le formulaire
import '../../style/transactions/ButtonAddTransaction.css';

function AddBudgetTransaction() {
  const [showForm, setShowForm] = useState(false); // État pour afficher/masquer le formulaire

  const handleClick = () => {
    setShowForm(true); // Afficher le formulaire lors du clic
  };

  return (
    <div>
      {showForm ? (
        // Affichez le formulaire s'il est visible
        <CreateTransactionForm onClose={() => setShowForm(false)} />
      ) : (
        // Affichez le bouton d'ajout s'il n'est pas visible
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
