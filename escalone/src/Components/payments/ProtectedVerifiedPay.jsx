import { Navigate } from "react-router-dom";

const ProtectedVerifiedPay = ({ children }) => {
    //nst modoPago = JSON.parse(sessionStorage.getItem("modo-pago"));
    const modoPago = localStorage.getItem("modo-pago")

    //console.log(modoPago)       
    if (!modoPago) {        
        //return
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedVerifiedPay;