import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendResetLink = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/forgot-password', {
        email: email,
      });

      console.log('Réponse du backend :', response.data);

      setSuccessMessage(response.data.message);

    } catch (error) {
      console.error('Erreur lors de la récupération du mot de passe :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de la récupération du mot de passe.');
      }
    }
  };

  const handleClose = () => {
    onClose(); // Fermez la boîte de dialogue "Mot de passe oublié"
  };

  return (
    <div>
      <form className="form" action="">
        <h3>Mot de passe oublié</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="small-button-blue" onClick={handleSendResetLink}>
          <div className="button-login">
            <p className="btnLogin">Envoyer le lien de réinitialisation</p>
          </div>
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}
