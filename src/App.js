import './App.css';
import { useState }  from 'react';
import { ethers } from 'ethers';
import Lottery from './artifacts/contracts/Lottery.sol/Lottery.json';

const lotteryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [owner, expiration] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchOwner() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(lotteryAddress, Lottery.abi, provider)
      try {
        const owner = await contract.owner()
        console.log('owner: ', owner.toString())
      }  catch (err) {
        console.log('Error: ', err)
      }
    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchOwner}>Fetch Owner</button>
      </header>
    </div>
  );
}

export default App;
