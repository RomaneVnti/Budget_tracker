// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false); // Nouvel état pour gérer la visibilité du formulaire

  // Fonction pour ouvrir/fermer le formulaire
  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoginFormVisible, toggleLoginForm }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
