const Faq = () => {

    const faqs = [
      {
        id:1,
        question: "¿Cómo funcionan las entregas?",
        answer: "Realizamos entregas de los pedidos de impresión según la disponibilidad y ubicación. Al realizar tu pedido te informaremos las opciones de entrega disponibles."
      },
      {
        id:2,
        question: "¿Cuáles son los métodos de pago?",
        answer: "Podés abonar tus pedidos y reservas utilizando los medios de pago disponibles en nuestra tienda online."
      },
      {
        id:3,
        question: "¿Qué servicios se pueden reservar?",
        answer: "Podés reservar los espacios y servicios disponibles de Escalones, según los horarios y la disponibilidad del momento."
      },
      {
        id:4,
        question: "¿Hay descuentos para estudiantes?",
        answer: "Sí, contamos con beneficios y descuentos para estudiantes. Consultanos para conocer las promociones disponibles."
      }
    ]


    return (
        <>
            <section className="faq container">
                <section className="row">
                    <h3 className="fw-bolder">Preguntas frecuentes</h3>
                    {/* Primera columna */}
                    <div className="col-md-6">
                        <div className="accordion" id="accordionExample1">
                            {/* Pregunta 1 */}
                            {faqs.slice(0,2).map((faq, index)=>(
                                <section className="accordion-item" key={faq.id}>
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed faq_subtitle"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index + 1}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${index + 1}`}
                                        >
                                            {faq.question}
                                        </button>
                                    </h2>

                                    <div
                                        id={`collapse${index + 1}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample1"
                                    >
                                        <div className="accordion-body">
                                            {faq.answer}
                                        </div>
                                        
                                    </div>
                                </section>
                            ))}
                            {/*<section className="accordion-item">
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
                            </section>*/}

                            {/* Pregunta 2 */}
                            {/*<section className="accordion-item">
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
                            </section>*/}
                        </div>
                    </div>

                    {/* Segunda columna */}
                    <div className="col-md-6">
                        <div className="accordion" id="accordionExample2">
                            {/* Pregunta 3 */}
                             {faqs.slice(2,4).map((faq, index)=>(
                                <section className="accordion-item" key={faq.id}>
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed faq_subtitle"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index + 3}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${index + 3}`}
                                        >
                                            {faq.question}
                                        </button>
                                    </h2>

                                    <div
                                        id={`collapse${index + 3}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample2"
                                    >
                                        <div className="accordion-body">
                                            {faq.answer}
                                        </div>
                                        
                                    </div>
                                </section>
                            ))}
                            {/*<section className="accordion-item">
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
                            </section>*/}

                            {/* Pregunta 4 */}
                            {/*<section className="accordion-item">
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
                            </section>*/}
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Faq