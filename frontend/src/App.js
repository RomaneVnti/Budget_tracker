import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importez Routes et Route
import { AuthProvider } from './context/AuthContext'; // Assurez-vous que le chemin est correct
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />  
      </Routes>
    </AuthProvider>
  );
}

export default App;
