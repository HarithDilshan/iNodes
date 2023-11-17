// import { Header } from './components/Header';
// import { Footer } from './components/Footer'
// import { Navbar } from './components/Navbar';


import { useEffect } from 'react';
import { useGetValue } from './web3/GetCurrentValue';
import { useGetBalance } from './web3/GetTokenBalance';
import { useRequestFunds } from './web3/GetFunds';
import { useCreateProposal } from './web3/NewProposal';

// import "./App.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet } from "wagmi/chains";



// function App() {


//   console.log('test ' + proposal);

//   return (
//     <>
//       <Header connectToMetamask={connectToMetamask} isConnected={isConnected} account={account} signer={signer} />
//       <Navbar boxValue={boxValue} getValue={getValue} userBalance={userBalance} getBalance={getBalance} signer={signer} requestFunds={requestFunds} createProposal={createProposal} proposal={proposal} newValue={newValue} proposalDescription={proposalDescription} />
//       <Footer />
//     </>
//   );
// }

// export default App;

// const { publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [publicProvider()]
// );

// const config = createConfig({
//   autoConnect: true,
//   publicClient,
//   webSocketPublicClient,
// });


// const router = createBrowserRouter([
//   {
//     path: "/signin",
//     element: <Signin />,
//   },
//   {
//     path: "/user",
//     element: <User />,
//   },
//   {
//     path: "/",
//     element: <h1>Home Component</h1>,
//   },
// ]);

// function App() {
//   return (
//     <WagmiConfig config={config}>
//       <RouterProvider router={router} />
//     </WagmiConfig>
//   );
// }

// export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthLayout from './contexts/AuthLayout';
import Home from './components/Home';
import Login from './components/Login';

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route element={<AuthLayout/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Route> */}
          <Route element={<AuthLayout/>}>
          <Route path="home" element={<Home />} />
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
