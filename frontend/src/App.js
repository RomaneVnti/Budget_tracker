import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importez Routes et Route
import { AuthProvider } from './context/AuthContext'; // Assurez-vous que le chemin est correct
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';
import HomePage from './components/homePage/HomePage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />  
        <Route path="/homePage" element={<HomePage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
