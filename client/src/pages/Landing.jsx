import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import RegistrationBox from '../components/RegistrationBox';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {ReactComponent as LandingVector} from '../static/assets/Landing.svg'
import Typography from '@mui/material/Typography'
import '../static/styles/Landing.scss'

function Landing() {

    const navigate = useNavigate()
    const {account, authenticated } = React.useContext(AuthContext)
    
    useEffect(()=>{     
        if (authenticated) navigate('/dashboard')
    }, [account, authenticated, navigate])

    return (
        <Container maxWidth={false} className="landing">
            <Grid container maxHeight={false}>
                <Grid item lg={6} sm={12} className="landing-left">
                    <Typography variant="h1" className="landing-left-heading">De-Quora</Typography>
                    <Typography variant="h3" className="landing-left-subheading">A decentralized discussion forum</Typography>
                   <RegistrationBox></RegistrationBox>
                </Grid>
                <Grid item lg={6} sm={12} className="landing-right">
                   <LandingVector></LandingVector>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Landing