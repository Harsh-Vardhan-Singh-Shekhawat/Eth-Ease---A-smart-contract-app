import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
// import Web3 from 'web3';
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  // const myContract = new Web3.eth.Contract(contractABI, contractAddress, signer);
  // console.log({
  //     provider,
  //     signer,
  //     transactionContract
  // })
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState({});

  const handleChange = (event) => {
    // console.log(event.target.value);
    // console.log(event.target.name);
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const getTransactions = async () => {
    try {
      const transactionContract = getEthereumContract();
      // console.log(transactionContract);
      const availableTransactions =
        await transactionContract.getAllTransactions();
      // console.log(availableTransactions);
      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      // console.log(structuredTransactions);

      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkWalletConnection = async () => {
    try {
      if (!ethereum) {
        return alert("Connect your metamask wallet!");
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getTransactions();
      } else {
        console.log("No accounts found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkExistingTransactions = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionsCount();
      // window.localStorage.setItem("transactionCount", transactionCount);
      // console.log(transactionCount)
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum oject");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Connect your metamask wallet!");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum oject");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        return alert("Connect your metmask wallet!");
      }
      const { addressTo, amount, keyword, message } = formData;
      console.log(formData);  

      const transactionContract = getEthereumContract();
      const value = ethers.utils.parseEther(amount);
      // const parsedAmount = amount * 10**18

      // console.log(parsedAmount)

      // await ethereum.request({
      //   method: "eth_sendTransaction",
      //   params: {
      //     from: currentAccount,
      //     to: addressTo,
      //     gas: "0x5208",
      //     value: parsedAmount._hex,
      //   },
      // });

      const tx = await transactionContract.addToBlockchain(
        addressTo,
        keyword,
        message,
        {
          value: value,
        }
      );
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        const transactionCount =
          await transactionContract.getTransactionsCount();
        console.log("count " + transactionCount.toNumber());
        setTransactionCount(transactionCount.toNumber());
      }

      // window.reload()
    } catch (error) {
      throw new Error("No object found!");
    }
  };

  useEffect(() => {
    checkWalletConnection();
    checkExistingTransactions();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        transactions,
        isLoading,
        sendTransaction,
        formData,
        handleChange,
        transactionCount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
