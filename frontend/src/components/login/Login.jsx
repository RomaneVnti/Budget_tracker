import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom'; // Utilisez useNavigate au lieu de useHistory
import '../../style/login/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Fonction handleLogin appelée'); // Ajoutez cette ligne

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });

      console.log('Réponse du backend :', response.data); // Ajoutez cette ligne

      setUser(response.data.user);
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

