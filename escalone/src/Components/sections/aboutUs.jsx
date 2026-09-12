const AboutUs = () => {
    return (
        <>
            <section className="container mt-3" id="about_us">
                <section className="row">
                    {/* Texto de Quiénes Somos */}
                    <section className="custom_about_us col-lg-7 col-md-12 d-flex flex-column justify-content-center px-5">
                        <h3 className="fw-bolder">Quiénes somos</h3>
                        <p>
                            ESCALONES es un espacio innovador abierto 24 horas, donde la imprenta se fusiona con un ambiente de bar y recreación. Fundado por Pablo Novillo y Sabrina Gigena, combinamos tecnología de impresión rápida, café de especialidad y zonas de ocio (metegol, pool y ping-pong) para que puedas estudiar, trabajar o desconectarte a cualquier hora. Nuestra misión es ofrecer un entorno cómodo y seguro, donde cada usuario avance en sus proyectos mientras disfruta de un momento de ocio sin límites de horario.
                        </p>
                    </section>

                    {/* Perfiles */}
                    <section className="col-lg-5 col-md-12 d-flex profiles justify-content-lg-end justify-content-center">
                        <article>
                            <img
                                src="images/Pablo.jpeg"
                                alt="perfil1"
                                className="profiles_carnet object-fit-cover rounded"
                            />
                            <h5>
                                Pablo Novillo
                                <br />
                                Programador
                            </h5>
                        </article>
                        <article>
                            <img
                                src="images/Sabrina.jpeg"
                                alt="perfil2"
                                className="profiles_carnet object-fit-cover rounded"
                            />
                            <h5>
                                Sabrina Gigena
                                <br />
                                Arquitecta
                            </h5>
                        </article>
                    </section>
                </section>
            </section>
        </>
    )
}

export default AboutUs