import { createContext, useState } from "react"

export const AuthContext = createContext()

function AuthContextProvider(props){

    const [state,setState] = useState({
        authenticated: false,
        account: '',
        userAddress: ''
    })

    const authenticate = (_account)=>{
        setState({...state,...{
                    authenticated:true,
                    account:_account
                }
            })
       
    }

    const deauthenticate = ()=>{
        setState({...state,...{
                    authenticated:false,
                    account:''
                }
            })
    }

    const updateAuth = (data)=>{
        setState({...state,...data})
    }

    return(
        <AuthContext.Provider 
            value={{...state,...{
                authenticate,
                deauthenticate,
                updateAuth
            }}}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;