import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  const [isForgotPasswordFormVisible, setIsForgotPasswordFormVisible] = useState(false); // Ajoutez l'état pour le formulaire de mot de passe oublié ici
  const [user, setUser] = useState(null); // Ajoutez l'état pour l'utilisateur connecté ici

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const toggleRegisterForm = () => {
    setIsRegisterFormVisible(!isRegisterFormVisible);
  };

  const toggleForgotPasswordForm = () => {
    setIsForgotPasswordFormVisible(!isForgotPasswordFormVisible); // Ajoutez la logique pour basculer la visibilité du formulaire de mot de passe oublié
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginFormVisible,
        toggleLoginForm,
        isRegisterFormVisible,
        toggleRegisterForm,
        isForgotPasswordFormVisible, // Ajoutez l'état du formulaire de mot de passe oublié ici
        toggleForgotPasswordForm, // Ajoutez la fonction pour basculer la visibilité du formulaire de mot de passe oublié
        user, // Ajoutez l'état de l'utilisateur connecté ici
        setUser, // Ajoutez la fonction pour définir l'utilisateur connecté
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
