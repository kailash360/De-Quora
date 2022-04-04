import React from 'react'
import '../static/styles/Navbar.scss'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { AuthContext } from '../context/AuthContext'
import Grid from '@mui/material/Grid'
import {Link as RouterLink} from 'react-router-dom'

function Navbar() {

  const { account } = React.useContext(AuthContext)

  const hanldeProfileClick = ()=>{

  }

  return (window.location.pathname != "/" &&
    <Container className="navbar" fullWidth maxWidth={false}>
      <Grid container>
        <Grid item lg={11}>
          <Link href="/dashboard" color="white" underline="none" className='navbar-text'>
            <Typography variant="h4" className="navbar-heading">De-Quora</Typography>
          </Link>
        </Grid>
        <Grid item lg={1}>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment className='navbar-menu'>
                <IconButton variant="outlined" {...bindTrigger(popupState)} className='navbar-menu-button'>
                  <Avatar src={`https://wwww.robohash.org/${account}`}></Avatar>
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem> <Link href={`/profile/${account}`} underline='none' color='black'>Profile</Link> </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </Grid>
      </Grid>
    </Container>
  )

}

export default Navbar;