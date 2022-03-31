import React from 'react'
import '../static/styles/Navbar.scss'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';

function Navbar(){

    return(
        <Container className="navbar" fullWidth maxWidth={false}>
            <Typography type="h1" className="navbar-heading">
                De-Quora
            </Typography>
        </Container>
    )

}

export default Navbar;