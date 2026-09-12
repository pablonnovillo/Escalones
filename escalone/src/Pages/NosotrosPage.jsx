import Header from "../Components/sections/header"
import NuestraHistoria from "../Components/nosotros/NuestraHistoria"
import Fundadores from "../Components/nosotros/Fundadores"
import NuestroValores from "../Components/nosotros/NuestrosValores"
import Footer from "../Components/sections/footer"
import PublicidadEscalone from "../Components/nosotros/PublicidadEscalone"

export default function Nosotros() {

    return (
        <>
        <Header />
        <div className="container">
            <NuestraHistoria />
            <hr />
            <Fundadores />
            <NuestroValores />
        </div>
        <PublicidadEscalone />
        <Footer />
        </>        
    )
}