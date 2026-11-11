import BeneficiosRegistrarse from "../Components/login/BeneficiosRegistrarse";
import {Routes, Route} from "react-router-dom"
import Footer from "../Components/sections/footer";
import Header from "../Components/sections/header";
import RegisterForm from "../Components/login/RegisterForm";
import LoginForm from "../Components/login/LoginForm";
import Reservas from "./ReservasPage";
import Perfil from "./PerfilPage";
import ProtectedRoute from "../Components/auth/ProtectedRoute";
import PublicRoute from "../Components/login/PublicRoute";

export default function Authentication() {

    const usuario = JSON.parse(sessionStorage.getItem("usuario"))

    return (
        <>
        <Header/>
        {/*<AuthForm/>*/}
        <Routes>
            <Route path="iniciar-sesion" element={<PublicRoute><LoginForm /></PublicRoute>} />
            <Route path="registro" element={<PublicRoute>< RegisterForm/></PublicRoute>} />                           
            <Route path="reservas" element={<ProtectedRoute><Reservas/></ProtectedRoute>} />                       
            <Route path="datos-personales" element={<ProtectedRoute><Perfil/></ProtectedRoute>}></Route>
        </Routes>
        {!usuario && <BeneficiosRegistrarse/>}
        
        <Footer/>
        </>
    )
}