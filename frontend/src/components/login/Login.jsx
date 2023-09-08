import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../style/login/Login.css';
import { IoMdClose } from 'react-icons/io';
import ForgotPassword from './ForgotPassword'; // Importez le composant ForgotPassword

export default function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser, toggleForgotPasswordForm, isForgotPasswordFormVisible } = useAuth(); // Ajoutez isForgotPasswordFormVisible et toggleForgotPasswordForm
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });

      console.log('Réponse du backend :', response.data);

      setUser(response.data.user);
      navigate('/dashboard');

    } catch (error) {
      console.error('Erreur lors de la tentative de connexion :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de la tentative de connexion.');
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toggleForgotPasswordForm(); // Affichez la boîte de dialogue "Mot de passe oublié"
  };

  return (
    <div>
      <form className="form" action="">
        <div className="icon-close" onClick={handleClose}>
          <IoMdClose />
        </div>
        <h3>Connectez-vous</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="small-button-blue" onClick={handleLogin}>
          <div className="button-login">
            <p className="btnLogin">Login</p>
          </div>
        </div>
        <div className="forgot-password">
          <a href="#" onClick={handleForgotPassword}>
            Mot de passe oublié ?
          </a>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>

      {/* Affichez le formulaire "Mot de passe oublié" si isForgotPasswordFormVisible est vrai */}
      {isForgotPasswordFormVisible && (
        <div className={`forgot-password-container ${isForgotPasswordFormVisible ? 'visible' : ''}`}>
          <ForgotPassword onClose={handleClose} />
        </div>
      )}
    </div>
  );
}
