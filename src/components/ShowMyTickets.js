import React from 'react'
import { useState } from 'react';
import { ethers } from 'ethers';
import Lottery from '../artifacts/contracts/Lottery.sol/Lottery.json';
import styled from 'styled-components';

const lotteryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function ShowMyTickets() {
    const [ownedTickets, setOwnedTickets] = useState();
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

    const showMyTickets = async () => {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(lotteryAddress, Lottery.abi, signer);
        const signerAddress = signer.getAddress();
        const data = await contract.showMyTickets(signerAddress);
        const tickets = await data.toString();
        setOwnedTickets([tickets]);
      }


    return (
        <p>
            <Wrapper>
                <Button onClick={async () => {await showMyTickets()}}>My Tickets: </Button>
            </Wrapper>
            <div> { ownedTickets }</div>
            
        </p>
    )
}
