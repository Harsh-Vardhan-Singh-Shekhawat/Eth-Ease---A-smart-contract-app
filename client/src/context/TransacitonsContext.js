import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethereum.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer, 
        transactionContract
    })
} 

export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurentAccount] = useState('');

    const checkWalletConnection = async () => {
        
        try{
            if(!ethereum) {
                return alert('Connect your metamask wallet!')
            }
            const accounts = await ethereum.request({method:'eth_accounts'});
            
            if(accounts.length) {
                setCurentAccount(accounts[0]);
                //getAllTransactions();
            }
            else {
                console.log('No accounts found!');
            }
        } catch (error) {
            console.log(error);
        }    
    }

    const connectWallet = async () => {
        try{
        if(!ethereum) {
            return alert('Connect your metamask wallet!')
        }
        const accounts = await ethereum.request({method:'eth_requestAccounts'});

        setCurentAccount(accounts[0]);

        } catch(error) {
            console.log(error)

            throw new Error('No ethereum oject');
        }
    }

    const sendTransaction = async  () => {
        if(!ethereum) {
            return alert('Connect your metmask wallet!');
        }
        
    }

    useEffect(() => {
        checkWalletConnection();
    },[]);



    return (<TransactionContext.Provider value={{connectWallet,currentAccount}}>
        {children}
    </TransactionContext.Provider>)
}