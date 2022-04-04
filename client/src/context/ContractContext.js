import Web3 from 'web3'
import {useEffect} from 'react'
import {createContext, useState, useContext} from 'react'
import { AuthContext } from './AuthContext'
import Utils from '../utils'

export const ContractContext = createContext()

function ContractContextProvider(props){

    const {account, updateAuth, authenticate} = useContext(AuthContext)

    const [state, setState] = useState({
        DeQuora: null,
        Questions: []
    })

    const getUpdatedContracts = () => state

    const updateContract = (data)=>{
        setState({...state,...data})
    }

    const Services = {
        get_user: async(address) => {
            try{                
                console.log(state)
                //check if address is not empty
                if(!address) throw new Error("Address is empty")

                //get the user to see if he/she exist or not
                const response = await state.DeQuora.methods.users(address).call()
                
                // Return error if user does not exist
                if (Web3.utils.toBN(response.account).isZero()) throw new Error("User is not registered")
                return { success: true, data: response }

            }catch(err){
                console.log("Error in getting user: ",err)
                return { success: false, message: err.message }
            }
        },
        register: async(name, account) => {
            try {
                console.log(`Registering ${name} on ${account}`)
                console.log('Main contract: ', state.MainContract)
                const response =
                    await state.DeQuora.methods.create_user(name).send({
                        gas: 3000000,
                        from: account
                    })
                return { success: true, data: response }
            } catch (err) {
                console.log("Error in registeration:", err)
                return { success: false, message: err.message }
            }
        },
        get_user_details: async(userAddress) => {
            try {
                console.log('Getting user for address:', userAddress)
                const userResponse = await state.DeQuora.methods.get_user_details(userAddress).call()
                const questionResponse = await state.DeQuora.methods.get_all_questions().call()
                const data = {
                    user: userResponse,
                    questions: questionResponse.filter(question => question.author_address == userAddress),
                }
                return { success: true, data }
            } catch (err) {
                console.log("Error in fetching user details: \n", err)
                return { success: false, message: err.message }
            }
        },
        add_question: async(_question) => {
            try{
                const response = await state.DeQuora.methods.add_question(_question).send({
                    gas: 3000000,
                    from: account
                })

                return { success: true, data: response }

            }catch (err) {
                console.log("Error in creating question: \n", err)
                return { success: false, message: err.message}
            }
        },
        get_all_questions: async()=>{
            try{
                if(!state.DeQuora) return { success:true, data:{}}
                const allQuestions = await state.DeQuora.methods.get_all_questions().call()
                return { success: true, data:{questions: allQuestions} }
            }catch (err) {
                console.log("Error in getting all questions: \n", err)
                return { success: false, message: err.message }
            }
        },
        get_questions: async() => {
            try{
                if(!state.DeQuora) return {success: true, data:{}}
                const totalQuestions = await state.DeQuora.methods.total_questions().call()
                console.log('Response of getting total questions: ',totalQuestions)

                let questions = [];
                for(let i = 0; i < totalQuestions; i++){
                    const questionResponse = await state.DeQuora.methods.questions(i).call()
                    console.log(`Question ${i}: `, questionResponse)
                    questions.push(questionResponse)
                }
                return { success:true, data: {questions}}
            }catch (err) {
                console.log("Error in getting questions: \n", err)
                return { success: false, message: err.message }
            }
        },
        get_question: async(_question_id) => {
            try{
                if(!state.DeQuora) return { success:true, data: {}}
                const response = await state.DeQuora.methods.get_question(_question_id).call();
                console.log(`Response of getting question of id ${_question_id}: `, response)
                return { success: true, data: {question: response[0], answers: response[1]} }

            }catch (err) {
                console.log(`Error in getting question of id ${_question_id}: \n`, err)
                return { success: false, message: err.message }
            }
        },
        add_answer: async(_question_id, _answer) =>{
            try{
                if(!state.DeQuora) return { success:true, data:{}}
                console.log(`Adding answer ${_answer} for question ${_question_id}`)
                const addAnswerResponse = await state.DeQuora.methods.add_answer(_question_id, _answer).send({
                    from: account,
                    gas: 3000000
                })
                console.log(addAnswerResponse)
                return { success: true, data:{answers: addAnswerResponse}}
            }catch(err){
                console.log('Error in adding answer: ', err)
                return { success: false, message: err.message }
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
        
        const userResponse = await Services.get_user(account)
        if(userResponse.success){
            authenticate(account)
        }else{
            if(window.location.pathname !== "/") window.location.href = "/"
        }
        
    }, [account])

    return(
        <ContractContext.Provider 
            value={{...state,...{
                updateContract,
                getUpdatedContracts,
                Services,
            }        
        }}>
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractContextProvider
