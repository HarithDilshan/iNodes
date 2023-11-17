// AuthContext.js
import { useMetamaskState } from '../web3/ConnectWallet';  
import React, { createContext, useContext, useReducer, useEffect } from 'react';                                         

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
};

// Load authentication state from local storage
const loadFromLocalStorage = () => {
  const storedState = localStorage.getItem('authState');
  return storedState ? JSON.parse(storedState) : initialState;
};


const AuthContext = createContext();

const AuthProvider = ({ children}) => {

  const [state, dispatch] = useReducer(authReducer, initialState, loadFromLocalStorage);
  const { isConnected, account, signer, chainId, connectToMetamask } = useMetamaskState();

  useEffect(() => {
    // Save authentication state to local storage
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  const login = () => dispatch({ type: LOGIN });
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider value={{ isConnected, account, signer , chainId, connectToMetamask,isAuthenticated: state.isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuth = () =>{
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


export { AuthProvider, useAuth };