import Constants from '../Constants'
import Web3 from 'web3'
const MAIN_CONTRACT_BUILD = require('../build/Main.json')
const USER_CONTRACT_BUILD = require('../build/User.json')
const QUESTION_CONTRACT_BUILD = require('../build/Question.json')

const GetContracts = async() => {

    const web3 = new Web3(Constants.RPC_PROVIDER)

    const NETWORK_ID = await web3.eth.net.getId()
    const CONTRACT_ADDRESS = MAIN_CONTRACT_BUILD.networks[NETWORK_ID].address

    const MainContract = new web3.eth.Contract(MAIN_CONTRACT_BUILD.abi, CONTRACT_ADDRESS)
    const UserContract = new web3.eth.Contract(USER_CONTRACT_BUILD.abi, CONTRACT_ADDRESS)
    const QuestionContract = new web3.eth.Contract(QUESTION_CONTRACT_BUILD.abi, CONTRACT_ADDRESS)

    return { success: true, data: { MainContract, UserContract, QuestionContract } }
}

export default GetContracts