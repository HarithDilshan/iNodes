import { ethers } from "ethers";
import { useState } from "react";
import axios from "axios";

export function useVerification() {
    const [user, setUser] = useState();

    async function verify(params)  {
        await axios.post(`verify_challenge/`, params, {
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((result) => {
          console.log(result);
           setUser(result.data.user)
        }).catch((err) => console.log(err))
      };
  
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

    return { user, verify }
}

// export function useVerification() {
//   const [user, setUser] = useState();

//   async function verify(message,signature) {
//       await axios.get(`/verify_challenge?message=${message}&signature=${signature}`).then((res) => {
//          console.log(res);
//          // setMessage(balanceInMRST)
//         // const message = res.data.message;
//        //  setUser(message);
//       }).catch((err) => console.log(err));
//   }

//   return { user, verify }
// }