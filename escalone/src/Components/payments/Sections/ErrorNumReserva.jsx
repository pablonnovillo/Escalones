export const ErrorNumeroReserva = () => {
    return (
        <div className="text-center container my-3">
            <h4 className="fw-bold">❌ No se pudo confirmar</h4>
            <p>
                No se pude generar el número de reserva.<br />
                Intentá refrescar la página o verifique si llego a su email.
            </p>
        </div>
    )
}