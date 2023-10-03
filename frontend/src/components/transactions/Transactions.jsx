import React from 'react'
import HeaderDashBoard from '../dashboard/HeaderDashBoard'
import MainTransactions from './MainTransactions'
import ButtonAddTransaction from './ButtonAddTransaction';


export default function Transactions() {

  return (
    <div>
        <HeaderDashBoard/>
        <ButtonAddTransaction/>
        <MainTransactions/>
    </div>
  )
}
