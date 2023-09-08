import React, { useState } from 'react';
import '../../style/homePage/DropDownMenu.css';

export default function DropdownMenu({ isOpen}) {
    // Utilisez la valeur de isOpen pour décider si la liste doit être affichée ou non
    const dropdownClass = isOpen ? 'dropdown-menu active' : 'dropdown-menu';
  
    return (
      <ul className={dropdownClass}>
        <li><a href="/a-propos">À propos</a></li>
      </ul>
    );
  }
