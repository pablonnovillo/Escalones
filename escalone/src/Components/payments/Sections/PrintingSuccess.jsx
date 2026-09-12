export const PrintingSuccess = ({ usuario, data, numeroPedido, modoPago }) => {
    return (
        <section className="container">
            <h1 className="text-center my-3 fw-bolder">PAGO CONFIRMADO</h1>
            <div className="row">
                <div className="col-12 text-center">
                    <p>Tu número de pedido es {numeroPedido}</p>
                    <div className="card mx-auto p-3 width-static-25">
                        <h4 className="card-title">Detalle del pedido</h4>
                        <p className="card-text" id="order">Impresiones</p>
                        <p className="card-text">Hora de retiro: 10:00 am</p>
                        <p className="card-text">Método de pago: {modoPago}</p>
                        <p className="card-text">Modo de Entrega: {data.modoEntrega}</p>
                        <p className="card-text">Pago seña: {data.senia}</p>
                        <p className="card-text" id="price">Precio Total: $ {data.precioTotal}</p>
                        <hr className="m-1" />
                        <div className="row">
                            <div className="col">
                                {!usuario && (<div>Podés loguearte en “Olvidar contraseña”, activar tu cuenta y cambiar la clave.</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}