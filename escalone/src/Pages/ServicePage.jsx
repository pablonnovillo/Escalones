import Header from "../Components/sections/header"
import {Routes, Route} from "react-router-dom"
import Services from "../Components/servicios/services"
import EncargoImpresiones from "../Components/servicios/EncargoImpresiones"
//import Juegos from "../Components/servicios/Juegos"
import ReservasTurnos from "../Components/servicios/ReservasTurnos"
import Footer from "../Components/sections/footer"
import ConfirmarServicio from "../Components/servicios/payments/ConfirmarServicio"

export default function Service() {

    return (
        <>
        <Header />
            <Routes>
                <Route index element={<Services />} />
                <Route path="impresiones" element={<EncargoImpresiones />} />
                <Route path="co-working" element={<ReservasTurnos />} />
                <Route path="juegos" element={<ReservasTurnos />} />
                {/*Rutas adicionales para confirmar turnos e impresiones*/}
                <Route path="confirmar-servicio" element={<ConfirmarServicio />} />
            </Routes>
        <Footer />
        </>        
    )
}