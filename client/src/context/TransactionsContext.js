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
    const [formData,setFormData] = useState({addressTo:'', amount:'', keyword:'', message:''});
    const [isLoading, setIsLoading] = useState(false);
    const [ setTransactionCount] = useState(localStorage.getItem('transactionCount'))

    const handleChange = (event, name) => {
        setFormData((prevState) => (
            {...prevState, [name]: event.target.value}
        ))
        console.log('chnaging')
    }

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
        console.log(accounts);
        setCurentAccount(accounts[0]);

        } catch(error) {
            console.log(error)

            throw new Error('No ethereum oject');
        }
    }

    const sendTransaction = async  () => {
        try {
            if(!ethereum) {
                return alert('Connect your metmask wallet!');
            }
            const {addressTo, amount,keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            
            await ethereum.request({
                method:'eth_sendTransaction',
                params: {
                    from: currentAccount,
                    to:addressTo,
                    gas: '0x5208',
                    value:parsedAmount._hex
                }
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, keyword, message);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            throw new Error('No object found!');
        }


    }

    useEffect(() => {
        checkWalletConnection();
    },[]);



    return (<TransactionContext.Provider value={{connectWallet,currentAccount, formData,sendTransaction, handleChange}}>
        {children}
    </TransactionContext.Provider>)
}