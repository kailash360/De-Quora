import Constants from '../Constants'
import Web3 from 'web3'
const MAIN_CONTRACT_BUILD = require('../build/Main.json')
const USER_CONTRACT_BUILD = require('../build/User.json')
const QUESTION_CONTRACT_BUILD = require('../build/Question.json')
const web3 = new Web3(Constants.RPC_PROVIDER)
const NETWORK_ID = "5777"
web3.eth.Contract.handleRevert = true
web3.eth.handleRevert = true

const GetContracts = () => {
    const CONTRACT_ADDRESS = MAIN_CONTRACT_BUILD.networks[NETWORK_ID].address

    const MainContract = new web3.eth.Contract(MAIN_CONTRACT_BUILD.abi, CONTRACT_ADDRESS)
    const UserContract = null
    const QuestionContract = null

    return { success: true, data: { MainContract, UserContract, QuestionContract } }
}

export default GetContracts

export const createNewUserContract = async(address) => {

    const UserContract = new web3.eth.Contract(USER_CONTRACT_BUILD.abi, address)
    return { success: true, data: { UserContract } }

}

export const createNewQuestionContract = async(address) => {
    const QuestionContract = new web3.eth.Contract(QUESTION_CONTRACT_BUILD.abi, address)
    return { success: true, data: { QuestionContract } }
}