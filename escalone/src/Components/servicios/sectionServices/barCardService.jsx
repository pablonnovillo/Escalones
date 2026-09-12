import { Link } from "react-router-dom"

const BarCardService = () => {
    return (
        <div className="col-lg-4 col-md-6 my-2">
            <div className="d-flex flex-md-column border">
                <img
                    src="images/services/estudio.jpg"
                    className="img_resize_custom object-fit-cover"
                    alt="coworking"
                />
                <div className="card-body bg-light">
                    <section className="mx-3 text-start">
                        <h5 className="card-title fw-bolder py-2">Espacio coworking</h5>
                        <p className="card-text">
                            Acceso a espacios de trabajo compartidos y cómodos
                        </p>
                        <p className="fw-bold">
                            Se cobrará un 50% por adelantado para reservar
                        </p>
                        <div className="d-md-none">
                            <hr />
                            <Link
                                to="co-working"
                                className="btn btn-primary fw-bolder w-100"
                            >
                                Ver disponibilidad
                            </Link>
                        </div>
                    </section>
                    <div className="d-none d-md-block">
                        <Link
                            to="co-working"
                            className="btn btn-primary fw-bolder w-100"
                        >
                            Ver disponibilidad
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BarCardService