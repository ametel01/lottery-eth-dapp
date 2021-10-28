import React from 'react'
import { useState } from 'react';
import { ethers } from 'ethers';
import Lottery from '../artifacts/contracts/Lottery.sol/Lottery.json';
import styled from 'styled-components';

const lotteryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const overrides = { value: ethers.utils.parseEther("1.0")};

export default function BuyTicket() {
  const [ticket, setTicket] = useState();
  const Button = styled.button`
  background-color: #233142;
  color: #e3e3e3;
  border-radius: 12px;
  padding: 1rem 2rem;
`
  const Wrapper = styled.div `
  &:hover ${Button}  {
    background-color: #e3e3e3;
    color: #233142;
    transition-duration: 0.5s;
  `
  async function requestAccount() {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
    
    const buyTicket = async () => {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(lotteryAddress, Lottery.abi, signer);
    try {
      await contract.buyTicket(overrides);
    } catch (error) {
      console.log("Lottery Expired");
    }
    const signerAddress = signer.getAddress();
    const data = await contract.ownerTicketsCount(signerAddress);
    const newTicket = await data.toString();
    setTicket(newTicket);
    
  }


      return (
      <p>
        <Wrapper>
          <Button onClick={async () => {await buyTicket()}}>Buy Ticket</Button>
        </Wrapper>
      </p>
    )
}
