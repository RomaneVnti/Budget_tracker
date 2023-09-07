import React from 'react';
import Login from '../login/Login';
import finance_tracker from '../../assets/finance_tracker.jpeg';
import '../../style/homePage/MainHomePage.css';
import { TbPigMoney } from 'react-icons/tb';
import { BsCalendar4Week } from 'react-icons/bs';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext'; // Importez useAuth

export default function MainHomePage() {
  const { isLoginFormVisible, toggleLoginForm } = useAuth(); // Utilisez useAuth pour accéder à isLoginFormVisible et toggleLoginForm

  return (
    <main>
      <div className='imgFinance_tracker'>
        <img src={finance_tracker} alt="Feuilles de budget" />
        <div className="text-overlay">
          <div className='texte_title'>
            <div className="text-container">
              <span className="blue-text">Dominez vos finances</span>
              <span className="yellow-text">dès</span>
            </div>
            <span className="title">aujourd'hui</span>
          </div>
          <div className='Subtitle'>
            <span className='subTitle'>Prenez le contrôle de votre avenir</span>
            <br />
            <span className='subTitle'>Atteignez vos objectifs financiers en toute confiance</span>
          </div>
          <div className="container-button">
            <div className="small-button-blue" onClick={toggleLoginForm}>
              {/* Utilisez la fonction toggleLoginForm pour ouvrir le formulaire */}
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
            <div className="container-piggyMoney">
              <div className="logo-money">
                <TbPigMoney />
              </div>
              <div className="box-text">
                <p className='box-paragraphe'>
                  Répartissez vos dépenses intelligemment
                </p>
              </div>
            </div>
            <div className="container-calendar">
              <div className="logo-calendar">
                <BsCalendar4Week />
              </div>
              <div className="box-text">
                <p className='box-paragraphe'>
                  Planifier vos dépenses
                </p>
              </div>
            </div>
            <div className="container-shopping">
              <div className="logo-shopping">
                <RiShoppingCartLine />
              </div>
              <div className="box-text">
                <p className='box-paragraphe'>
                  Classer les par catégories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affichez le formulaire de connexion s'il est visible */}
      {isLoginFormVisible && (
      <div className={`login-form-container ${isLoginFormVisible ? 'visible' : ''}`}>
        <Login />
      </div>
    )}
    </main>
  );
}
