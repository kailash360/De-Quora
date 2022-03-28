import React,{useEffect, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import {ContractContext} from '../context/ContractContext'
import AddQuestion from '../components/AddQuestion'
import QuestionList from '../components/QuestionList'

function Dashboard() {

  const {account} = React.useContext(AuthContext)
  const {UserServices} = React.useContext(ContractContext)

  const [name, setName] = useState()

  useEffect(() => {
    (async()=>{
      if(!UserServices) return
  
      const reponse = await UserServices.get_user_details()   
      setName(reponse.data)
    })();
  },[account, UserServices])

  return (<>
    <div>Dashboard</div>
    <p>Name: {name}</p>
    <AddQuestion/>
    <QuestionList></QuestionList>
    </>
  )
}

export default Dashboard