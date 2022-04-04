import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Grid, Container, Typography, Link} from '@mui/material'
import {AuthContext} from '../context/AuthContext'
import {ContractContext} from '../context/ContractContext'
import QuestionList from '../components/QuestionList'
import Button from '@mui/material/Button'
import {ReactComponent as DashboardTopVector} from '../static/assets/Dashboard_Top.svg'
import '../static/styles/Dashboard.scss'

function Dashboard() {

  const {account, authenticated} = React.useContext(AuthContext)
  const {Services} = React.useContext(ContractContext)
  const navigate = useNavigate()

  const [name, setName] = useState()
  const [loading, setLoading] = useState(false)
  
  const getDetails = async()=>{
    if(!Services || !account) return

    const response = await Services.get_user_details(account)   
    setName(response.data.user.name)
  }

  useEffect(() => {
    setLoading(true)
    getDetails();
    setLoading(false)
  },[account, Services])

  return (
    loading? <p>Loading...</p>:
  <>
    <Container maxWidth={false} className='dashboard'>
      <Grid container spacing={8} className="dashboard-top" justifyContent="center">
        <Grid item lg={7} sm={12}>
          <Typography variant="h3" className="dashboard-top-text">Welcome <strong>{name}</strong> </Typography>
          <Typography variant="p" fontSize="large">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi totam tenetur modi magni perferendis? Cumque mollitia eligendi rem non! Quas quibusdam ex impedit incidunt iste dicta quisquam iure voluptas voluptates!
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi totam tenetur modi magni perferendis? Cumque mollitia eligendi rem non! Quas quibusdam ex impedit incidunt iste dicta quisquam iure voluptas voluptates!
          </Typography>
        </Grid>
        <Grid item lg={4} sm={12}> <DashboardTopVector className="dashboard-top-vector"></DashboardTopVector> </Grid>
      </Grid>
      <Container justifyContent='center' className='dashboard-mid' maxWidth="md">
        <Typography variant='h5' textAlign='center'>
          Start your own discussion and lead it by 
          <Link href="/new" underline="none" fontWeight="bold" className="dashboard-mid-link"> creating a question here</Link>
          <br/>
          Want to contribute already? Search for your desired question below and start contributing in the discussion right away by answering them
        </Typography>
      </Container>
      <QuestionList></QuestionList>
    </Container>
  </>
  )
}

export default Dashboard