const Faq = () => {
    return (
        <>
            <section className="faq container">
                <section className="row">
                    <h3 className="fw-bolder">Preguntas frecuentes</h3>
                    {/* Primera columna */}
                    <div className="col-md-6">
                        <div className="accordion" id="accordionExample1">
                            {/* Pregunta 1 */}
                            <section className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed faq_subtitle"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="false"
                                        aria-controls="collapseOne"
                                    >
                                        ¿Cómo funcionan las entregas?
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample1"
                                >
                                    <div className="accordion-body">
                                        <strong>This is the first item’s accordion body.</strong> It is
                                        shown by default, until the collapse plugin adds the appropriate
                                        classes that we use to style each element. These classes control
                                        the overall appearance, as well as the showing and hiding via CSS
                                        transitions. You can modify any of this with custom CSS or
                                        overriding our default variables. It’s also worth noting that just
                                        about any HTML can go within the <code>.accordion-body</code>,
                                        though the transition does limit overflow.
                                    </div>
                                </div>
                            </section>

                            {/* Pregunta 2 */}
                            <section className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed faq_subtitle"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        ¿Cuáles son los métodos de pago?
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample1"
                                >
                                    <div className="accordion-body">
                                        <strong>This is the second item’s accordion body.</strong> It is
                                        hidden by default, until the collapse plugin adds the appropriate
                                        classes that we use to style each element. These classes control
                                        the overall appearance, as well as the showing and hiding via CSS
                                        transitions. You can modify any of this with custom CSS or
                                        overriding our default variables. It’s also worth noting that just
                                        about any HTML can go within the <code>.accordion-body</code>,
                                        though the transition does limit overflow.
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Segunda columna */}
                    <div className="col-md-6">
                        <div className="accordion" id="accordionExample2">
                            {/* Pregunta 3 */}
                            <section className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed faq_subtitle"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        ¿Qué servicios se pueden reservar?
                                    </button>
                                </h2>
                                <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample2"
                                >
                                    <div className="accordion-body">
                                        <strong>This is the third item’s accordion body.</strong> It is
                                        hidden by default, until the collapse plugin adds the appropriate
                                        classes that we use to style each element. These classes control
                                        the overall appearance, as well as the showing and hiding via CSS
                                        transitions. You can modify any of this with custom CSS or
                                        overriding our default variables. It’s also worth noting that just
                                        about any HTML can go within the <code>.accordion-body</code>,
                                        though the transition does limit overflow.
                                    </div>
                                </div>
                            </section>

                            {/* Pregunta 4 */}
                            <section className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed faq_subtitle"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour"
                                        aria-expanded="false"
                                        aria-controls="collapseFour"
                                    >
                                        ¿Hay descuentos para estudiantes?
                                    </button>
                                </h2>
                                <div
                                    id="collapseFour"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample2"
                                >
                                    <div className="accordion-body">
                                        <strong>This is the fourth item’s accordion body.</strong> It is
                                        hidden by default, until the collapse plugin adds the appropriate
                                        classes that we use to style each element. These classes control
                                        the overall appearance, as well as the showing and hiding via CSS
                                        transitions. You can modify any of this with custom CSS or
                                        overriding our default variables. It’s also worth noting that just
                                        about any HTML can go within the <code>.accordion-body</code>,
                                        though the transition does limit overflow.
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Faq