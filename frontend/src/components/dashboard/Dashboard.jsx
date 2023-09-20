import React from 'react'
import HeaderDashBoard from './HeaderDashBoard'
import MainDasboardTitle from './MainDasboardTitle'
import BudgetArray from './BudgetArray'
import Footer from './Footer'


export default function Dashboard() {
  return (
    <div>
        <HeaderDashBoard/>
        <MainDasboardTitle/>
        <BudgetArray/>
        <Footer/>
    </div>
  )
}
