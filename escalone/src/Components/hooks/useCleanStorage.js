import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useCleanStorage = (pathname) => {
    //const location = useLocation();    
    const rutas = [
        "/pago-verificado",
        "/pago-rechazado",
        "/tienda/checkout",
        "/servicios/confirmar-servicio",
        "/en-mantenimiento"
    ];

    useEffect(() => {
        if (!rutas.includes(pathname)) {
            localStorage.removeItem("modo-pago");
            localStorage.removeItem("carrito_data");
        }
    }, [location.pathname]);
};