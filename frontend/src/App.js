import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importez Routes et Route
import { AuthProvider } from './context/AuthContext'; // Assurez-vous que le chemin est correct
import Login from './components/login/Login';
import Register from './components/register/Register';
import HomePage from './components/homePage/HomePage';
import HeaderDashBoard from './components/dashboard/HeaderDashBoard';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<HeaderDashBoard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
