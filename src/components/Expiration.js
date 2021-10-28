import React from 'react'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Lottery from '../artifacts/contracts/Lottery.sol/Lottery.json';

const lotteryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(lotteryAddress, Lottery.abi, provider);

export default function Expiration() {
    const [expire, setExpire] = useState('');
    useEffect(() => {
      const fetchExpire = async () => {
        const data = await contract.expiration();
        const timestamp = await data;
        const date = new Date(timestamp*1000).toUTCString();
        setExpire(date);
      }
      fetchExpire()
        .catch(console.error);
    }, []);
  
    return (
      <p>
      <div>Lottery Expiration</div>
      <div>{ expire }</div>
      </p>

    )
}
