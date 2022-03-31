import React from 'react'
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {AuthContext} from '../context/AuthContext';
import {ContractContext} from '../context/ContractContext';
import Utils from '../utils'
import Container from '@mui/material/Container'

function RegistrationBox() {
    
    // const [MainServices] = useMainServices()
    const {Services} = React.useContext(ContractContext)
    const {account, authenticate} = React.useContext(AuthContext)
    
    const navigate = useNavigate()
    
    const [name, setName] = React.useState('')
    const handleRegister = async()=>{
        if(!name) return

        const registrationResponse = await Services.register(name,account)
        console.log(registrationResponse)

        if(!registrationResponse.success) {
            console.log(registrationResponse.message)
            return
        }
        
        const connectionResult = await Utils.Connect()
        authenticate(connectionResult.data.account)

        navigate('/',{replace:true})
    }

    return (
        <Container maxWidth={false} className="landing-left-registration-box">
            <TextField id="outlined-basic" fullWidth placeholder="Enter your name here" variant="outlined" className="input" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <Button variant="contained" className="button" onClick={handleRegister}>Get Started</Button>
        </Container>        
    )
}

export default RegistrationBox