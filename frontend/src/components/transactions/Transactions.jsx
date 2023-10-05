import React from 'react'
import HeaderDashBoard from '../dashboard/HeaderDashBoard'
import MainTransactions from './MainTransactions'
import ButtonAddTransaction from './ButtonAddTransaction';
import Footer from '../dashboard/Footer';


export default function Transactions() {

  return (
    <div>
        <HeaderDashBoard/>
        <ButtonAddTransaction/>
        <MainTransactions/>
        <Footer/>
    </div>
  )
}
