export const CarritoSuccess = ({ usuario }) => {
    return (
        <>
            <div className="mb-4">
                <i className="fa-solid fa-circle-check text-success" style={{ fontSize: "5rem" }}></i>
            </div>
            <h4 className="fw-bold">Compra confirmada!</h4>
            <div className="alert alert-success w-50 mx-auto my-1">
                <div className="fs-5">
                    La transferencia se ha procesado con éxito
                </div>
                <hr className="w-100 mx-auto my-2" />
                <div className="w-50 mx-auto my-2">
                    {!usuario && (<div>Podés loguearte en “Olvidar contraseña”, activar tu cuenta y cambiar la clave.</div>)}
                    <br />
                    Muchisimas Gracias
                </div>
            </div>
        </>
    )
}