import './App.css'
import Routing from './Components/Routing/Routing'
import { AuthProvider } from './context/AuthContext'
import {ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
  <AuthProvider>
      <Routing />
      <ToastContainer
    
limit={6}

      />

    </AuthProvider>   
     </>
  )
}

export default App
