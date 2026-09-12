import React from "react";

const SeccionEntrega = ({ 
    modoEntrega, 
    setModoEntrega, 
    domicilio, 
    setDomicilio, 
    precioTotal 
}) => {
    return (
        <section className="col-md-4 border-start p-4">
            <h5 className="border-bottom w-100 fw-bolder">Entrega</h5>
            
            {/* Retiro Local */}
            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="radio"
                    name="orderMode"
                    id="received"
                    value="retiro-local"
                    checked={modoEntrega === "retiro-local"}
                    onChange={() => setModoEntrega("retiro-local")}
                />
                <label className="form-check-label" htmlFor="received">
                    Retiro por el local <span>(Aprox. listo en 45 min)</span>
                </label>
            </div>

            {/* Envío a Domicilio */}
            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="radio"
                    name="orderMode"
                    id="delivery"
                    value="envio"
                    checked={modoEntrega === "envio"}
                    onChange={() => setModoEntrega("envio")}
                />
                <label className="form-check-label" htmlFor="delivery">
                    Envío a domicilio <span>(Aprox. en 2hrs)</span>
                </label>
            </div>

            {/* Input Domicilio */}
            <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    name="address"
                    id="dom"
                    placeholder="Ingrese su domicilio"
                    disabled={modoEntrega !== "envio"}
                    value={domicilio}
                    onChange={(e) => setDomicilio(e.target.value)}
                />
            </div>

            {/* Resumen de Precio */}
            <div className="mb-3 fw-bolder">
                Total estimado: {precioTotal > 0 ? `$ ${precioTotal}` : "Confirmado al enviar"}
            </div>
        </section>
    );
};

export default SeccionEntrega;