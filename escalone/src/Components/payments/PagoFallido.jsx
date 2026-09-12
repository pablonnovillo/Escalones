import { Link } from "react-router-dom";

const PagoFallido = () => {
    return (
        <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5" style={{ minHeight: "70vh" }}>
            <section className="container text-center">
                <div className="mb-4">
                    <i className="fa-solid fa-circle-xmark text-danger" style={{ fontSize: "5rem" }}></i>
                </div>

                <h1 className="fw-bold h2 mb-3">PAGO RECHAZADO</h1>

                <div className="alert alert-danger border-0 bg-transparent mx-auto" style={{ maxWidth: "500px" }}>
                    <p className="fs-5">
                        Lo sentimos, no pudimos procesar tu transacción en este momento.
                    </p>
                    <hr className="w-25 mx-auto my-3" />
                    <p className="text-muted">
                        Puede deberse a fondos insuficientes, datos incorrectos o un problema temporal con la entidad bancaria.
                    </p>
                </div>

                <div className="mt-5 d-flex flex-column gap-3 align-items-center">
                    <Link to="/tienda/checkout" className="btn btn-dark fw-bolder px-5 py-2 custom-bg-blue-marine">
                        Reintentar pago
                    </Link>
                    <Link to="/" className="btn btn-outline-secondary btn-sm">
                        Volver al inicio
                    </Link>
                </div>

                <p className="mt-5 text-muted small">
                    Si el problema persiste, contactanos a: <br />
                    <strong>escalone@gmail.com</strong>
                </p>
            </section>
        </main>
    )
}

export default PagoFallido