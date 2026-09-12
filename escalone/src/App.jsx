//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from './Pages/IndexPage'
import Service from './Pages/ServicePage'
import Nosotros from './Pages/NosotrosPage'
//import IniciarSesion from './Pages/IniciarSesionPage'
import Authentication from './Pages/AuthenticationPage'

import UnderConstruction from './Pages/UnderConstruction'
import Contacto from './Pages/ContactoPage'
import PublicRoute from './Components/login/PublicRoute'
import ManagementAccount from './Pages/ManagementAccountPage'
import ResetPassword from './Pages/ResetPassword'
import Store from './Pages/StorePage'
import TransicionExitosa from './Pages/TransicionExitosaPage'
import TransicionRechazada from './Pages/TransicionRechazada'
import ProtectedVerifiedPay from './Components/payments/ProtectedVerifiedPay'


function App() {
  //const [count, setCount] = useState(0)
  return (
    <>          
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/tienda/*' element={<Store />} />          
          <Route path='/servicios/*' element={<Service />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/contacto' element={<Contacto/>}/>        
          <Route path='/auth/*' element={<Authentication />} />

          
          <Route path='/olvidar-password' element={<PublicRoute><ManagementAccount /></PublicRoute>} />
          <Route path='/reset-password' element={<PublicRoute><ResetPassword/></PublicRoute>} />
          <Route path='/en-mantenimiento' element={<UnderConstruction />} />
          <Route path='/pago-verificado' element={<ProtectedVerifiedPay><TransicionExitosa/></ProtectedVerifiedPay>} />
          <Route path='/pago-rechazado' element={<ProtectedVerifiedPay><TransicionRechazada/></ProtectedVerifiedPay>} />
        </Routes>
      </Router>    
    </>
  )
}

export default App
