import { ethers } from "ethers";
import { useState, useEffect } from "react";

import contractAddresses from "../chain-info/deployments/map.json";
import boxContractABI from "../chain-info/contracts/Box.json"
import moralisGovernorABI from "../chain-info/contracts/MoralisGovernor.json"
import { useLocalStorage } from "../web3/useLocalStorage"



export function useCreateProposal() {

    const [proposal, setProposal] = useState();
    const [proposalDescription, setProposalDescription] = useState();
    const [newValue, setValue] = useState();
    const { setLocalStorage, clearLocalStorage, getLocalStorage } = useLocalStorage()

    useEffect(() => {
        if (getLocalStorage('id')) {
            setProposal(getLocalStorage('id'))
        }
    }, [])

    async function createProposal(signer, proposalDescription, value) {
        try {
            clearLocalStorage()
            const boxContract = contractAddresses["11155111"]["Box"][0];
            const moralisGovernor = contractAddresses["11155111"]["MoralisGovernor"][0];
            const boxAbi = boxContractABI.abi;
            const moralisGovernorAbi = moralisGovernorABI.abi;
            const moralisGovernorContractInstance = new ethers.Contract(moralisGovernor, moralisGovernorAbi, signer);
            const boxInterface = new ethers.utils.Interface(boxAbi);
            const encodedFunction = boxInterface.encodeFunctionData('store', [value]);

            const proposeTx = await moralisGovernorContractInstance.propose([boxContract], [0], [encodedFunction], proposalDescription, { gasLimit: 1000000 })
            console.log('test2');
            console.log(proposeTx);
            const proposeReceipt = await proposeTx.wait(3)

            const proposalId = proposeReceipt.events[0].args.proposalId
            console.log('id1', proposalId);
            const bnValue = ethers.BigNumber.from(proposalId);
            console.log('id2', bnValue);
            setProposal(bnValue.toString());
            setValue(value);
            setProposalDescription(proposalDescription);
            console.log('proposalDescription', proposalDescription);

            setLocalStorage('id', proposalId);
            console.log('id', proposalId);


        } catch (err) {
            console.log(err)
        }

    }

    return { createProposal, proposal, newValue, proposalDescription }

}