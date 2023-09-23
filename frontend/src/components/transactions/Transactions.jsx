import React from 'react'
import HeaderDashBoard from '../dashboard/HeaderDashBoard'
import MainTransactions from './MainTransactions'
import Footer from '../dashboard/Footer';


export default function Transactions() {

  return (
    <div>
        <HeaderDashBoard/>
        <MainTransactions/>
        <Footer/>
    </div>
  )
}
