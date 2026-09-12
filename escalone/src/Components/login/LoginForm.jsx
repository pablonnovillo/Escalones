import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiHelpers } from "../utils/apiHelpers";

const LoginForm = () => {

    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")    
    const [loading, setLoading]=useState(false)
    const navigate = useNavigate();    
    const url = import.meta.env.VITE_API_URL

    const handleSubmit=async(e)=>{            
        e.preventDefault();
        setLoading(true);
        try {            
            //Verificar si el usuario existe
            const response = await fetch(`${url}/api/iniciar-sesion`,{
                method:"POST",
                headers:{"Content-Type":"application/json",Accept: "application/json"},

                body:JSON.stringify({email, password})
            })
            
            if(response.ok){
              const loginData=await response.json();            
              sessionStorage.setItem("token",loginData.token)              
              //setMensaje(loginData.message)              
              sessionStorage.setItem("usuario", JSON.stringify(loginData.user));
              toast.success(loginData.message, {
                onClose: () => navigate("/"),
              });
              return             
            }
            const respuesta = await ApiHelpers(response)
            toast.error(respuesta)           
        } catch (error) {            
            console.log(error)            
            toast.error(error)           
        }finally{
          setLoading(false)
        }
    }    

  return (
    <div className="bg-custom-main my-4 pt-3 pb-4 min-vh-60 d-flex flex-column border justify-content-center">
      <section className="container text-center text-white">
        <h1 className="py-3 fw-bolder">Iniciar Sesión</h1>    
        {loading ? <div className='text-center registrando'>Enviando...</div> : ""}                    
        <p className="custom-bg-blue-marine p-2 w-50 mx-auto rounded">
            No estas registrado? hace click <Link to="/auth/registro" className="text-white">aquí </Link>
        </p>                
        <div className="row">
          <div className="col-12 w-50 mx-auto">            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="Ingrese su correo electrónico"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-light custom-btn"
                  value="Iniciar sesión"
                />                
              </div>              
              <div className="mb-3">                
                <p>
                  <Link to="/olvidar-password" className="text-white">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </p>
              </div>
            </form>            
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} theme="dark"/>
    </div>
  );
};

export default LoginForm;
