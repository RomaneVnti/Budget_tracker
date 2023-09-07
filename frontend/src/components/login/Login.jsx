import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate au lieu de useHistory
import '../../style/login/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useAuth(); // Obtenez la fonction setUser depuis le contexte
  const navigate = useNavigate(); // Utilisez useNavigate au lieu de useHistory

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });

      console.log('Réponse du backend :', response.data);

      setUser(response.data.user); // Stocker les informations d'utilisateur dans le contexte
      navigate('/home'); // Utilisez la méthode navigate pour rediriger vers la page d'accueil

    } catch (error) {
      console.error('Erreur lors de la tentative de connexion :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de la tentative de connexion.');
      }
    }
  };

  return (
    <div>
      <form className="form" action="">
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
        <button onClick={handleLogin}>Login</button>
  
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
  
}
