import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate au lieu de useHistory
import '../../style/login/Login.css';
import {IoMdClose} from 'react-icons/io';

export default function Login({onClose}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });

      console.log('Réponse du backend :', response.data); // Ajoutez cette ligne

      setUser(response.data.user);

      const token = response.data.token; // Extrait le token de la réponse
      localStorage.setItem('auth_token', token); // Stocke le token localement
      navigate('/dashboard');

    } catch (error) {
      console.error('Erreur lors de la tentative de connexion :', error); // Ajoutez cette ligne
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de la tentative de connexion.');
      }
    }
  };

  const handleClose = () => {
    onClose(); // Appelez la fonction onClose pour fermer le formulaire
  };

  return (
    <div>
      
      <form className="form" action="">
        <div className="icon-close" onClick={handleClose}>
        <IoMdClose/>
        </div>
        <h3>Connectez-vous</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className="small-button-blue" onClick={handleLogin}>
              {/* Utilisez la fonction toggleLoginForm pour ouvrir le formulaire */}
              <div className="button-login">
                <p className="btnLogin">Login</p>
              </div>
        </div>
  
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

