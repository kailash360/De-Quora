import './App.css';
import Navbar from './components/Navbar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard'
import NewQuestion from './pages/NewQuestion'
import Question from './pages/Question'
import AuthContextProvider from './context/AuthContext'
import ContractContextProvider from './context/ContractContext'

function App() {

  return (
  <>
    <AuthContextProvider>
      <ContractContextProvider>
        <Navbar></Navbar>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/dashboard" element={<Dashboard />}/>      
            <Route path="/new" element={<NewQuestion />}/> 
            <Route path="/question/:questionId" element={<Question />}/> 
          </Routes>
        </BrowserRouter>
      </ContractContextProvider>
    </AuthContextProvider>
  </>
  );
}

export default App;
