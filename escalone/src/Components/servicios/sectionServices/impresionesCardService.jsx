import { Link } from "react-router-dom"

const ImpresionesCardService = () => {
    return (
        <div className="col-lg-4 col-md-6 my-2">
            <div className="d-flex flex-md-column border">
                <img
                    src="images/services/impresiones.jpg"
                    className="img_resize_custom object-fit-cover"
                    alt="impresiones"
                />
                <div className="card-body bg-light">
                    <section className="mx-3 text-start">
                        <h5 className="card-title fw-bolder py-2">Impresiones 24hs</h5>
                        <p className="card-text">
                            Servicio de impresion disponible las 24 horas del día
                        </p>
                        <p className="fw-bold">
                            Se cobrará un 50% por adelantado para reservar
                        </p>
                        <div className="d-md-none">
                            <hr />
                            <Link
                                to="impresiones"
                                className="btn btn-primary fw-bolder w-100"
                            >
                                Encargar Impresión
                            </Link>
                        </div>
                    </section>
                    <div className="d-none d-md-block">
                        <Link
                            to="impresiones"
                            className="btn btn-primary fw-bolder w-100"
                        >
                            Encargar Impresión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImpresionesCardService