import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import spiderManWalletAbi from "../artifacts/contracts/Assessment.sol/SpiderManSecuritySystem.json";

export default function HomePage() {
  const [spiderManWallet, setspiderManWallet] = useState(undefined);
  const [spiderManAccount, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);

  const changeKeyPrev = useRef();
  const changeKeyNew = useRef();
  const adminAccessAddr = useRef();
  const accessAddr = useRef();
  const openDoorKey = useRef();

  const contractAddress = "0x5D147C36248f2f3E822529A32b4a00653432caCc";
  const atmABI = spiderManWalletAbi.abi;

  const getWalletAddress = async () => {
    if (window.ethereum) {
      setspiderManWallet(window.ethereum);
    }

    if (spiderManWallet) {
      try {
        const accounts = await spiderManWallet.request({ method: "eth_accounts" });
        accoundHandler(accounts);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const accoundHandler = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No spiderManAccount found");
    }
  };

  const connectToMetamask = async () => {
    if (!spiderManWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await spiderManWallet.request({ method: "eth_requestAccounts" });
    accoundHandler(accounts);
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(spiderManWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const changeSecretKey = async () => {
    let prevKey = Number(changeKeyPrev.current.value);
    let newKey = Number(changeKeyNew.current.value);
    try {
      if (atm) {
        let tx = await atm.changeSecretKey(prevKey, newKey);
        await tx.wait();
        console.log(`secret key change`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const giveAdminAccess = async () => {
    let addr = adminAccessAddr.current.value;

    try {
      if (atm) {
        let tx = await atm.giveAdminAccess(addr);
        await tx.wait();
        console.log(`new item added successfully`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const giveAccess = async () => {
    let addr = accessAddr.current.value;

    try {
      if (atm) {
        let tx = await atm.giveAccess(addr);
        await tx.wait();
        console.log(`new item added successfully`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const openDoor = async () => {
    let key = openDoorKey.current.value;

    try {
      if (atm) {
        let tx = await atm.openDoor(key);
        await tx.wait();
        console.log(`new item added successfully`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };

  const webShot = async () => {
    try {
      if (atm) {
        let tx = await atm.webShot(spiderManAccount);
        await tx.wait();
        console.log(`Web shot fired!`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };
  const climbWall = async () => {
    try {
      if (atm) {
        let tx = await atm.climbWall();
        await tx.wait();
        console.log(`Wall climbed successfully!`);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG");
      console.log(error);
    }
  };
  useEffect(() => {
    getWalletAddress();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Spider-Man's Security System</h1>
      </header>
      <div className="content">
        {!spiderManAccount ? (
          <button className="connect-button" onClick={connectToMetamask}>Connect to MetaMask</button>
        ) : (
          <>
            <div className="section">
              <h2>Change Secret Key (Owner Only)</h2>
              <div className="input-group">
                <input ref={changeKeyPrev} type="number" placeholder="Previous Key" />
                <input ref={changeKeyNew} type="number" placeholder="New Key" />
                <button className="action-button" onClick={changeSecretKey}>Change Key</button>
              </div>
            </div>

            <div className="section">
              <h2>Give Admin Access (Owner Only)</h2>
              <div className="input-group">
                <input ref={adminAccessAddr} type="text" placeholder="Address to Grant Admin Access" />
                <button className="action-button" onClick={giveAdminAccess}>Grant Admin Access</button>
              </div>
            </div>

            <div className="section">
              <h2>Give Access to Users (Admins Only)</h2>
              <div className="input-group">
                <input ref={accessAddr} type="text" placeholder="Address to Grant Access" />
                <button className="action-button" onClick={giveAccess}>Grant Access</button>
              </div>
            </div>

            <div className="section">
              <h2>Open Door (Users with Access)</h2>
              <div className="input-group">
                <input ref={openDoorKey} type="number" placeholder="Secret Key to Open Door" />
                <button className="action-button" onClick={openDoor}>Open Door</button>
              </div>
            </div>
            <div className="section">
              <h2>Spider Abilities</h2>
             <din className="input-group">
             <div className="action-button">
                <button onClick={webShot}>Shoot Web</button>
              </div>
              <div className="action-button">
                <button onClick={climbWall}>Climb Wall</button>
              </div>
             </din>
            </div>

          </>
        )}
      </div>

      <style jsx>{`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f4f4f4;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  header {
    margin-bottom: 20px;
    text-align: center;
  }

  h1 {
    font-size: 24px;
    color: #333;
  }

  .content {
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .section {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }

  .input-group {
    display: flex;
    align-items: center;
  }

  input {
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    box-sizing: border-box;
  }

  .action-button {
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 14px;
    transition: background-color 0.3s;
  }

  .action-button:hover {
    background-color: #0056b3;
  }

  .connect-button {
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .connect-button:hover {
    background-color: #0056b3;
  }
`}</style>

    </main>
  );

}
