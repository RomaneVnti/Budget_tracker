import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importez Routes et Route
import { AuthProvider } from './context/AuthContext'; // Assurez-vous que le chemin est correct
import Login from './components/login/Login';
import Home from './components/home/Home';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} /> {/* Ajoutez cette route pour la page d'accueil */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
