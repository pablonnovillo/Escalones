export const ReservaSuccess = ({data, numeroReserva, modoPago}) => {
    return (
        <div className="row">
            <div className="col-12 text-center">
                <section className="mt-4">
                    <i className="fa-sharp-duotone fa-solid fa-circle-check fa-2x py-2"></i>
                    <h1 className="text-center fw-bolder h3">TU RESERVA ESTA CONFIRMADO</h1>
                </section>
                <div className="mx-auto width-static-25">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th>Servicio:</th>
                                <td id="servicio-reserva">{data.servicio}</td>
                            </tr>
                            <tr>
                                <th>Fecha: </th>
                                <td id="fecha-reserva">{new Date(data.fecha).toLocaleDateString("es-AR")}</td>
                            </tr>
                            <tr>
                                <th>Horario: </th>
                                <td id="horas-reserva">{data.horaInicio} a {data.horaFinal}</td>
                            </tr>
                            <tr>
                                <th>N° de reserva: </th>
                                <td>{numeroReserva}</td>
                            </tr>
                            <tr>
                                <th>Confirmación enviada a: </th>
                                <td id="email-reserva">{data.email}</td>
                            </tr>
                            <tr>
                                <th>Metodo de pago: </th>
                                <td>{modoPago}</td>
                            </tr>
                            <tr>
                                <th>Pago realizado (seña): </th>
                                <td>{data.senia}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>{data.precio}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}