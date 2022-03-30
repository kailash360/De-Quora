import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {ContractContext} from '../context/ContractContext'
import QuestionList from '../components/QuestionList'
import Button from '@mui/material/Button'

function Dashboard() {

  const {account, authenticated} = React.useContext(AuthContext)
  const {Services} = React.useContext(ContractContext)
  const navigate = useNavigate()

  const [name, setName] = useState()

  
  useEffect(() => {
    (async()=>{
      if(!Services || !account) return
  
      const response = await Services.get_user_details(account)   
      console.log(response)
      setName(response.data.name)
    })();
  },[account, Services])

  useEffect(() => {
    if(account && !authenticated) navigate('/',{replace:true})
  },[account, authenticated])

  return (<>
    <div>Dashboard</div>
    <p>Name: {name}</p>
    <QuestionList></QuestionList>
    <Button variant="outlined" onClick={() => {navigate('/new')}}>+ New Question</Button>
    </>
  )
}

export default Dashboard