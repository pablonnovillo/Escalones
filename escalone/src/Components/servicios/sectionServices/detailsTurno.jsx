const DetailsTurno = ({ serviceTitle, datos, adicional, servicePrecio }) => {
    if (!datos) return null;

    return (
        <section className="text-center">
            <h3 className="py-3">Reserva turno de {serviceTitle}</h3>
            <table className="table table-borderless w-75 mx-auto">
                <tbody>
                    <tr>
                        <th>Servicio:</th>
                        <td>{datos.servicio}</td>
                    </tr>
                    <tr>
                        <th>Fecha:</th>
                        <td>{new Date(datos.fecha).toLocaleDateString("es-AR")}</td>
                    </tr>
                    <tr>
                        <th>Horario:</th>
                        <td>{datos.horaInicio} hrs a {datos.horaFinal?.slice(0, 5)} hrs</td>
                    </tr>
                    <tr>
                        <th>Adicional:</th>
                        <td>{adicional || "sin consumo"}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="border-top">
                        <th className="fw-bolder">Valor Total:</th>
                        <td className="fw-bolder">${servicePrecio}</td>
                    </tr>
                </tfoot>
            </table>
            <p className="text-center">(Se cobrará 50% por adelantado)</p>
        </section>
    );
};

export default DetailsTurno;