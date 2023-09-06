import React from 'react';
import finance_tracker from '../../assets/finance_tracker.jpeg';
import '../../style/homePage/MainHomePage.css';

export default function MainHomePage() {
  return (
    <div className='imgFinance_tracker'>
        <img src={finance_tracker} alt="Feuilles de budget" />
        <div className="text-overlay">
            <p className='texte_title'>
                <div className="text-container">
                    <span className="blue-text">Dominez vos finances</span>
                    <span className="yellow-text">dès</span>
                </div>
                <span className="title">aujourd'hui</span>
            </p>
            <p className='Subtitle'>
                <span className='subTitle'>Prenez le contrôle de votre avenir</span>
                <br/>
                <span className='subTitle'>Atteignez vos objectifs financiers en toute confiance</span>
            </p>
            <div className="container-button">
                <div className="small-button-blue">
                    <div className="button">
                        <p className="get">Se connecter</p>
                    </div>
                </div>


            </div>
            
      </div>
    </div>
  );
}
