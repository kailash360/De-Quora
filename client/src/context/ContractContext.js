import Web3 from 'web3'
import {useEffect} from 'react'
import {createContext, useState, useContext} from 'react'
import { AuthContext } from './AuthContext'
import {createNewUserContract} from '../utils/GetContracts'
import Utils from '../utils'

export const ContractContext = createContext()

function ContractContextProvider(props){

    const {account, updateAuth, authenticate} = useContext(AuthContext)

    const [state, setState] = useState({
        MainContract: null,
        UserContract: null,
        QuestionContract: null
    })

    const getUpdatedContracts = () => state

    const updateContract = (data)=>{
        setState({...state,...data})
    }

    const updateUserContract = async (address)=>{
        const newUserContract = await createNewUserContract(address)
        setState({...state,...{UserContract: newUserContract.data.UserContract}})
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
                const response =
                    await state.MainContract.methods.register(name).send({
                        gas: 2000000,
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
        get_user_details: async() => {
            try {
                if (!state.UserContract) return { success: true, data: ''}
                const response = await state.UserContract.methods.name().call()
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
                UserServices
            }        
        }}>
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractContextProvider
