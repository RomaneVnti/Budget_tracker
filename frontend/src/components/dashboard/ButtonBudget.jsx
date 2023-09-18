import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

function AddBudgetButton({ onClick, user }) {
  return (
    <button className='buttonAddBudget' onClick={onClick}>
      <div className="iconPlus">
        <AiOutlinePlus />
      </div>
      <div className="texteButton">Ajouter ou modifier un budget</div>
      {/* Utilisez la propriété user ici si nécessaire */}
    </button>
  );
}

export default AddBudgetButton;