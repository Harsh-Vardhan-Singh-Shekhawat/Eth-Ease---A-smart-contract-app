import React,{useContext} from 'react'
import { TransactionContext } from '../context/TransactionsContext';

import data from '../utils/dummyData'

const TransactionsCard = (props) => {

  const {addressFrom, addressTo, timestamp, message, amount} = props.transaction
  // console.log(addressFrom)
        console.log(props.transaction.addressFrom)
  // console.log(amount)
  return (
    <div className="bg-[#181918] m-4 flex flex-1
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    min-w-full
    flex-col p-3 rounded-md hover:shadow-2xl"
  >
  <div className='flex flex-col items-center w-full mt-3'>
    <div className=' w-full mb-6 p-2'>
      <a href={`http://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
          <p className='text-white text-base'>From: {addressFrom}</p>
      </a>
    </div>
    <div className=' w-full mb-6 p-2'>
      <a href={`http://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
          <p className='text-white text-base'>To: {addressTo}</p>
      </a>
    </div>
    <p className='text-white text-base'>Amount: {amount || 0} ETH</p>

    {message && (
      <>
        <br/>
        <p className='text-white text-base'>Message: {message}</p>
      </>
    )}
    <p className='text-[#37c7da] font-bold'>
      {timestamp}
    </p>
  </div>

    </div>
  );
}

const Transactions = () => { 

  const {transactions,currentAccount} = useContext(TransactionContext);
 
  // console.log(transactions[2])
 
// const list = transactions.forEach((transaction,i) => 
//   (<TransactionsCard key={i} transaction =  {transaction}  /> ))
  
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
      {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3> 
        )}
      </div>
      {currentAccount && <div className="flex flex-wrap justify-center items-center mt-10">
        {/* {list} */}
        </div>
        }
    </div>
  )
}

export default Transactions
