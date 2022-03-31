import React from 'react'
import '../static/styles/Navbar.scss'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Navbar(){

    return(
        <Container className="navbar" fullWidth maxWidth={false}>
            <Link href="/dashboard" color="white" underline="none"><Typography variant="h4" className="navbar-heading">De-Quora</Typography></Link>
        </Container>
    )

}

export default Navbar;