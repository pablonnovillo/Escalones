const PresentationServices = () => {
    return (
        <section className="text-center">
            <h1 className="my-3 fw-bolder">Nuestro Servicios</h1>
            <p className="text-secondary">
                Descubre todo lo que ofrecemos en nuestra impreta-bar y espacios de coworking
            </p>
            <section>
                <div className="container">
                    <hr className="border border-dark border-1" />
                    <div className="row">
                        <div className="col-lg-6 my-2">
                            <div className="card bg-dark-subtle">
                                <div className="card-body">
                                    <section className="mx-3 text-start">
                                        <h5 className="card-title fw-bolder text-dark">
                                            Espacios de Coworking
                                        </h5>
                                        <p className="card-text text-secondary">
                                            Disfrutá de un ambiente moderno y funcional, ideal para trabajar y colaborar con otros
                                            profesionales.
                                        </p>
                                    </section>
                                </div>
                                <br />
                                <img
                                    src="images/services/impresora.jpg"
                                    className="card-img-top img_height_500 object-fit-cover"
                                    alt="impresora"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 my-2">
                            <div className="card bg-dark-subtle">
                                <div className="card-body">
                                    <section className="mx-3 text-start">
                                        <h5 className="card-title fw-bolder text-dark">Imprenta 24hs</h5>
                                        <p className="card-text text-secondary">
                                            Ofrecemos servicios de impresión de alta calidad disponibles las 24 horas para tus necesidades.
                                        </p>
                                    </section>
                                </div>
                                <br />
                                <img
                                    src="images/services/serigrafia.jpg"
                                    className="card-img-top img_height_500 object-fit-cover"
                                    alt="serigrafia"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>

    )
}

export default PresentationServices