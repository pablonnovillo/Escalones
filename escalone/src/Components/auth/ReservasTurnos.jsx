import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import { descargarTurnoPdf } from "../utils/downloadPDF";
import { ApiHelpers } from "../utils/apiHelpers";
import { SectionError } from "./sections/sectionError";
import { SectionEmptyReservas } from "./sections/sectionEmptyReservas";
import { TableReservas } from "./sections/TableReservas";

const ReservasTurnos = () => {
    const [reservas, setReservas] = useState([])
    const [textError, setTextError] = useState('');
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const URL_API = import.meta.env.VITE_API_URL

    useEffect(() => {
        (async function () {
            await cargarReservas()
        })();
    }, [])

    const cargarReservas = async () => {
        try {
            const token = sessionStorage.getItem('token')

            const resp = await fetch(`${URL_API}/api/mis-reservas`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })

            if (resp.ok) {
                const result = await resp.json();
                setMessage(result.message)
                setReservas(result.data)
                return
            }

            const respuesta = await ApiHelpers(resp)
            setTextError(respuesta)
        } catch (error) {
            //console.log(error)            
            setTextError("Tenemos un problema con el servidor, porfavor intente más tarde")
            //setTextError(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="text-center my-5 flex-grow-1">Cargando...</div>

    return (
        <main className="flex-grow-1 container my-5">
            <div className="row">
                <div className="col-12 w-75 mx-auto">
                    <h2 className="text-custom-main border-bottom pb-3 mb-4">
                        <i className="fa-solid fa-calendar-check me-2 text-primary"></i>
                        Mis Reservas
                    </h2>
                    {textError ? (
                        <SectionError textError={textError} />                       
                    ) : (
                        <>
                            {reservas.length > 0 ? (
                                <TableReservas reservas={reservas} />                                
                            ) : (
                                <SectionEmptyReservas message={message} />
                                
                            )}
                        </>
                    )}

                </div>
            </div>
        </main>
    )
}

export default ReservasTurnos;