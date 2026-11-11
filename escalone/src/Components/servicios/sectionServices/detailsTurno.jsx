import {calcularDiferenciaHoras} from '../../utils/calcularDiferenciaHoras'

const DetailsTurno = ({ serviceTitle, datos, adicional, servicePrecio }) => {
    if (!datos) return null;

    const duracion = calcularDiferenciaHoras(datos.horaInicio, datos.horaFinal);

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
                        <th>Duración:</th>
                        <td>{duracion} {duracion==1 ? "hora": "horas"}</td>
                    </tr>
                    <tr>
                        <th>Adicional:</th>
                        <td>{adicional || "sin consumo"}</td>
                    </tr>                   
                </tbody>
                <tfoot>
                    <tr className="border-top">
                        <td>Valor Total:</td>
                        <td>${servicePrecio}</td>
                    </tr>
                     <tr>
                        <td className="fw-bolder">Reserva a pagar:</td>
                        <td className="fw-bolder">{datos.senia}</td>
                    </tr>
                </tfoot>
            </table>
            <p className="text-center">(Se cobrará 50% por adelantado)</p>
        </section>
    );
};

export default DetailsTurno;