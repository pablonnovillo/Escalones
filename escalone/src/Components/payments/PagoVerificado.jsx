import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { generarMesaAsignada } from "../utils/generarMesaAsignada";
import { ObtenerNumeroReserva } from "../utils/obtenerNumeroReserva";
import { GenerarNumeroUnico } from "../utils/generarNumeroPedido";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { DescargarComprobante, DescargarPDF } from "../utils/downloadPDF";
import { DeleteBorrarModoPago, DeleteLocalStorage, DeleteCarrito } from "../utils/storageHelpers";
import { FormDataImpresiones } from "../utils/filesSend";
import { CargandoDatos } from "./Sections/CargandoDatos";
import { CarritoSuccess } from "./Sections/CarritoSuccess";
import { PrintingSuccess } from "./Sections/PrintingSuccess";
import { ReservaSuccess } from "./Sections/ReservaSuccess";
import { ErrorNumeroReserva } from "./Sections/ErrorNumReserva";
import { ErrorMessages } from "./Sections/ErrorMessages";
import { ErrorMessagesDefault } from "./Sections/ErrorMessagesDefault";
import { ApiHelpers } from "../utils/apiHelpers";

//import { useFiles } from "../../../context/FilesContext"

const PagoVerificado = () => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    console.log(usuario)
    const [tipoServicio, setTipoServicio] = useState(null)
    const [data, setData] = useState(null)
    const [email, setEmail] = useState("")
    const [estado, setEstado] = useState("loading")
    const [textError, setTextError] = useState("")
    const [modoPago, setModoPago] = useState("")    
    const [mesaAsignada, setMesAsignada] = useState(null)
    const [numeroPedido, setNumeroPedido] = useState(null)
    const [modoEntrega, setModoEntrega] = useState('retiro-local')
    const [domicilio, setDomicilio] = useState('')

    const enviado = useRef(false)

    const [numeroReserva, setNumeroReserva] = useState(null)
    const navigate = useNavigate()
    const URL_API = import.meta.env.VITE_API_URL;   


    useEffect(() => {

        (async function () {
            if (enviado.current) return;
            enviado.current = true
            const turno = localStorage.getItem("turno")
            const impresiones = localStorage.getItem("imprimir")
            const carritoCompleto = localStorage.getItem('carrito_data')

            const infoCorreo = localStorage.getItem('email')
            const methodPayment = localStorage.getItem("modo-pago")
            const formaEntrega = localStorage.getItem('modo_entrega')
            const domicilioActual = localStorage.getItem('domicilio')


            if (carritoCompleto) {
                const dataCarrito = JSON.parse(carritoCompleto)
                setTipoServicio("carrito")
                setData(JSON.parse(carritoCompleto))
                setModoEntrega(formaEntrega)
                setDomicilio(domicilioActual)
                setEmail(infoCorreo)
                setModoPago(methodPayment)                                
                enviarPedidoCarrito(dataCarrito)                                
                return
            }

            if (impresiones) {
                const dataImpresion = JSON.parse(impresiones)
                setTipoServicio("imprimir")
                setData(dataImpresion)
                setEmail(infoCorreo)
                setModoPago(methodPayment)
                enviarPedidoImpresiones(dataImpresion)
                return
            }

            if (turno) {
                const dataTurno = JSON.parse(turno)
                setTipoServicio("turno")
                setData(dataTurno)
                setEmail(infoCorreo)
                setModoPago(methodPayment)
                enviarTurno(dataTurno, infoCorreo)
                return
            }
            navigate("/")
        })();
    }, [])       

    const enviarPedidoCarrito = async (info) => {

        const numUnicoPedido = await GenerarNumeroUnico()
        setNumeroPedido(numUnicoPedido)        
        if (!numUnicoPedido) {
            setEstado("error")
            setTextError("No se pudo generar el numero de pedido")
        }

        const payload = {
            ...info,
            numero_pedido: numUnicoPedido,
            modo_entrega: modoEntrega,
        }
        try {
            const resp = await fetch(`${URL_API}/api/abonar-carrito`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })           

            if (resp.ok) {
                const result = await resp.json()
                setEstado("success")
                toast.success(result.message)
                DeleteCarrito()
                return
            }
            const respuesta = await ApiHelpers(resp)            
            setTextError(respuesta)
            toast.error(respuesta)
            setEstado("error")
        } catch (error) {
            setEstado("Error")
            console.log("Error enviando carrito", error)
            toast.error("Error de conexion con el servidor")
        }
    }

    const enviarPedidoImpresiones = async (info) => {

        const numUnicoPedido = await GenerarNumeroUnico()

        console.log(numUnicoPedido)        

        setNumeroPedido(numUnicoPedido)

        if (!numUnicoPedido) {
            setEstado("error")
            setTextError("No se pudo generar el numero de pedido")           
            alert("ENTRO")
        }

        const formData = FormDataImpresiones(info, numUnicoPedido)
        
        try {
            const resp = await fetch(`${URL_API}/api/pedido-impresiones`, {
                method: "POST",
                //headers:{"Content-Type":"application/json"},
                body: formData
            })
            
            console.log(resp)
            if (resp.ok) {
                const result = await resp.json()
                toast.success(result.message)
                setEstado("success")
                //console.log("Respuesta del servidor", result)
                DeleteLocalStorage()
                return
            }
            const respuesta = await ApiHelpers(resp)
            setTextError(respuesta)
            toast.error(respuesta)
            setEstado("error")
            return

        } catch (error) {
            toast.error("No se pudo enviar los documentos, por favor envianos al correo escalone@gmail.com")
            console.log("Error enviando impresiones: ", error)
        }
    }

    const enviarTurno = async (info, correo) => {
        const numReserva = await ObtenerNumeroReserva()
        if (numReserva) {
            setNumeroReserva(numReserva)
        }


        if (Number.isNaN(numReserva)) {
            setEstado("fallo")
            //setEstado("error")
            toast.error(
                "No se pudo confirmar la reserva, Por favor refrescá la página o verificá tu email.")
            return
        } else {
            let adicionalConsumo = "0"
            if (info.adicional) {
                adicionalConsumo = "1"
            }

            const mesa = generarMesaAsignada(numReserva)
            setMesAsignada(mesa)

            const payload = {
                numero_reserva: numReserva,
                mesa_asignada: mesa,
                tipo_servicio: info.servicio,
                fecha: info.fecha,
                hora_inicio: info.horaInicio,
                hora_final: info.horaFinal,
                duracion: info.duracion,
                email_cliente: info.email,
                //incluye_consumo:info.adicional ?? null,
                incluye_consumo: adicionalConsumo,
                senia: info.senia,
                precio_total: info.precio,
                descripcion: info.adicional
            }

            console.log(payload)

            //return 

            try {
                const resp = await fetch(`${URL_API}/api/reserva-servicio`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })                
                if (resp.ok) {
                    const result = await resp.json()
                    setEstado("success")
                    toast.success(result.message)
                    DeleteLocalStorage()                    
                    return
                }

                const respuesta = await ApiHelpers(resp)
                setEstado("error")
                toast.error(respuesta)
                
                return

            } catch (error) {
                toast.error(
                    "No se pudo confirmar la reserva, Por favor refrescá la página o verificá tu email.")
                setEstado("error")
                return
            }
        }

    }

    return (
        <>
            <main className="flex-grow-1">
                <section id="pay" className="mb-3">
                    {/* LOADING */}
                    {estado === "loading" && (
                        <CargandoDatos />
                    )}
                    {estado === "success" && tipoServicio === "carrito" && (
                        <div className="text-center container my-3">
                            <CarritoSuccess
                                usuario={usuario}
                            />
                            <div className="row">
                                <div className="col text-center">
                                    <button
                                        className="btn btn-outline-dark mt-4 fw-bolder"
                                        onClick={() => DescargarComprobante({
                                            data, numeroPedido, modoPago, tipoServicio
                                        })}
                                    >
                                        Descargar comprobante
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {estado === "success" && tipoServicio === "imprimir" && data && (

                        <div>
                            <PrintingSuccess 
                                usuario={usuario} 
                                data={data}
                                numeroPedido={numeroPedido}
                                modoPago={modoPago}                                
                            />
                            <div className="row pb-2">
                                <div className="col text-center">
                                    <button
                                        className="btn btn-outline-dark mt-4 fw-bolder"
                                        onClick={() => DescargarPDF({
                                            tipoServicio,
                                            data,
                                            numeroPedido,
                                            mesaAsignada,
                                            numeroReserva
                                        })}
                                    >
                                        Descargar comprobante
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {estado === "success" && tipoServicio === "turno" && !Number.isNaN(numeroReserva) && (

                        <div>
                            <div className="container">
                                <ReservaSuccess
                                    data={data}
                                    numeroReserva={numeroReserva}
                                    modoPago={modoPago}
                                />
                            </div>
                            <div className="row pb-2">
                                <div className="col text-center">
                                    <button
                                        className="btn btn-outline-dark mt-4 fw-bolder"
                                        onClick={() => DescargarPDF({
                                            tipoServicio,
                                            data,
                                            numeroPedido,
                                            mesaAsignada,
                                            numeroReserva
                                        })}
                                    >
                                        Descargar comprobante
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/*ERRORES */}
                    {Number.isNaN(numeroReserva) && (
                        <ErrorNumeroReserva />
                    )}
                    {estado === "error" && Number.isNaN(numeroPedido) && tipoServicio === "carrito" && (
                        <ErrorMessages
                            textError={textError}
                            defaultMessage="No se pudo obtener el numero del pedido. Intente actualizar la página o escribanos al escalone@gmail.com para proporcionarte un numero del pedido"
                        />
                    )}
                    {estado === "error" && !Number.isNaN(numeroPedido) && tipoServicio === "carrito" && (
                        <ErrorMessages
                            textError={textError}
                            defaultMessage="No se pudo procesar la solicitud."
                        />
                    )}
                    {estado === "error" && !Number.isNaN(numeroPedido) && tipoServicio === "imprimir" && (
                        <ErrorMessagesDefault
                            title="No se pudo generar el número pedido"
                            textError={textError}
                            textMessages="Intenta enviar sus datos y el archivo adjunto al correo escalone@gmail.com"
                        />
                    )}
                    {estado === "error" && !Number(numeroPedido) && tipoServicio === "imprimir" && (
                        <ErrorMessagesDefault
                            title="No se pudo enviar los documentos"
                            textError={textError}
                            textMessages="Intenta enviarlo al escalone@gmail.com"
                        />
                    )}
                    {estado === "error" && tipoServicio === "turno" && (
                        <ErrorMessagesDefault
                            title="No se pudo enviar el turno a su correo proporcionado"
                            textError={textError}
                            textMessages="Porfavor escribinos a escalone@gmail.com, su nombre y la fecha que reservó"
                        />
                    )}
                    <div className="row text-center w-50 mx-auto">
                        <div className="col">
                            <Link
                                to="/"
                                onClick={(e) => {
                                    if (estado === "loading") {
                                        e.preventDefault()
                                        return
                                    }
                                    DeleteBorrarModoPago()
                                }}
                                className={`btn btn-dark fw-bolder custom-bg-blue-marine w-25 ${estado === "loading" ? "disabled opactiy-50" : ""}`}
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PagoVerificado;