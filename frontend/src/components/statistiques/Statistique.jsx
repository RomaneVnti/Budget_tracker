import React from 'react';
import HeaderDashBoard from '../dashboard/HeaderDashBoard';
import BandeauStatistique from './BandeauStatistique';
import BudgetArrayStatistiques from './BudgetArrayStatistiques';
import Footer from '../dashboard/Footer';

export default function Statistique() {
  return (
    <div>
        <HeaderDashBoard/>
        <BandeauStatistique/>
        <BudgetArrayStatistiques/>
        <Footer/>
    </div>
  )
}
