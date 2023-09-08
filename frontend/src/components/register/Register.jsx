import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../style/login/Login.css'; // Réutilisez le CSS du formulaire de connexion
import { IoMdClose } from 'react-icons/io'; // Importez IoMdClose depuis la bibliothèque d'icônes


export default function Register({ onClose }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users', {
        firstName: firstName,
        lastName: lastName,
        username: username,
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
    onClose(); // Appelez la fonction onClose pour fermer le formulaire de création de compte
  };


  return (
    <div>
      {/* Réutilisez la structure HTML du formulaire de connexion */}
      <form className="form" action="">
        <div className="icon-close" onClick={handleCloseRegister}>
          {/* Icône de fermeture */}
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
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pseudo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
            <p className="btnLogin">Register</p>
          </div>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}
