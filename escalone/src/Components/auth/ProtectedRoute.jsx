import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    //console.log(usuario)   

    if (!usuario) {
        //alert("se cumplio el !usuario")
        //return
        return <Navigate to="/auth/iniciar-sesion" replace />;
    }

    return children;
};

export default ProtectedRoute;