import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function MainDasboardTitle() {
  const { user } = useAuth();

  // Fonction pour mettre en majuscule la première lettre d'une chaîne
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <main className='main'>
        <div>
            <div className="titleFirstName">
            {user && `Bonjour, ${capitalizeFirstLetter(user.firstName)}!`}
            </div>

            <div className="Title">
                <h1>
                    <div>Tableau de bord</div>
                    <div className='subtitle2'>Septembre 2023</div>
                </h1>
                
            </div>

            <div className="BoxDepense">
                <div className='BoxtitleDepensePrevisionnelle'>
                    <div className="titleDepense">
                        Dépenses prévisionnelles
                    </div>
                    <div>

                    </div>
                </div>

                <div className='BoxtitleDepenseReelle'>
                    <div className="titleDepense">
                        Dépenses réelles
                    </div>
                    <div>
                        
                    </div>
                </div>

                <div className='BudgetRestant'>
                    <div className="titleDepense">
                        Budget restant
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
