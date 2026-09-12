const Fundadores = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg-6 pt-4">
                    <h2 className="h1 text-center">Quiénes somos</h2>
                </div>
                <div className="col-lg-6 pt-4">
                    <h2 className="h1 text-center">Fundadores</h2>
                </div>

                <section className="col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center p-5">
                    <p>
                        ESCALONES es un espacio innovador, abierto las 24 horas, donde la
                        imprenta convive con un ambiente de bar y recreación. Fundado por
                        Pablo Novillo y Sabrina Gigena, combinamos tecnología de impresión
                        rápida, café de especialidad y zonas de ocio (metegol, pool y
                        ping-pong) para que puedas estudiar, trabajar o desconectarte a
                        cualquier hora. Nuestra misión es ofrecer un entorno cómodo y seguro,
                        donde cada usuario pueda avanzar en sus proyectos mientras disfruta de
                        un momento de ocio sin límites de horario.
                    </p>
                </section>

                <section className="col-lg-6 col-md-12">
                    <section className="d-flex profiles justify-content-center">
                        <article className="px-3 text-center">
                            <img
                                src="images/Sabrina.jpeg"
                                alt="Sabrina Gigena"
                                className="profiles_carnet object-fit-cover rounded"
                            />
                            <h5>
                                Sabrina Gigena <br />
                                Arquitecta
                            </h5>
                        </article>

                        <article className="px-3 text-center">
                            <img
                                src="images/Pablo.jpeg"
                                alt="Pablo Novillo"
                                className="profiles_carnet object-fit-cover rounded"
                            />
                            <h5>
                                Pablo Novillo
                                <br />
                                Programador
                            </h5>
                        </article>
                    </section>
                </section>
            </div>
        </>
    )
}

export default Fundadores