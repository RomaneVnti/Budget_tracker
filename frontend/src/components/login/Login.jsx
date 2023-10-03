import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import '../../style/login/Login.css';
import { IoMdClose } from 'react-icons/io';

export default function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useAuth(); // Utilisez le contexte d'authentification pour gérer l'utilisateur
  const navigate = useNavigate(); // Utilisez la fonction de navigation pour rediriger après la connexion

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      // Envoyez la requête de connexion avec l'email et le mot de passe
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });

      // Extrait les données de la réponse, y compris l'utilisateur et le token JWT
      const { user, token } = response.data;

      // Stockez le token JWT dans le sessionStorage pour l'authentification future
      sessionStorage.setItem('auth_token', token);

      // Configurez Axios pour inclure automatiquement l'en-tête d'autorisation dans les futures requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Mettez à jour l'état local de l'utilisateur avec les informations de l'utilisateur connecté
      setUser(user);

      // Naviguez vers le tableau de bord après la connexion réussie
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
    onClose(); // Fermez la fenêtre modale de connexion
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

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}
