import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import { crearFormDataPedido } from "../utils/formDataHelpers";
import { calcularPresupuesto } from "../utils/calculosFiles";
import { limpiarLocalStorage } from "../utils/storageHelpers";
import { prepararArchivosParaEnvio } from "../utils/filesSend";
import { ApiHelpers } from "../utils/apiHelpers";
import SeccionArchivos from "./sectionServices/SectionFiles";
import SeccionDatosCliente from "./sectionServices/SectionDataClient";
import SeccionEntrega from "./sectionServices/SectionDelivery";


pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const EncargoImpresiones = () => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [comment, setComment] = useState("");
    const [tipoPapel, setTipoPapel] = useState("A4");
    const [cantCopias, setCantCopias] = useState("");
    const [email, setEmail] = useState(usuario ? usuario.email : "");
    const [modoEntrega, setModoEntrega] = useState("retiro-local");
    const [domicilio, setDomicilio] = useState("");
    const [alerta, setAlerta] = useState("");
    const [archivos, setArchivos] = useState([]);
    const [filesTarget, setFilesTarget] = useState([])
    const [senia, setSenia] = useState(0);
    const [precioTotal, setPrecioTotal] = useState(0);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const url = import.meta.env.VITE_API_URL;

    //validar archivos
    const handleFiles = (e) => {
        const files = Array.from(e.target.files)
        //console.log(files)      
        setArchivos(files)
        setFilesTarget(e.target.files)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        window.scrollTo({ top: 200, behavior: "smooth" })

        const datosEnvio = {
            archivos,
            tipoPapel,
            cantCopias,
            nombre,
            telefono,
            email,
            modoEntrega,
            comment,
            domicilio
        }

        const formData = crearFormDataPedido(datosEnvio)

        try {
            const response = await fetch(`${url}/api/validar-impresion`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            })
            //console.log(response)        

            if (response.ok) {
                setLoading(false)
                const {total, senia} = await calcularPresupuesto(archivos, cantCopias)
                setPrecioTotal(total)
                setSenia(senia)
                //return
                const pedido = {
                    nombreCliente: nombre,
                    telefono,
                    comentario: comment,
                    tipoPapel,
                    cantCopias,
                    email,
                    modoEntrega,
                    direccionEnvio: modoEntrega === "envio" ? domicilio : "",
                    senia,
                    precioTotal: total
                }             

                const filesData = await prepararArchivosParaEnvio(filesTarget)

                limpiarLocalStorage()
                
                sessionStorage.setItem("files", JSON.stringify(filesData))
                localStorage.setItem("imprimir", JSON.stringify(pedido))

                toast.success("Redirigiendo al metodo de pago", {
                    onClose: () => navigate("/servicios/confirmar-servicio"),
                })
                return
            }

            const respuesta = await ApiHelpers(response)
            toast.error(respuesta)           

        } catch (error) {
            console.log(error)            
            toast.error("El servidor no esta disponible, Intenta más tarde")
            return
        }finally{
            setLoading(false)
        }        
    }
    return (
        <>
            <section id="order" className="mb-3">
                <h1 className="text-center my-3">SU PEDIDO</h1>
                <section>
                    <h2 className="text-center pb-3 fw-bolder h3">
                        Subí tus archivos y retiralos pronto
                    </h2>
                    <hr className="container" />
                    {loading ? <div className='text-center enviando'>Enviando...</div> : ""}
                    <section>
                        <form id="form-order" onSubmit={handleSubmit}>
                            <div className="container">
                                <div className="row">
                                    {/* Columna 1 */}
                                    <SeccionArchivos 
                                        handleFiles={handleFiles}
                                        tipoPapel={tipoPapel}
                                        setTipoPapel={setTipoPapel}
                                        setCantCopias={setCantCopias}
                                    />                                    

                                    {/* Columna 2 */}
                                    <SeccionDatosCliente 
                                        usuario={usuario}
                                        email={email}
                                        setNombre={setNombre}
                                        setTelefono={setTelefono}
                                        setEmail={setEmail}
                                        setComment={setComment}
                                    />                                    

                                    {/* Columna 3 */}
                                    <SeccionEntrega 
                                        modoEntrega={modoEntrega}
                                        setModoEntrega={setModoEntrega}
                                        domicilio={domicilio}
                                        setDomicilio={setDomicilio}
                                        precioTotal={precioTotal}
                                    />                                   
                                </div>

                                {/* Botón enviar */}
                                <div className="row">
                                    <div className="mb text-center w-100">
                                        <input
                                            type="submit"
                                            className="btn btn-dark"
                                            value="Enviar pedido"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        </>
    )
}

export default EncargoImpresiones;