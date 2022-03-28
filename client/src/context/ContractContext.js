import Web3 from 'web3'
import {useEffect} from 'react'
import {createContext, useState, useContext} from 'react'
import { AuthContext } from './AuthContext'
import {createNewUserContract, createNewQuestionContract} from '../utils/GetContracts'
import Utils from '../utils'

export const ContractContext = createContext()

function ContractContextProvider(props){

    const {account, updateAuth, authenticate} = useContext(AuthContext)

    const [state, setState] = useState({
        MainContract: null,
        UserContract: null,
        QuestionContracts: null,
        Questions: []
    })

    const getUpdatedContracts = () => state

    const updateContract = (data)=>{
        setState({...state,...data})
    }

    const updateUserContract = async (address)=>{
        const newUserContract = await createNewUserContract(address)
        setState({...state,...{UserContract: newUserContract.data.UserContract}})
    }

    const updateQuestions = async(_question)=>{
        console.log('updateQuestions', _question.data)
        setState({...state, ...{Questions:[...state.Questions,_question.data]}})
        console.log('Questions in State: ', state.Questions)
    }

    const updateQuestionContract = async (address) =>{
        const newQuestionContract = await createNewQuestionContract(address)
        setState({...state, ...{QuestionContract: newQuestionContract}})
    }

    const MainServices = {
        get_user: async(address) => {

            try{                
                if (!state.MainContract) throw ""
                if(!address) throw new Error("Address is empty")

                const response = await state.MainContract.methods.users(address).call()
                if (Web3.utils.toBN(response).isZero()) return { success: false, message: "User is not registered" }
                return { success: true, data: response }

            }catch(err){
                console.log("Error in getting user address: ",err)
                return { success: false, message: err.message }
            }
        },
        register: async(name, account) => {
            try {
                if (!state.MainContract) return { success: true, data: ""}
                console.log(`Registering ${name} on ${account}`)
                console.log('Main contract: ', state.MainContract)
                const response =
                    await state.MainContract.methods.register(name).send({
                        gas: 3000000,
                        from: account
                    })
                return { success: true, data: response }
            } catch (err) {
                console.log("Error in registeration:", err)
                return { success: false, message: err.message }
            }
        }
    }
    
    const UserServices = {
        get_user_details: async(UserContract = state.UserContract) => {
            try {
                if (!UserContract) return { success: true, data: ''}
                console.log("Getting user details for contract: ", UserContract)
                const response = await UserContract.methods.name().call()
                return { success: true, data: response }
            } catch (err) {
                console.log("Error in fetching user details: \n", err)
                return { success: false, message: err.message }
            }
        },
        get_questions: async () =>{
            try{
                if(!state.UserContract) return { success: true, data: ''}
                
                //Get the address of questions
                const response = await state.UserContract.methods.get_questions().call()
                console.log(response)
            
                return { success: true, data: {questions: response} }
            }catch (err) {
                console.log("Error in fetching questions of user: \n", err)
                return { success: false, message: err.message}
            }
        },
        add_question: async(_questionText) => {
            try{
                if(!state.UserContract) return { success: true, data: ''}
                const response = await state.UserContract.methods.add_question(_questionText).send({
                    from: account,
                    gas: 3000000
                })
                console.log(response)
                await UserServices.get_questions()
                return { success: true, data: response}
            }catch (err) {
                console.log("Error in adding question: \n", err)
                return { success: false, message: err.message }
            }
        }
    }

    const QuestionServices = {
        get_question_text: async(QuestionAddress) =>{
            try{
                //create a contract instance from the address
                const createdQuestionContract = await createNewQuestionContract(QuestionAddress)
                if(!createdQuestionContract.success) throw new Error(createdQuestionContract.message)

                //get the text from the contract instance
                const QuestionContract = createdQuestionContract.data.QuestionContract
                const response = await QuestionContract.methods.question().call()
                return { success: true, data: response }
            }catch (err) {
                console.log("Error in getting question: \n", err)
                return { success: false, message: err.message}
            }
        },
        get_question_author: async(QuestionAddress) =>{
            try{
                //create a contract instance of the question
                const createdQuestionContract = await createNewQuestionContract(QuestionAddress)
                const QuestionContract = createdQuestionContract.data.QuestionContract
                const authorAddress = await QuestionContract.methods.author().call()

                //get the details of the author
                const createdAuthorContract = await createNewUserContract(authorAddress)
                const authorContract = createdAuthorContract.data.authorContractContract
                const response = await UserServices.get_user_details(authorContract)

                return { success: true, data: response.data }
            }catch (err) {
                console.log("Error in getting user details for the question: \n", err)
                return { success: false, message: err.message}
            }
        },
        get_question_details: async(QuestionAddress) =>{
            try{
                const questionTextResponse = await QuestionServices.get_question_text(QuestionAddress)
                const authorResponse = await QuestionServices.get_question_author(QuestionAddress)
                // const author = await QuestionContract.methods.author().call()
                // const author = await QuestionServices.get_question_author(QuestionContract)

                return { 
                    success:true, 
                    data:{
                        question: questionTextResponse.data,
                        author: authorResponse.data
                    }
                }
            }catch (err) {
                console.log("Error in getting question details: \n",err)
                return { success: false, message: err.message}
            }
        },
        get_question_list: async(_questionAddresses) => {
            try{
                let questions = []
                if(!_questionAddresses) return { success: true, data: {questions}}
                for await (let _address of _questionAddresses){
                    const questionDetailsResponse = await QuestionServices.get_question_details(_address)
                    questions.push(questionDetailsResponse.data)
                }
                return { success: true, data: {questions}}
            }catch (err) {
                console.log("Error in getting question list: \n", err)
                return { success: false, message: err.message}
            }
        }
    }

    useEffect(async () => {
        //Get the info from the contracts
        const contractResult = Utils.GetContracts()
        updateContract(contractResult.data)  
        
        // Get the account of the user
        const accountResponse = await Utils.Connect()
        updateAuth({account: accountResponse.data.account})

    },[])
    
    useEffect(async()=>{
        if(!account) return
        
        const userResponse = await MainServices.get_user(account)
        if(userResponse.success){
            
            authenticate(account)
            await updateUserContract(userResponse.data)
        }     
        
    }, [account])

    return(
        <ContractContext.Provider 
            value={{...state,...{
                updateContract,
                updateUserContract,
                getUpdatedContracts,
                MainServices,
                UserServices,
                updateQuestions,
                QuestionServices
            }        
        }}>
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractContextProvider
