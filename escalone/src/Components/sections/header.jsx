import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCleanStorage } from "../hooks/useCleanStorage";
import { useLogout } from "../hooks/useLogout";

const Header = () => {
    const navigate = useNavigate();
    const currentPath = window.location.pathname
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    const { logout } = useLogout()   

    // Ejecuta la limpieza de storage    
    useCleanStorage(currentPath)    

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-custom-main navbar-dark">
                <div className="container">
                    <Link className="navbar-brand custom_brand" to="/">
                        <img src='./../images/logo1.png' alt="logo" className="container_logo" />
                        ESCALONES
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item border-bottom-md">
                                <Link to="/" className={`nav-link active ${currentPath === "/" ? "border-bottom" : ""}`} aria-current="page">Inicio</Link>
                            </li>
                            <li className="nav-item border-bottom-md">
                                <Link to="/servicios" className={`nav-link active ${currentPath === "/servicios" ? "border-bottom" : ""}`}>Servicios</Link>
                            </li>
                            <li className="nav-item border-bottom-md">
                                <Link to="/tienda" className={`nav-link active ${currentPath === "/tienda" ? "border-bottom" : ""}`}>Tienda</Link>
                            </li>
                            <li className="nav-item border-bottom-md">
                                <Link to="/nosotros" className={`nav-link active ${currentPath === "/nosotros" ? "border-bottom" : ""}`}>Nosotros</Link>
                            </li>
                            <li className="nav-item border-bottom-md">
                                <Link to="/contacto" className={`nav-link active ${currentPath === "/contacto" ? "border-bottom" : ""}`}>Contacto</Link>
                            </li>
                            {usuario ? (
                                <li className="nav-item border-bottom-md">
                                    <Link to="/auth/reservas" className="nav-link active">Mis Reservas</Link>
                                </li>
                            ) : (<></>)}
                            <li className="nav-item border-bottom-md">
                                <Link to="/tienda/checkout" className={`nav-link active ${currentPath === "/en-mantenimiento" ? "border-bottom" : ""}`}><i className="fa-solid fa-bag-shopping"></i></Link>
                            </li>
                            {/* Mostrar email si hay sesión, sino link de login */}
                            {usuario ? (
                                <li className="nav-item style-login">
                                    <span style={{ cursor: "pointer", color: "#000" }} onClick={logout} className="nav-link ctive">{usuario.email} <i className="fa-solid fa-arrow-right-from-bracket"></i></span>
                                </li>
                            ) : (
                                <li className="nav-item style-login">
                                    <Link to="/auth/iniciar-sesion" className="nav-link active">Iniciar sesión / Registrarse</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <ToastContainer position="top-right" autoClose={2500} theme="dark" />
        </header>
    );
};

export default Header;