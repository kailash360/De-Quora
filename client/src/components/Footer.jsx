import {Container, Typography, Link} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import '../static/styles/Footer.scss'

function Footer(){
    return(window.location.pathname != "/" &&
        <Container maxWidth={false} fullWidth className='footer'>
            <Typography variant='h6' className='footer-content'>
                Made by 
                <span className='name'> Kailash Kejriwal</span> &nbsp;
                <Link href="https://www.github.com/kailash360" target="_blank" color='#fff' underline='none'> <GitHubIcon fontSize='large' style={{verticalAlign: 'middle'}}/></Link>
            </Typography>
        </Container>
    )
}

export default Footer