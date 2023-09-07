// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthProvider'; // Importez le AuthProvider
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Enveloppez votre application avec AuthProvider */}
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
