import ContactoForm from "../Components/contacto/ContactoForm";
import Ubicacion from "../Components/contacto/Ubicación";
import Footer from "../Components/sections/footer";
import Header from "../Components/sections/header";

export default function Contacto() {
    return(
        <> 
        <Header/>
        <ContactoForm/>
        <hr className="container"/>
        <Ubicacion/>
        <Footer/>
        </>
    )

}