import React from 'react'
import HeaderDashBoard from '../dashboard/HeaderDashBoard'
import MainTransactions from './MainTransactions'
import TransactionsArray from '../transactions/TransactionsArray';


export default function Transactions() {

  return (
    <div>
        <HeaderDashBoard/>
        <MainTransactions/>
    </div>
  )
}
