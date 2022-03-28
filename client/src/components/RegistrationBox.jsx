import React from 'react'
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {AuthContext} from '../context/AuthContext';
import {ContractContext} from '../context/ContractContext';
import Utils from '../utils'

function RegistrationBox() {
    
    // const [MainServices] = useMainServices()
    const {MainServices, updateUserContract} = React.useContext(ContractContext)
    const {account, authenticate} = React.useContext(AuthContext)
    
    const navigate = useNavigate()
    
    const [name, setName] = React.useState('')
    const handleRegister = async()=>{
        if(!name) return

        const registrationResponse = await MainServices.register(name,account)
        console.log(registrationResponse)

        if(!registrationResponse.success) {
            console.log(registrationResponse.message)
            return
        }
        
        const connectionResult = await Utils.Connect()
        authenticate(connectionResult.data.account)

        updateUserContract(registrationResponse.data.events['0'].address)

        navigate('/',{replace:true})
    }

    return (<>
        <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={(e)=>{setName(e.target.value)}} />
        <Button variant="contained" onClick={handleRegister}>Register</Button>
        </>
    )
}

export default RegistrationBox