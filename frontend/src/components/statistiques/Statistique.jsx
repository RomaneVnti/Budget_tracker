import React from 'react';
import HeaderDashBoard from '../dashboard/HeaderDashBoard';
import BandeauStatistique from './BandeauStatistique';
import BudgetArrayStatistiques from './BudgetArrayStatistiques';

export default function Statistique() {
  return (
    <div>
        <HeaderDashBoard/>
        <BandeauStatistique/>
        <BudgetArrayStatistiques/>
    </div>
  )
}
