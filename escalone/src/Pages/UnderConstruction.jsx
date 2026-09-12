import { Link } from "react-router-dom"
import Header from '../Components/sections/header'
import Footer from '../Components/sections/footer'

export default function UnderConstruction() {
  return (
    <>
      <Header />
      <main className="flex-grow-1">
        <div className="container text-center mt-5">
          <h1>Página en construcción</h1>
          <i className="fa-solid fa-person-digging fa-2x"></i>
          <p>Esta página aún está en desarrollo. ¡Vuelve pronto! <Link to="/">click</Link></p>
        </div>
      </main>
      <Footer />
    </>
  )
}