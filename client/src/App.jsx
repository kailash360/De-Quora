import {useContext, useState, useEffect} from 'react'
import {AuthContext} from './context/AuthContext'
import {ContractContext} from './context/ContractContext'
import './App.css';
import Navbar from './components/Navbar'
import Utils from './utils'


function App() {

  const { authenticate } = useContext(AuthContext)
  const { updateContract } = useContext(ContractContext)
  
  useEffect(async()=>{
    // Get the account and authenticate the user
    const connectionResult = await Utils.Connect()
    authenticate(connectionResult.data.account)

    //Get the info from the contracts
    const contractResult = await Utils.GetContracts()
    updateContract(contractResult.data)

    console.log(contractResult)

  },[window.ethereum.accounts])

  



  return (
    <Navbar></Navbar>
  );
}

export default App;
