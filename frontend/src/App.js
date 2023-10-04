// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/login/Login';
import Register from './components/register/Register';
import HomePage from './components/homePage/HomePage';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Transactions from './components/transactions/Transactions.jsx';
import Statistique from './components/statistiques/Statistique.jsx';

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
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/transactions" element={<PrivateRoute element={<Transactions />} />} />
        <Route path="/statistique" element={<PrivateRoute element={<Statistique />} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
