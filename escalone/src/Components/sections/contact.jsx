import { useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ApiHelpers } from "../utils/apiHelpers"

const Contact = () => {

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [mensaje, setMensaje] = useState("")    
    const [loading, setLoading] = useState(false)

    const url = import.meta.env.VITE_API_URL

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`${url}/api/contacto`,{
                method:'POST',
                headers:{ "Content-Type":"application/json", Accept: "application/json"},
                body: JSON.stringify({nombre, email, mensaje})
            })            
            
            if(response.ok){                
                const contactData = await response.json()            
                toast.success(contactData.message)
                setNombre("")
                setEmail("")
                setMensaje("")
                return
            }           
            const respuesta = await ApiHelpers(response)
            toast.error(respuesta)            
        } catch (error) {     
            console.log(error)
            if(error instanceof TypeError)       
            {
                toast.error("El servidor no esta disponible. Porfavor Intente más tarde")
                return
            }
            toast.error(error)            
        }finally{
            setLoading(false)
        }

    }

    return (
        <>
            <section className="container text-white py-5">
                <div className="row">
                    {/* Formulario de Contacto */}
                    <section className="col-lg-7 col-md-12 d-flex flex-column">
                        <section id="contact">
                            <h3 className="h1 fw-bolder my-4 text-center">Contacto</h3>
                            <div className="text-center">
                                {loading ? "Enviando...":""}
                            </div>
                            <section id="message"></section>
                            <form action="#" id="form_contact" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"                                        
                                        id="correo"
                                        placeholder="Correo electrónico"
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                        Mensaje
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        rows="3"
                                        placeholder="Escriba su mensaje..."
                                        value={mensaje}
                                        onChange={(e)=>setMensaje(e.target.value)}
                                        disabled={loading}
                                    ></textarea>
                                </div>
                                <div className="mb-4 text-lg-end text-center">
                                    <button type="submit" className="btn btn-info fw-bolder" disabled={loading}>
                                        Enviar tu consulta
                                    </button>                                    
                                </div>                               
                            </form>
                        </section>
                    </section>

                    {/* Horarios de Atención */}
                    <section className="col-lg-5 col-md-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <h5 className="card-title card-text text-center h3 fw-bolder">
                                    Horarios de atención
                                </h5>
                                <p className="card-text py-1">
                                    <i className="fa-regular fa-clock"></i> Abierto 24hs
                                </p>
                                <p className="card-text py-1">
                                    <i className="fa-regular fa-envelope"></i> escalonesar@gmail.com
                                </p>
                                <p className="card-text py-1">
                                    <i className="fa-solid fa-phone"></i> +54 9 11 68654741
                                </p>
                                <p className="card-text py-1">
                                    <i className="fa-solid fa-location-dot"></i> Av. Álvarez Thomas 3971, Buenos Aires
                                </p>
                            </div>
                            <iframe
                                src={import.meta.env.VITE_MAPS_GOOGLE}
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Escalones"
                            ></iframe>
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}

export default Contact