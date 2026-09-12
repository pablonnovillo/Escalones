import { Link } from "react-router-dom"
import Header from '../Components/sections/header'
import Footer from '../Components/sections/footer'
import PagoFallido from "../Components/payments/PagoFallido"

export default function TransicionRechazada() {
  return (
    <>
      <Header />
      <PagoFallido />
      <Footer />
    </>
  )
}