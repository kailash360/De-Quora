import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import RegistrationBox from '../components/RegistrationBox';

function Landing() {

    const navigate = useNavigate()
    const {account, authenticated } = React.useContext(AuthContext)
    
    useEffect(()=>{     
        if (authenticated) navigate('/dashboard')
    }, [account, authenticated, navigate])

    return (
        <div>
            <p>Landing Page</p>
            <RegistrationBox></RegistrationBox>
        </div>
    )
}

export default Landing