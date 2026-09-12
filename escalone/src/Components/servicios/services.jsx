import { Link } from "react-router-dom"
import PresentationServices from "./sectionServices/presentationService";
import ImpresionesCardService from "./sectionServices/impresionesCardService";
import BarCardService from "./sectionServices/barCardService";
import JuegosCardService from "./sectionServices/juegosCardService";

const Services = () => {
    return (
        <>
            <section id="services" className="my-4">
                <PresentationServices />               
            </section>
            <hr className="container my-5 border border-dark border-1" />
            <section className="my-4">
                <section className="text-center">
                    <h2 className="my-3 fw-bolder h1">Reservas disponibles</h2>
                    <p className="text-secondary">
                        Selecciona tu opción: coworking, bar o juegos y elige el día y horario deseado
                    </p>
                    <section>
                        <div className="container">
                            <div className="row my-4">
                                {/* Impresiones */}
                                <ImpresionesCardService />
                                {/* Coworking */}                               
                                <BarCardService />
                                {/* Juegos */}                                
                                <JuegosCardService />

                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Services;