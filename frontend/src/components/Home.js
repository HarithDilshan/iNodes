// Home.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGetValue } from '../web3/GetCurrentValue';
import { useGetBalance } from '../web3/GetTokenBalance';
import { useRequestFunds } from '../web3/GetFunds';
import { useCreateProposal } from '../web3/NewProposal';

// import { Header } from './Header';
import { Footer_ } from './Footer'
import { Navbar_ } from './Navbar';
import { HomeBody } from './HomeBody';


const Home = () => {
  const { account, signer,  } = useAuth();
  
  const { boxValue, getValue } = useGetValue();
  // const { isConnected, account, signer, connectToMetamask } = useMetamaskState();
  const { userBalance, getBalance } = useGetBalance();
  const { requestFunds } = useRequestFunds();
  const { createProposal, proposal, newValue, proposalDescription } = useCreateProposal();

  // return (
  //   <div>
  //     {/* {account ? (
  //       <p>Welcome, {account}!</p>
  //     ) : ( */}
  //       <p>Please log in with MetaMask.</p>
  //     {/* )} */}
  //   </div>
  // );
    return (
    <>
     {/* <Header connectToMetamask={connectToMetamask} isConnected={isConnected} account={account} signer={signer} /> */}
      {/* <Navbar boxValue={boxValue} getValue={getValue} userBalance={userBalance} getBalance={getBalance} signer={signer} requestFunds={requestFunds} createProposal={createProposal} proposal={proposal} newValue={newValue} proposalDescription={proposalDescription} /> */}
    <Navbar_/>
  <HomeBody boxValue={boxValue} getValue={getValue} userBalance={userBalance} getBalance={getBalance} signer={signer} requestFunds={requestFunds} createProposal={createProposal} proposal={proposal} newValue={newValue} proposalDescription={proposalDescription} /> 
    <Footer_ />
    </>
    );
};

export default Home;
