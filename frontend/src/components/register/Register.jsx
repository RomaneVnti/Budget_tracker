import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 
import '../../style/login/Login.css';
import { IoMdClose } from 'react-icons/io';

export default function Register({ onClose }) {
  // États pour gérer les données du formulaire et les messages d'erreur/succès
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const { setUser } = useAuth(); 

  // Fonction pour valider le format de l'adresse email
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // Gère la soumission du formulaire d'inscription
  const handleRegister = async () => {
    if (!isEmailValid(email)) {
      setErrorMessage('Veuillez saisir une adresse email valide.');
      return;
    }

    try {
      // Envoyez une requête POST pour créer un compte utilisateur
      const response = await axios.post('http://localhost:8000/users', {
        firstName: firstName,
        email: email,
        password: password,
      });

      setUser(response.data.user); // Mettre à jour l'utilisateur dans le contexte d'authentification
      //console.log("hey ho");
      setSuccessMessage('Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.');

    } catch (error) {
      //console.error('Erreur lors de l\'inscription :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); 
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'inscription.'); 
      }
    }
  };

  // Gère la fermeture du formulaire
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
        {successMessage && <div className="success-message">{successMessage}</div>} 
      </form>
    </div>
  );
}
