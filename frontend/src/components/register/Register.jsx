import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Utilisez useNavigate au lieu de useHistory
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

      setUser(response.data.user); // Stocker les informations d'utilisateur dans le contexte
      navigate('/home'); // Utilisez navigate pour rediriger vers la page d'accueil après l'inscription

    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription.');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
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
      <button onClick={handleRegister}>Register</button>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
