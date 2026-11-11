import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCleanStorage } from "../hooks/useCleanStorage";
import { useLogout } from "../hooks/useLogout";

const Header = () => {
    const navigate = useNavigate();
    const currentPath = window.location.pathname
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    console.log(usuario)

    const { logout } = useLogout()   

    // Ejecuta la limpieza de storage    
    useCleanStorage(currentPath)    

    const perfilCarnet = "../images/carnet-m.png"

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-custom-main navbar-dark">
                <div className="container">
                    <Link className="navbar-brand custom_brand" to="/">
                        <img src='../../images/logo1.png' alt="Escalones" className="container_logo" />
                        ESCALONES
                    </Link>
                    { usuario ? (
                        <div className="ms-auto d-lg-none">
                            <ul className="navbar-nav ms-auto pe-2 d-flex flex-row align-items-center">                        
                                <li className="nav-item active">
                                    <Link to="/auth/datos-personales" className="text-white text-decoration-none">Hola, {usuario.nombre_usuario}</Link> 
                                </li>   
                                 <div className="">
                                    &nbsp;&nbsp;<img 
                                        className="rounded-circle border border-2 border-white"
                                        src={usuario.imagen_perfil || perfilCarnet } 
                                        alt={`Foto de ${usuario.nombre_usuario}`}
                                        style={{
                                            width:"35px",
                                            height:"35px",
                                            objectFit:"cover"
                                        }}
                                        onError={(e)=>{
                                            e.target.onerror = null;
                                            e.target.src = perfilCarnet
                                        }}
                                     />
                                </div>
                                <li className="nav-item ps-2">
                                    <a className="btn btn-danger btn-sm" href="" onClick={logout}>Salir</a>
                                </li>                                
                            </ul> 
                                  
                        </div>            
                    ):(
                        <div className="ms-auto d-lg-none">
                            <ul className="navbar-nav ms-auto pe-2 d-flex flex-row flex-wrap">                        
                                <li className="nav-item active">
                                    <Link to="/auth/iniciar-sesion" className="nav-link pe-2 ">
                                        &nbsp;<i className="fa-solid fa-user"></i>&nbsp;&nbsp; Sign In
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to="/auth/registro" className="nav-link ps-2 "><i className="fa-regular fa-square-caret-up"></i> &nbsp; Sign up</Link>
                                </li>
                            </ul>
                        </div>                    
                    )}                   
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
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
                            <li className="nav-item border-bottom-md">
                                <Link to="/tienda/checkout" className={`nav-link active ${currentPath === "/tienda/checkout" ? "border-bottom" : ""}`}><i className="fa-solid fa-bag-shopping"></i> <span className="d-lg-none"> &nbsp;&nbsp;Tienda</span></Link>
                            </li>
                            {/*{usuario ? (
                                <li className="nav-item border-bottom-md">
                                    <Link to="/auth/reservas" className="nav-link active">Mis Reservas</Link>
                                </li>
                            ) : (<></>)}*/}
                            {usuario && (
                                 <li className="nav-item border-bottom-md">
                                    <Link to="/auth/reservas" className="nav-link active">Mis Reservas</Link>
                                </li>
                            )}

                            {/* Mostrar email si hay sesión, sino link de login */}
                            {usuario ? (
                                <div className="dropdown d-none d-lg-block d-xl-block">
                                  <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hola, {usuario.nombre_usuario}
                                    &nbsp;&nbsp; 
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/auth/datos-personales">Datos Personales</Link></li>                                    
                                    <li><a className="dropdown-item" href="" onClick={logout}>Salir</a></li>                                
                                  </ul>                                  
                                </div>                                                                                                
                            ) : (
                                <>
                                    <li className="nav-item border-bottom-md d-none d-lg-block d-xl-block">
                                        <Link to="/auth/iniciar-sesion" className={`nav-link active ${currentPath === "/iniciar-sesion" ? "border-bottom" : ""}`}>&nbsp;<i className="fa-solid fa-user"></i>&nbsp;&nbsp;Login</Link>                                        
                                    </li>
                                    <li className="nav-item border-bottom-md d-none d-lg-block d-xl-block">
                                        <Link to="/auth/registro" className={`nav-link active ${currentPath === "/iniciar-sesion" ? "border-bottom" : ""}`}>&nbsp;<i className="fa-regular fa-square-caret-up"></i>&nbsp;&nbsp;Crea tu cuenta</Link>
                                    </li>                                
                                </>                               
                                /*<li className="nav-item style-login">
                                    <Link to="/auth/iniciar-sesion" className="nav-link active">Iniciar sesión / Registrarse</Link>
                                </li>*/
                            )}
                        </ul>
                        { usuario && (
                            <div className="ms-lg-3 mt-2 mt-lg-0 d-none d-lg-block d-xl-block">
                                <img 
                                    className="rounded-circle border border-2 border-white"
                                    src={usuario.imagen_perfil || perfilCarnet } 
                                    alt={`Foto de ${usuario.nombre_usuario}`}
                                    style={{
                                        width:"45px",
                                        height:"45px",
                                        objectFit:"cover"
                                    }}
                                    onError={(e)=>{
                                        e.target.onerror = null;
                                        e.target.src = perfilCarnet
                                    }}
                                 />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <ToastContainer position="top-right" autoClose={2500} theme="dark" />
        </header>
    );
};

export default Header;