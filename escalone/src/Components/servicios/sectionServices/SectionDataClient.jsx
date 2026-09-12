import React from "react";

const SeccionDatosCliente = ({ 
    usuario, 
    email, 
    setNombre, 
    setTelefono, 
    setEmail, 
    setComment 
}) => {
    return (
        <section className="col-md-4 border-start border-end p-4">
            <h5 className="border-bottom w-100 fw-bolder">Datos</h5>
            
            <section className="mb-3">
                <label htmlFor="nombre">Nombre</label>
                <input
                    id="nombre"
                    className="form-control"
                    type="text"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    onChange={(e) => setNombre(e.target.value)}
                />
            </section>

            <section className="mb-3">
                <label htmlFor="phone">Teléfono</label>
                <input
                    id="phone"
                    className="form-control"
                    type="tel"
                    name="phone"
                    placeholder="Ingrese su teléfono"
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </section>

            {!usuario && (
                <section className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="form-control"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Ingrese su email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </section>
            )}

            <section className="mb-3">
                <label htmlFor="comment">Comentario</label>
                <textarea
                    id="comment"
                    className="form-control"
                    name="comment"
                    placeholder="Ingrese su comentario (opcional)"
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </section>
        </section>
    );
};

export default SeccionDatosCliente;