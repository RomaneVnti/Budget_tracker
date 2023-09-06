import React from 'react';
import finance_tracker from '../../assets/finance_tracker.jpeg';
import '../../style/homePage/MainHomePage.css';
import { TbPigMoney } from 'react-icons/tb';
import {BsCalendar4Week} from 'react-icons/bs';
import {RiShoppingCartLine} from 'react-icons/ri';



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
                    <div className="button-blue">
                        <p className="get">Se connecter</p>
                    </div>
                </div>
                <div className="small-button-yellow">
                    <div className="button-yellow">
                        <p className="create-account">Créer un compte</p>
                    </div>
                </div>
            </div>
            <div className="container-logoBox">
                <TbPigMoney/>
                <BsCalendar4Week/>
                <RiShoppingCartLine/>
            </div>
            
      </div>
    </div>
  );
}
