import React from 'react'
import { Container, Grid, Box, Typography, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ContractContext } from '../context/ContractContext'
import { AuthContext } from '../context/AuthContext'
import '../static/styles/Profile.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventIcon from '@mui/icons-material/Event';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function Profile() {

  const params = useParams()
  const { DeQuora, Services } = React.useContext(ContractContext)
  const { account } = React.useContext(AuthContext)

  const [profile, setProfile] = React.useState({})

  const getUserDetails = async (_account) => {
    if (!_account) return

    const userDetailsResponse = await Services.get_user_details(_account)
    console.log(userDetailsResponse)
    if (!userDetailsResponse.success) return

    setProfile(userDetailsResponse.data)
  }

  React.useEffect(() => {
    getUserDetails(params.account)
    console.log({ params })
  }, [DeQuora])

  return (
    <Container maxWidth={false} className='profile'>
      <Container className='profile-details' maxWidth={false}>
        <Grid container>
          <Grid item lg={4} sm={12}>
            <Box 
              sx={{
                width: 'fit-content',
                height: 'auto',
                marginLeft: 'auto'
              }}
            >
              <img src={`https://www.robohash.org/${profile.account}`} className='profile-details-image'/>
            </Box>
          </Grid>
          <Grid item lg={8} sm={12} direction='column' justifyContent='center' className='profile-details-info'>
            <Box sx={{padding: '5em'}}>
              <Typography variant='h6' fontSize='1.3em'> <AccountCircleIcon/> {profile.name}</Typography>
              <Typography variant='h6' fontSize='1.3em'> <AccountBalanceWalletIcon/> {profile.account}</Typography>
              <Typography variant='h6' fontSize='1.3em'> <EventIcon/> {profile.joined_on}</Typography>
              <Button variant='contained' startIcon={<CurrencyRupeeIcon/>} fontSize='1.5em' style={{marginTop: '2em'}}>PAY</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default Profile;