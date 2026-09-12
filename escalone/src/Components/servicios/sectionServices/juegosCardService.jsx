import { Link } from "react-router-dom"

const JuegosCardService = () => {
    return (
        <div className="col-lg-4 col-md-6 my-2 offset-md-3 offset-lg-0">
            <div className="d-flex flex-md-column border">
                <img
                    src="images/services/juegos.jpg"
                    className="img_resize_custom object-fit-cover"
                    alt="juegos"
                />
                <div className="card-body bg-light">
                    <section className="mx-3 text-start">
                        <h5 className="card-title fw-bolder py-2">Juegos recreativos</h5>
                        <p className="card-text">
                            Disfrutá de los juegos en un ambiente divertido
                        </p>
                        <p className="fw-bold">
                            Se cobrará un 50% por adelantado para reservar
                        </p>
                        <div className="d-md-none">
                            <hr />
                            <Link
                                to="juegos"
                                className="btn btn-primary fw-bolder w-100"
                            >
                                Ver disponibilidad
                            </Link>
                        </div>
                    </section>
                    <div className="d-none d-md-block">
                        <Link
                            to="juegos"
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

export default JuegosCardService