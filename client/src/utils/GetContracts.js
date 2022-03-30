import Constants from '../Constants'
import Web3 from 'web3'
const DEQUORA_CONTRACT_BUILD = require('../build/DeQuora.json')
const web3 = new Web3(Constants.RPC_PROVIDER)
const NETWORK_ID = "5777"
    // web3.eth.Contract.handleRevert = true
    // web3.eth.handleRevert = true

const GetContracts = () => {
    const CONTRACT_ADDRESS = DEQUORA_CONTRACT_BUILD.networks[NETWORK_ID].address

    const DeQuora = new web3.eth.Contract(DEQUORA_CONTRACT_BUILD.abi, CONTRACT_ADDRESS)
    return { success: true, data: { DeQuora } }
}

export default GetContracts