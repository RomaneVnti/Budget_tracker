import React from 'react'
import HeaderDashBoard from './HeaderDashBoard'
import MainDasboardTitle from './MainDasboardTitle'
import BudgetArray from './BudgetArray'


export default function Dashboard() {
  return (
    <div>
        <HeaderDashBoard/>
        <MainDasboardTitle/>
        <BudgetArray/>
    </div>
  )
}
