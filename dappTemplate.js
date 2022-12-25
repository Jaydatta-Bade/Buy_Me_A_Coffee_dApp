import abi from "./contract/coffee.json"  //ABI
import {useState, useEffect} from 'react';  //hooks
import {ethers} from "ethers";    //ether.js

import './App.css';

function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })

  useEffect(() => {
    const connectWallet = async() => {
      const contractAddress = "0x7bCc689d93A10E299F87B0c1B6Ea210c741B7453";
      const contractABI=abi.abi;
      try{
        const {ethereum}=window;

        if(ethereum){
          const account = await ethereum.request({method:"eth_requestAccounts"})
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        setState({provider,signer,contract})
      }catch(error){
        console.log(error)
      }
    };
    connectWallet();
  },[]);
  console.log(state);
  return (
    <div className="App"></div>
  );
}

export default App;
