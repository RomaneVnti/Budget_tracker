import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

function AddBudgetButton({ onClick }) {
  return (
    <button className='buttonAddBudget' onClick={onClick}>
      <div className="iconPlus">
        <AiOutlinePlus />
      </div>
      <div className="texteButton">Ajouter ou modifier une dépense prévisionnelle</div>
    </button>
  );
}

export default AddBudgetButton;
