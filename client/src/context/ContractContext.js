import {createContext, useState} from 'react'

export const ContractContext = createContext()

function ContractContextProvider(props){

    const [state, setState] = useState({
        MainContract: null,
        UserContract: null,
        QuestionContract: null
    })

    const updateContract = (data)=>{
        setState({...state,...data})
    }

    return(
        <ContractContext.Provider 
            value={{...state,...{
                updateContract
            }        
        }}>
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractContextProvider
