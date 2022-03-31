import {useState, useEffect} from 'react'
import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard'
import NewQuestion from './pages/NewQuestion'
import Question from './pages/Question'
import Profile from './pages/Profile'
import AuthContextProvider from './context/AuthContext'
import ContractContextProvider from './context/ContractContext'
import ThemeContextProvider from './context/ThemeContext'
import './static/styles/index.scss'
import { Outlet } from 'react-router';

function Decorators(){
  return(<>
    <Navbar></Navbar>
    <Outlet/>
    <Footer></Footer>
  </>)
}

function App() {

  return (
  <ThemeContextProvider>
    <AuthContextProvider>
      <ContractContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Outlet/>}>
              <Route path="/" exact element={<Landing />}/>
            </Route>
            <Route element={<Decorators/>}>
              <Route path="/dashboard" element={<Dashboard />}/>      
              <Route path="/new" element={<NewQuestion />}/> 
              <Route path="/question/:questionId" element={<Question />}/> 
              <Route path="/profile/:account" element={<Profile />}/> 
            </Route> 
          </Routes>
        </BrowserRouter>
      </ContractContextProvider>
    </AuthContextProvider>
  </ThemeContextProvider>
  );
}

export default App;
