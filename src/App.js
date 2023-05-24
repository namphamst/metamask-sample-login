import React, { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [address, setAddress] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // Kiểm tra xem MetaMask đã được cài đặt trên trình duyệt của người dùng hay chưa
    if (typeof window.ethereum !== "undefined") {
      // Tạo đối tượng Web3 từ MetaMask
      const newWeb3 = new Web3(window.ethereum);
      setWeb3(newWeb3);

      // Đăng nhập vào MetaMask và lấy địa chỉ ví của người dùng
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setAddress(accounts[0]); // Lưu địa chỉ ví vào state
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("MetaMask is not installed");
    }
  }, []);

  const handleLoginClick = () => {
    // Kiểm tra xem MetaMask đã được kết nối và đăng nhập hay chưa
    if (web3 && address) {
      // Thực hiện các thao tác đăng nhập của bạn tại đây
      console.log(`Logged in with address: ${address}`);
    } else {
      console.error("Please connect your MetaMask wallet");
    }
  };

  return (
    <div>
      {address ? (
        <p>Logged in with address: {address}</p>
      ) : (
        <button onClick={handleLoginClick}>Login with MetaMask</button>
      )}
    </div>
  );
}

export default App;
