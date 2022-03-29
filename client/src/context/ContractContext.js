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
                const response = await state.DeQuora.methods.users(userAddress).call()
                return { success: true, data: response }
            } catch (err) {
                console.log("Error in fetching user details: \n", err)
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
