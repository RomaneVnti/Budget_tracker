import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../style/login/Login.css';
import { IoMdClose } from 'react-icons/io';

export default function Register({ onClose }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const isEmailValid = (email) => {
    // Utilisez une expression régulière pour valider l'email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleRegister = async () => {
    if (!isEmailValid(email)) {
      setErrorMessage('Veuillez saisir une adresse email valide.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users', {
        firstName: firstName,
        email: email,
        password: password,
      });

      console.log('Réponse du backend :', response.data);

      setUser(response.data.user);
      navigate('/dashboard');

    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription.');
      }
    }
  };

  const handleCloseRegister = () => {
    onClose();
  };

  return (
    <div>
      <form className="form" action="">
        <div className="icon-close" onClick={handleCloseRegister}>
          <IoMdClose />
        </div>
        <h3>Créer un compte</h3>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="small-button-blue" onClick={handleRegister}>
          <div className="button-login">
            <p className="btnLogin">Valider</p>
          </div>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}
