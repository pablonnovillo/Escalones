import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('token');
        toast.info("¡Hasta luego! Sesión finalizada.", {
            onClose: () => navigate("/"),
        });
    };

    return { logout };
};