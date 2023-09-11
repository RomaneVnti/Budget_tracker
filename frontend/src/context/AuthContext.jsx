import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  const [isForgotPasswordFormVisible, setIsForgotPasswordFormVisible] = useState(false);
  const [user, setUser] = useState();

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const toggleRegisterForm = () => {
    setIsRegisterFormVisible(!isRegisterFormVisible);
  };

  const toggleForgotPasswordForm = () => {
    setIsForgotPasswordFormVisible(!isForgotPasswordFormVisible);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginFormVisible,
        toggleLoginForm,
        isRegisterFormVisible,
        toggleRegisterForm,
        isForgotPasswordFormVisible,
        toggleForgotPasswordForm,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
