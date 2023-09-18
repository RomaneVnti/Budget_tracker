import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../style/dashboard/MainDashboardArray.css';


export default function MainDashboardArray() {
  const { user } = useAuth();
 

  return (
    <main className="mainArray">
      
    </main>
  );
}
