import { Link } from "react-router-dom"
import Header from '../Components/sections/header'
import Footer from '../Components/sections/footer'
import PagoVerificado from "../Components/payments/pagoVerificado"

export default function TransicionExitosa() {
  return (
    <>
      <Header />
      <PagoVerificado/>    
      <Footer />
    </>
  )
}