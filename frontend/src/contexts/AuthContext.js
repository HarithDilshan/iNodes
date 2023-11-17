// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMetamaskState } from '../web3/ConnectWallet';                                           

const AuthContext = createContext();

const AuthProvider = ({ children}) => {

  const { isConnected, account, signer, chainId, connectToMetamask } = useMetamaskState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  console.log(isLoggedIn);
  const login = () => {setLoggedIn(true)};
  const logout = () => setLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isConnected, account, signer , chainId, connectToMetamask, isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };