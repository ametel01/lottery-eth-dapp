import React from 'react';
import Owner from './components/Owner'
import Expiration from './components/Expiration';
import BuyTicket from './components/BuyTicket';
import ShowMyTickets from './components/ShowMyTickets';
import styled from 'styled-components';

export default function App() {

  const Mydiv = styled.div`
    background-color: #f95959;
    border-radius: 25px;
    padding: 20px; 
    width: 400px;
  `

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  requestAccount();
  
  return (
    <Mydiv>
      <Owner />
      <Expiration />
      <BuyTicket />
      <ShowMyTickets />
    </Mydiv> 
  );
}
