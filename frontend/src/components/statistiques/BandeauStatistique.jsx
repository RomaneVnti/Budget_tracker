import React from 'react';
import '../../style/statistiques/BandeauStatistique.css';

export default function BandeauStatistique() {
  // Obtenir le mois en cours 
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  //Obtenir l'année en cours
  const currentYear = new Date().getFullYear();

  return (
    <div className="bandeau-statistique">
      <h2>Statistiques {currentMonth} {currentYear}</h2>
    </div>
  );
}
