import { Link } from "react-router-dom"

const Slide = () => {
    return (
        <>
            <section className="slide position-relative w-100">
                <img
                    src="images/portada3.jpg"
                    alt="portada"
                    className="position-absolute h-100 w-100 z-0 object-fit-cover"
                />
                <section className="slide_section position-absolute top-50 start-50 translate-middle z-2 h-100 w-100">
                    <section className="d-flex flex-wrap flex-column align-items-center justify-content-center h-100">
                        <article className="slide_title text-center text-white">
                            <h1>
                                <img src="images/logo1.png" alt="escalones" className="slide_logo" />
                            </h1>
                            <hr className="container border-white" />
                            <h2>
                                Imprenta, bar, espacio creativo
                                <br />
                                Abierto 24 horas
                            </h2>
                            <p className="fs-4">
                                Pedí tus impresiones, reservá tu espacio o pasa a jugar un rato
                            </p>
                        </article>

                        <article className="slide_enlaces d-flex flex-wrap w-50 justify-content-center justify-content-md-between">
                            <Link to="/servicios" className="btn btn-primary fs-4 m-2">
                                Hacé tu pedido
                            </Link>
                            <Link to="/servicios/reservas" className="btn btn-light fs-4 m-2">
                                Ir a la tienda
                            </Link>
                        </article>
                    </section>
                </section>
            </section>
        </>
    )
}

export default Slide