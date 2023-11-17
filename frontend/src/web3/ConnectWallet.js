import { useState } from 'react';
import { ethers } from 'ethers';

export function useMetamaskState() {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();
    const [chainId, setChainId] = useState();
 

    async function connectToMetamask() {
        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
           // const acc = await provider.send('eth_requestAccounts', []);
            const [accounts] = await Promise.all([
                provider.send('eth_requestAccounts', [])
                // , provider.send('eth_chainId', []),
              ]);
            const sign = provider.getSigner(accounts[0]);
            const network = (await provider.getNetwork(accounts[0])).name;
            const chainId = (await provider.getNetwork(accounts[0])).chainId;
            
            console.log('network',network);
            setIsConnected(true);
            setAccount(accounts[0]);
            setSigner(sign);
            setChainId(chainId);
           

        } catch (err) {
            console.log(err)
        }
    }

    return { isConnected, account, signer, chainId, connectToMetamask }
}