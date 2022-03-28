import React,{useEffect} from 'react'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import RegistrationBox from '../components/RegistrationBox';

function Landing() {

    const navigate = useNavigate()
    const {account, authenticated } = React.useContext(AuthContext)
    
    useEffect(async()=>{     
        if (authenticated) navigate('/dashboard')
    }, [account, authenticated])

    return (
        <div>
            Landing Page
            <Button onClick={() => {navigate('/register')}} variant="outlined">
                Get Started
            </Button>

            <RegistrationBox></RegistrationBox>
        </div>
    )
}

export default Landing