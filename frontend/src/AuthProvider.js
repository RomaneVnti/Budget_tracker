import React, { createContext, useContext, useState } from 'react';

// Création d'un contexte d'authentification
const AuthContext = createContext();

// Définition du composant AuthProvider qui enveloppe d'autres composants
export const AuthProvider = ({ children }) => {
  // État local pour stocker les informations de l'utilisateur
  const [user, setUser] = useState(null);
  // État local pour gérer la visibilité du formulaire de connexion
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  // Fonction pour basculer la visibilité du formulaire de connexion
  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoginFormVisible, toggleLoginForm }}>
      {children}
    </AuthContext.Provider>
  );
};
