import React, { useContext, useState } from "react";
// import { AiFillPlayCircle } from 'react-icons/ai'
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from ".";
import { TransactionContext } from "../context/TransactionsContext";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
    
  } = useContext(TransactionContext);
  
  const [isLoading, setIsLoading] = useState(false);


  const reducedAddress = `${currentAccount.slice(0,10)}...${currentAccount.slice(currentAccount.length -4)}`;

  // const handleChange = (event, name) => {
  //   console.log(event.target.value);
  //   formData((prevState) => (
  //     {...prevState, [name]: event.target.value}
  // ))
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { addressTo, amount, keyword, message } = formData;

    sendTransaction();
    if (!addressTo || !amount || !keyword || !message) return;

  };

  

  // const Input = ({ placeholder, name, type, handleChange }) => (

  //   <input
  //     placeholder={placeholder}
  //     type={type}
  //     onChange={(e) => {handleChange(e, name)}}
  //     className="my-2 w-full rounded-sm p-2 outline-none bg-blue-900/25 border-none text-white border-white text-sm white-glassmorphism"
  //   /> 
  // );
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex md:flex-row flex-col justify-between items-start md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md: w-9/12">
            Explore the crypto world. Buy and sell the cryptocurrency easily!
          </p>
          {!currentAccount && (
            <button
              className="fkex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full hover:[#2546bd] cursor-pointer"
              type="button"
              onClick={connectWallet}
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-col-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={commonStyles}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full ml-20">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full  h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 border-white rounded-full border-2 flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle color="#fff" fontSize={17} />
              </div>
              <div>
                <p className="text-white font-light text-sm overflow-hidden">
                  {connectWallet && reducedAddress}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 m-5 sm:w-96 h-80 w-full items-center flex blue-glassmorphism flex-col justify-start">
            <input
              placeholder=" senderAddress"
              type="text"
              name="addressTo"
              onChange={(name) => {handleChange(name)}}
              className="my-2 w-full rounded-sm p-2 outline-none bg-blue-950/75 border-b-2 text-white border-none text-sm white-glassmorphism"
            />
            <input
              placeholder="Amount"
              type="text"
              name="amount"
              onChange={(name) => {handleChange(name)}}
              className="my-2 w-full rounded-sm p-2 outline-none bg-blue-950/75 text-white border-none text-sm white-glassmorphism"
            />
            <input
              placeholder="Keyword (Gif)"
              type="text"
              name="keyword"
              onChange={(name) => {handleChange( name)}}
              className="my-2 w-full rounded-sm p-2 outline-none bg-blue-950/75 text-white border-none text-sm white-glassmorphism"
            />
            <input
              placeholder="Message"
              type="text"
              name="message"
              onChange={name => {handleChange(name)}}
              className="my-2 w-full rounded-sm p-2 outline-none bg-blue-950/75 text-white border-none text-sm white-glassmorphism"
            />
            
{/*             
               <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange}  /> 
                <Input placeholder="Amount(ETH)" name="amount" type="number"  handleChange={handleChange}/>
                 <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} /> 
                <Input placeholder="Enter Message" name="message" type="text"  handleChange={handleChange} />  */}

            <div className="h-[1px] w-full bg-gray-400 my-2 mt-4.5 ">
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-5 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Welcome;
