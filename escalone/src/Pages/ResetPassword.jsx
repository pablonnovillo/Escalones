// src/pages/ResetPassword.jsx
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Header from "../Components/sections/header";
import Footer from "../Components/sections/footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { resetPasswordRequest } from "../Components/utils/accountManagement";
import { ApiHelpers } from "../Components/utils/apiHelpers";

export default function ResetPassword() {
    const [params] = useSearchParams();
    const email = params.get("email");
    const token = params.get("token");

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const URL = import.meta.env.VITE_API_URL

    const submit = async (e) => {
        e.preventDefault();
        if (loading) return
        setLoading(true)
        try {
            const resp = await resetPasswordRequest(URL, {
                email,
                token,
                password,
                passwordConfirmation
            })           

            if (resp.ok) {
                const resData = await resp.json()
                toast.success(resData.message || "Contraseña actualizada", {
                    onClose: () => navigate("/auth/iniciar-sesion"),
                    autoClose: 2500
                })
                return
            }
            
            const respuesta = await ApiHelpers(resp)
            console.log(respuesta)
            toast.error(respuesta)            
           

        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message || "Error al resetear contraseña"
            )
        } finally {
            setLoading(false)
        }       
    };

    return (
        <>
            <Header />
            <main className="flex-grow-1">
                {/* content main */}
                <div className="bg-custom-main my-4 pt-3 min-vh-60 d-flex flex-column justify-content-center">
                    <section className="container text-center text-white">
                        <h1 className="pt-2 fw-bolder">Resetear contraseña</h1>
                        <hr />
                        {loading ? <div className='text-center registrando'>Enviando...</div> : ""}
                        <div className="row">
                            <div className="col-12 w-50 mx-auto">
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            placeholder="Nueva contraseña"
                                            className="form-control"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            placeholder="Confirmar contraseña"
                                            className="form-control"
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-light custom-btn">Resetear</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
