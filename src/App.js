import React from 'react';
import Owner from './components/Owner'
import Expiration from './components/Expiration';
import BuyTicket from './components/BuyTicket';

export default function App() {

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  requestAccount();
  return (
    <>
      <Owner />
      <Expiration />
      <BuyTicket />
    </> 
  );
}
