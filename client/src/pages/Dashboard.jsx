import React,{useEffect, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import {ContractContext} from '../context/ContractContext'
// import AddQuestion from '../components/AddQuestion'
// import QuestionList from '../components/QuestionList'

function Dashboard() {

  const {account} = React.useContext(AuthContext)
  const {Services} = React.useContext(ContractContext)

  const [name, setName] = useState()

  useEffect(() => {
    (async()=>{
      if(!Services || !account) return
  
      const response = await Services.get_user_details(account)   
      console.log(response)
      setName(response.data.name)
    })();
  },[account, Services])

  return (<>
    <div>Dashboard</div>
    <p>Name: {name}</p>
    {/* <AddQuestion/> */}
    {/* <QuestionList></QuestionList> */}
    </>
  )
}

export default Dashboard