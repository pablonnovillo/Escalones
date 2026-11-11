import React, {useState, useEffect} from "react"
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiHelpers } from "../utils/apiHelpers";

const PerfilAuth = () => {

  const URL_API = import.meta.env.VITE_API_URL
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [totalReservas, setTotalReservas] = useState(0)
  const [totalImpresiones, setTotalImpresiones] = useState(0)

  const [formData, setFormData] = useState({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
    });
  const [avatar, setAvatar] = useState("/images/carnet-m.png"); 
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(()=>{
    const usuarioPerfil = sessionStorage.getItem("usuario");

    //console.log(usuarioPerfil)

    if(usuarioPerfil){
      try{
        const user = JSON.parse(usuarioPerfil)

        setFormData((prev)=>({
          ...prev,
          nombre: user.nombre_usuario || prev.nombre,
          email: user.email || prev.email,
          apellido: user.apellido,
          telefono: user.telefono
        }))

        if(user.imagen_perfil)
        {
          setAvatar(user.imagen_perfil)
        }else{
          setAvatar("/images/carnet-m.png");
        }

      }catch(error){
        console.error("Error al leer sessionStorage", error);
      }
    }
    obtenerTotalReservas();
    obtenerTotalImpresiones();
  }, [])

  const obtenerTotalReservas = async()=>{
    try{
        const token = sessionStorage.getItem("token")

        const resp = await fetch(`${URL_API}/api/mis-reservas`,{
          method:"GET",
          headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })

        if(resp.ok){
          const result = await resp.json();

          if(Array.isArray(result.data)){
            setTotalReservas(result.data.length)
          }
        }

    }catch(error){
      console.log("Error al obtener reservas");
    }
  }

  const obtenerTotalImpresiones = async()=>{
    try{
      const token = sessionStorage.getItem("token")

      const resp = await fetch(`${URL_API}/api/mis-impresiones`,{
        method:"GET",
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      })     

      if(resp.ok)
      {
        const result = await resp.json();

        //console.log(result.data)
        if(Array.isArray(result.data)){
          setTotalImpresiones(result.data.length)
        }
      }

    }catch(error){
      console.log("Error al obtener impresiones")
    }
  }


  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
      if (file) {
        setSelectedFile(file)
        setAvatar(URL.createObjectURL(file));
      }
  };

  const handleSave = async (e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      const token = sessionStorage.getItem('token');

      const bodyData = new FormData();

      bodyData.append("nombre_usuario", formData.nombre);
      bodyData.append("apellido", formData.apellido || "");
      bodyData.append("eamil",formData.email);
      bodyData.append("telefono", formData.telefono || "");

      if(selectedFile){
        bodyData.append("imagen_perfil", selectedFile);        
      }

      const resp = await fetch(`${URL_API}/api/update-profile`,{
        method:"POST",
        headers:{
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: bodyData,
      });

      const result = await resp.json();
      if(resp.ok){
        const usuarioStorage = JSON.parse(sessionStorage.getItem("usuario") || {});
        const usuarioActualizado = {
          ...usuarioStorage,
          nombre_usuario: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          imagen_perfil: result.user?.imagen_perfil || avatar,
        }      

        sessionStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

        //Si la API devolvio la nueva URL de la imagen, actualizar el estado avatar
        if(result.user?.imagen_perfil){
          setAvatar(result.user.imagen_perfil);
        }
        setSelectedFile(null);
        setIsEditing(false);
        //alert("Perfil actualizado correctamente");
        toast.success(result.message)

      }else{
        //alert(result.message || result.error || "Error al actualizar el perfil");
        const respuesta = await ApiHelpers(resp)
        console.log(respuesta)
        toast.error(respuesta)
      }
    }catch(error){
      console.error("Error al guardar perfil", error)
      //alert("Ocurrio un error de conexion al guardar los datos.");
      if(error instanceof TypeError)
      {
        toast.error("El servidor no está disponible. Por favor Intente más tarde")
        return
      }
      toast.error(error.message || error.error)
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="container py-5 flex-grow-1">
      {loading ? <div className='text-center enviando'>Actualizando</div> : ""}                    
      <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
        <div className="row align-items-center">

          {/* Columna Derecha: Información / Inputs */}
          <div className="col-lg-9 ps-lg-4 mt-4 mt-lg-0">
            <form onSubmit={(e) => e.preventDefault()}>
              
              {/* Encabezado con Nombre Principal */}
              <div className="mb-3">
                {isEditing ? (
                  <div className="row g-2 mb-2">
                    <div className="col-md-6">
                      <label className="form-label text-muted small mb-1">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small mb-1">Apellido</label>
                      <input
                        type="text"
                        className="form-control"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="fw-bold mb-0 text-dark">
                      {formData.nombre} {formData.apellido}
                    </h2>
                    <span className="fw-semibold" style={{ color: "#0099ff" }}>
                      Usuario Registrado
                    </span>
                  </div>
                )}
              </div>

              <hr className="my-3 text-muted opacity-25" />

              {/* Detalle de datos */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="text-muted small d-block mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="fw-bold text-dark fs-6">{formData.email}</span>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="text-muted small d-block mb-1">Teléfono</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="telefono"
                      value={formData.telefono ?? ''}
                      onChange={handleChange}
                    />
                  ) : (
                    <span className="fw-bold text-dark fs-6">{formatPhoneNumber(formData.telefono)}</span>
                  )}
                </div>
              </div>

              {/* Métricas o badges inferiores opcionales */}
              <div className="row text-center mt-4 pt-3 border-top g-2 d-flex justify-content-center">                
                <div className="col-4">
                  <span className="text-muted small d-block">Reservas</span>
                  <span className="fw-bold fs-4" style={{ color: "#003b6d" }}>{totalReservas}</span>
                </div>
                <div className="col-4">
                  <span className="text-muted small d-block">Impresiones</span>
                  <span className="fw-bold fs-4" style={{ color: "#003b6d" }}>{totalImpresiones}</span>
                </div>
                {/*<div className="col-4">
                  <span className="text-muted small d-block">Estado</span>
                  <span className="badge bg-success mt-1">Activo</span>
                </div>*/}
              </div>

            </form>
          </div>
          {/* Columna Izquierda: Foto y Botones */}
          <div className="col-lg-3 text-center border-end-lg pe-lg-4">
            <div className="position-relative d-inline-block mb-3">
              <img
                src={avatar}
                alt="Foto de perfil"
                className="rounded-circle shadow-sm"
                referrerPolicy="no-referrer"
                style={{ width: "140px", height: "140px", objectFit: "cover" }}
              />
            </div>

            {/* Input para cambiar imagen sólo cuando se edita */}
            {isEditing && (
              <div className="mb-3">
                <label
                  htmlFor="file-input"
                  className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold"
                >
                  Cambiar foto
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageChange}
                />
              </div>
            )}

            {/* Acciones principales debajo de la foto */}
            <div className="d-flex flex-column gap-2 mt-2">
              {!isEditing ? (
                <button
                  type="button"
                  className="btn text-white fw-bold rounded-pill py-2 shadow-sm"
                  style={{ backgroundColor: "#0099ff" }}
                  onClick={() => setIsEditing(true)}
                >
                  Modificar datos
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn text-white fw-bold rounded-pill py-2 shadow-sm"
                    style={{ backgroundColor: "#003b6d" }}
                    //onClick={() => setIsEditing(false)}
                    onClick={handleSave}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-light text-secondary fw-bold rounded-pill py-1"
                    onClick={() => {
                      setSelectedFile(null)
                      setIsEditing(false)
                    }}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PerfilAuth;