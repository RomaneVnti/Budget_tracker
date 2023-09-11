import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importez Navigate pour les redirections
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/login/Login';
import Register from './components/register/Register';
import HomePage from './components/homePage/HomePage';
import Dashboard from './components/dashboard/Dashboard';

function PrivateRoute({ path, element }) {
  const { user } = useAuth();

  return user ? (
    element
  ) : (
    <Navigate to="/homePage" replace state={{ from: path }} />
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Utilisez PrivateRoute pour protéger le tableau de bord */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
