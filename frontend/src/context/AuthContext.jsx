import React, { createContext, useContext, useState } from 'react';

// Création d'un contexte d'authentification
const AuthContext = createContext();

// Création du composant AuthProvider qui enveloppe l'application avec le contexte d'authentification
export const AuthProvider = ({ children }) => {
  // Utilisation de l'état local (useState) pour gérer différentes valeurs liées à l'authentification

  // État pour gérer la visibilité du formulaire de connexion
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  // État pour gérer la visibilité du formulaire d'inscription
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);


  // État pour stocker les données de l'utilisateur actuellement authentifié
  const [user, setUser] = useState();

  // Fonction pour basculer la visibilité du formulaire de connexion
  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  // Fonction pour basculer la visibilité du formulaire d'inscription
  const toggleRegisterForm = () => {
    setIsRegisterFormVisible(!isRegisterFormVisible);
  };


  // Rendu du composant AuthProvider avec le contexte d'authentification (AuthContext.Provider)
  return (
    <AuthContext.Provider
      // Définition des valeurs à partager dans le contexte
      value={{
        isLoginFormVisible,            // Booléen pour la visibilité du formulaire de connexion
        toggleLoginForm,              // Fonction pour basculer la visibilité du formulaire de connexion
        isRegisterFormVisible,        // Booléen pour la visibilité du formulaire d'inscription
        toggleRegisterForm,           // Fonction pour basculer la visibilité du formulaire d'inscription
        user,                         // Données de l'utilisateur actuellement authentifié
        setUser,                      // Fonction pour mettre à jour les données de l'utilisateur
      }}
    >
      {/* Le composant AuthProvider enveloppe ses enfants avec le contexte d'authentification */}
      {children}
    </AuthContext.Provider>
  );
};

// Fonction utilitaire pour accéder au contexte d'authentification dans d'autres composants
export const useAuth = () => {
  return useContext(AuthContext);
};
