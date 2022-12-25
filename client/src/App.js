import abi from "./contract/coffee.json"; //ABI
import { useState, useEffect } from "react"; //hooks
import { ethers } from "ethers"; //ether.js
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x7bCc689d93A10E299F87B0c1B6Ea210c741B7453";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          setAccount(account);
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setState({ provider, signer, contract });
        } else {
          alert("Please Install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100vh" }}>
      {/* <img src="" alt="" /> */}
      <p>Connected Account -{account}</p>
      <div className="container">
        <Buy state={state}></Buy>
        <Memos state={state}></Memos>
      </div>
    </div>
  );
}

export default App;
