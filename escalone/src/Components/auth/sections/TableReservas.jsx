import { descargarTurnoPdf } from "../../utils/downloadPDF"

export const TableReservas = ({ reservas }) => {
    return (
        <div className="table-responsive shadow-sm rounded">
            <table className="table">
                <thead className="table-custom-blue-marine">
                    <tr>
                        <th>Turno N°</th>
                        <th>Fecha</th>
                        <th>Desde</th>
                        <th>Hasta</th>
                        <th className="text-center">Mesa</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {reservas.map((res) => (
                        <tr key={res.id}>
                            <td className="fw-bold">{res.numero_reserva}</td>
                            <td>{res.fecha}</td>
                            <td>{res.hora_inicio}</td>
                            <td>{res.hora_final}</td>
                            <td className="text-center">
                                <span className="badge bg-primary fs-6">
                                    {res.mesa_asignada}
                                </span>
                            </td>
                            <td className="text-center">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => descargarTurnoPdf(res)}
                                >
                                    <i className="fa-solid fa-file-pdf me-1"></i>
                                    Descargar Ticket
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}