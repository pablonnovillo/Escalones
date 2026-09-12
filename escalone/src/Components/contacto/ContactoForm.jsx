import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { ApiHelpers } from "../utils/apiHelpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ContactoForm = () => {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [mensaje, setMensaje] = useState("")  
  const [loading, setLoading]=useState(false)
  //const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${url}/api/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ nombre, email, mensaje })
      })     

      if(response.ok){
        const contactData = await response.json();                     
        toast.success(contactData.message);
        setNombre("")
        setEmail("")
        setMensaje("")        
        return
      }
      const respuesta = await ApiHelpers(response)
      toast.error(respuesta)

    } catch (error) {   
      console.log(error)     
      toast.error("Tuvimos un problema con el servidor del sitio")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="my-4 pt-3 pb-4 min-vh-60 d-flex flex-column justify-content-center">
      <section className="container text-center custom-color-blue">
        <h1 className="py-3 fw-bolder">Contactanos para más información</h1>
        <p className="fw-bolder">
          Estamos aquí para ayudarte con tus consultas y servicios
        </p>
        <div className="row">
          {/* Formulario */}
          <div className="col-lg-6 bg-custom-main rounded-3 d-flex flex-column justify-content-center">
            <form className="p-4 text-white text-start" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Tu nombre completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Ingrese su nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Tu correo electrónico*
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  placeholder="Ingrese su correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">
                  Tu mensaje
                </label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  rows="4"
                  placeholder="Escriba su consulta aquí..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  disabled={loading}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-dark custom-btn"
                  value="Enviar"
                  disabled={loading}
                />
                {loading ? " Enviando...":""}
              </div>
            </form>
          </div>

          {/* Imagen */}
          <div className="col-lg-6 d-flex">
            <img
              src="images/contacto/contact.png"
              alt="Ilustración de contacto"
              width="100%"
              className="object-fit-cover rounded-3"
            />
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </div>
  );
};

export default ContactoForm;
