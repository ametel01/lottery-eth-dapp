import React from 'react'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Lottery from '../artifacts/contracts/Lottery.sol/Lottery.json';

const lotteryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
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
      <div>Lottery Expiration: { expire }</div>
    )
}
