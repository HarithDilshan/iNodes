import { ethers } from "ethers";
import { useState } from "react";
import axios from "axios";

// export function useAuthenticate() {
//     const [message, setMessage] = useState();

    // async function authenticate(params)  {
    //     await axios.post(`request_challenge/`, params, {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //     }).then((result) => {
    //         setMessage(result.data.message)
    //     }).catch((err) => console.log(err))
    //   };
  
    //   const requestMessage = (account, chain) =>
    //     handleApiPost('request_challenge', {
    //       address: account,
    //       chain: chain,
    //       network: 'evm',
    //     });

    // async function authenticate(chainId, walletAddress) {
    //     await axios.get(`/request_challenge?chainId=${chainId}&address=${walletAddress}`).then((res) => {
    //         // const balance = res.data[0].balance
    //         // const decimals = 18
    //         // const balanceInMRST = ethers.utils.formatUnits(balance, decimals);
    //         // setUserBalance(balanceInMRST)
    //         setUserBalance(0)
    //         console.log('haroithhhhhhh',res);

    //     }).catch((err) => console.log(err))
    // }

//     return { message, authenticate }
// }

export function useAuthenticate() {
   const [message, setMessage] = useState();

  async function authenticate(address,chainId) {
      await axios.get(`/request_challenge?address=${address}&chainId=${chainId}`).then((res) => {
         console.log(res);
         // setMessage(balanceInMRST)
         const message = res.data.message;
         setMessage(message);
      }).catch((err) => console.log(err));
  }

  return message;
}