import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiHelpers } from "../utils/apiHelpers";

const RegisterForm = () => {
    const [usuario, setUsuario] = useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    //const [mensaje, setMensaje]=useState("")
    const [loading, setLoading]=useState(false)

    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL

    const handleSubmit=async(e)=>{            
        e.preventDefault();
        setLoading(true);
        try {            
            await register(url, usuario, email, password)
        } catch (error) {                
            console.log(error)        
            toast.error("Tuvimos problemas con el servidor, intente más tarde")                        
        }finally{
            setLoading(false)
        }
    }

    const register=async(endpoint, nickname, mail, clave)=>{
      const registerRes = await fetch(`${endpoint}/api/register`,{
        method:"POST",
        headers:{"Content-Type":"application/json", Accept: "application/json"},
        body:JSON.stringify({nombre_usuario:nickname, email:mail, password:clave})
      })
      if(registerRes.ok){
        const registerData=await registerRes.json()   
        //setMensaje(registerData.message)        
        //sessionStorage.setItem("usuario", JSON.stringify(registerData.user));
        toast.success(registerData.message, {
          onClose: () => navigate("/auth/iniciar-sesion"),
        });
        return        
      }
      const respuesta = await ApiHelpers(registerRes)       
      toast.error(respuesta);              
    }

    return (
        <div className="bg-custom-main my-4 pt-3 pb-4 min-vh-60 d-flex flex-column border justify-content-center">
            <section className="container text-center text-white">
                <h1 className="py-3 fw-bolder">Registro</h1>  
                {loading ? <div className='text-center registrando'>Enviando...</div> : ""}                      
                 <p className="custom-bg-blue-marine p-2 w-50 mx-auto rounded">
                    estas registrado? hace click <Link to="/auth/iniciar-sesion" className="text-white"> aquí</Link>
                </p>
                <div className="row">
                    <div className="col-12 w-50 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="usuarioInput" className="form-label">
                                    Usuario nombre
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="usuarioInput"
                                    placeholder="Ingrese su nombre de usuario"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                            </div>
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
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="submit"
                                    className="btn btn-light custom-btn"
                                    value="Registrese"
                                />
                            </div>                            
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} theme="dark" />
        </div>
    )
}

export default RegisterForm;