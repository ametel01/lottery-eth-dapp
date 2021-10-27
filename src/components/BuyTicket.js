import React from 'react'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Lottery from '../artifacts/contracts/Lottery.sol/Lottery.json';
import { getNetwork } from '@ethersproject/networks';

const lotteryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.providers.Web3Provider(window.ethereum);


const overrides = { value: ethers.utils.parseEther("1.0")};


export default function BuyTicket() {
  const [ticket, setTicket] = useState();

  async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
    
    
  const buyTicket = async () => {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(lotteryAddress, Lottery.abi, signer)
    await contract.buyTicket(overrides)
    const data = await contract.ow;
    const newTicket = await data;
    setTicket(newTicket);
    
  }
    
    return (
      <button onClick={async () => {await buyTicket()}}>Buy Ticket</button>
    )
}
