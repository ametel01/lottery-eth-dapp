import React from 'react'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Lottery from '../artifacts/contracts/Lottery.sol/Lottery.json';

const lotteryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(lotteryAddress, Lottery.abi, provider);

export default function Owner() {
    const [owner, setOwner] = useState('');
    useEffect(() => {
      const fetchOwner = async () => {
        const data = await contract._owner();
        const thisOwner = await data.toString();
        setOwner(thisOwner);
      }
      fetchOwner()
        .catch(console.error);
    }, []);
  
    return (
      <div>Lottery Owner: { owner }</div>
    )    
}
