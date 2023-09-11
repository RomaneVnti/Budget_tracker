import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function MainDasboardTitle() {
  const { user } = useAuth();

  return (
    <div>
      <div className="titleFirstName">
        {user ? `Bonjour, ${user.firstName}` : 'Bienvenue'}
      </div>
    </div>
  );
}
