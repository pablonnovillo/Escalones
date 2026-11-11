import { Link } from "react-router-dom"
import Header from '../Components/sections/header'
import Footer from '../Components/sections/footer'
import { useState } from "react"
import { toast } from "react-toastify";
import { validateAccount, sendActionRequest } from "../Components/utils/accountManagement";
import "react-toastify/dist/ReactToastify.css";
import { ApiHelpers } from "../Components/utils/apiHelpers";

export default function ManagementAccount() {
    const [ email, setEmail ] = useState("")
    const [ action, setAction ] = useState("")
    const [loading, setLoading]=useState(false)
    const url = import.meta.env.VITE_API_URL;

    const submit = async(e) =>{
        e.preventDefault()
        setLoading(true);        
        console.log(action)
        //return
        try {
            const response = await validateAccount(url, email, action)           
           
            if(response.ok)
            {
                const envio = await sendActionRequest(url, action, email)
                //console.log(envio)
                
                if(envio.ok){
                    const result = await envio.json()
                    console.log(result)
                    toast.success(result.message)
                    return
                }
                const rs = await ApiHelpers(envio)
                toast.error(rs)
                return                
            }

            const respuesta = await ApiHelpers(response)
            toast.error(respuesta)           
             
        } catch (error) {
            toast.error("Hubo un error en la conexion con el servidor, porfavor intente más tarde")
            return  
        }finally{
            setLoading(false)
        }       
    }    
    return (
        <>
            <Header />
            <main className="flex-grow-1">
                {/* content main */}
                <div className="bg-custom-main my-4 pt-3 min-vh-60 d-flex flex-column justify-content-center">
                    <section className="container text-center text-white">
                        <h1 className="pt-2 pb-1 fw-bolder">Gestión de cuenta</h1>
                        <hr />
                        {loading ? <div className='text-center registrando'>Verificando...</div> : ""}                    
                        <div className="row">
                            <div className="col-12 w-50 mx-auto">
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Ingrese su correo electrónico
                                        </label>
                                        <input
                                            id="email"
                                            type="text"
                                            value={email}
                                            placeholder="cuenta@mail.com"
                                            onChange={(e)=>setEmail(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <select 
                                        name="action" 
                                        id="action" 
                                        className="form-select"
                                        value={action}
                                        onChange={(e)=> setAction(e.target.value)}
                                    >
                                        
                                        <option value="">Seleccione una acción</option>
                                                                        
                                        <option value="/api/activar-correo">Activación de cuenta</option>
                                        <option value="/api/forgot-password">Resetear password</option>
                                    </select>
                                    <div className="mb-3 mt-3">
                                        <input
                                            type="submit"
                                            className="btn btn-light custom-btn"
                                            value="Enviar"
                                        />
                                    </div>                                    
                                    <div className="mb-3">
                                        <p>
                                            <Link to="/auth/iniciar-sesion" className="text-white">
                                                Volver
                                            </Link>
                                        </p>
                                    </div>                                   
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}