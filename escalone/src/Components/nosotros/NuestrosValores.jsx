const NuestroValores = () => {
    return (
        <>
            <section className="row text-center my-5">
                {/* Título y descripción principal */}
                <section className="col-lg-12 text-center">
                    <h2 className="h1">Nuestros Valores</h2>
                    <hr className="mx-auto border border-info" />
                    <p className="fw-bolder">
                        ESCALONES busca ofrecer una experiencia única a sus clientes,
                        combinando diseño innovador, un ambiente atractivo y un servicio
                        excepcional.
                    </p>
                </section>

                {/* Misión */}
                <section className="col-lg-6 my-3">
                    <h3 className="py-2 custom-bg-blue-marine text-white">Nuestra Misión</h3>
                    <p className="text-start pt-3">
                        Ofrecer un espacio creativo y funcional donde diseñadores,
                        emprendedores y creativos puedan encontrar inspiración,
                        brindándoles recursos y herramientas para desarrollar sus proyectos
                        en un ambiente relajado y divertido. Buscamos fomentar la comunidad
                        y la colaboración entre profesionales del diseño y la creatividad,
                        proporcionando siempre servicios de alta calidad.
                    </p>
                </section>

                {/* Visión */}
                <section className="col-lg-6 my-3">
                    <h3 className="py-2 custom-bg-blue-marine text-white">Nuestra Visión</h3>
                    <p className="text-start pt-3">
                        Convertirnos en el principal referente de diseño y creatividad en la
                        ciudad, siendo reconocidos por nuestra innovación, calidad y servicio
                        excepcional.
                    </p>
                    <p className="text-start">
                        Queremos crear un espacio donde la creatividad fluya libremente, y
                        donde los diseñadores y creativos puedan crecer y desarrollarse en un
                        entorno estimulante y divertido.
                    </p>
                </section>
            </section>
        </>
    )
}

export default NuestroValores