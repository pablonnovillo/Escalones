import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es";
import 'flatpickr/dist/flatpickr.min.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CAFE_PRECIOS, SWEET_PRECIOS } from '../dataConstants/price';
import { getImagenConsumo, generarDatosTurnos } from '../utils/reservaFunctions';
import { limpiarLocalStorage } from '../utils/storageHelpers';
import { ApiHelpers } from '../utils/apiHelpers';

const ReservasTurnos = () => {
    const navigate = useNavigate()
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))
    const [selectedDate, setSelectedDate] = useState(null)
    const [selected, setSelected] = useState(null)
    const [horaInicio, setHoraInicio] = useState("09:00")
    const [horaFinal, setHoraFinal] = useState("08:00")
    const [email, setEmail] = useState(usuario ? usuario.email : "")
    const [tipoCafe, setTipoCafe] = useState("")
    const [sweet, setSweet] = useState("")
    const [foot, setFoot] = useState(0.00)
    const [loading, setLoading] = useState(false)

    const url = import.meta.env.VITE_API_URL;

    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const servicio = pathParts[pathParts.length - 1]; 
    //console.log(servicio)
    useEffect(() => {
        const precioCafe = tipoCafe ? CAFE_PRECIOS[tipoCafe] || 0 : 0
        const precioPostre = sweet ? SWEET_PRECIOS[sweet] || 0 : 0
        setFoot(precioCafe + precioPostre);
        setSelected(servicio)
    }, [tipoCafe, sweet, servicio])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        window.scrollTo({ top: 200, behavior: "smooth" })
        try {
            const response = await fetch(`${url}/api/validar-reserva`,
                {
                method: "POST",
                headers: {
                     "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ fecha: selectedDate, hora_inicio: horaInicio, hora_final: horaFinal, email_cliente: email })
            })

            if (response.ok) {
                setLoading(false)
                const datosTurno = generarDatosTurnos({
                    horaInicio,
                    horaFinal,
                    foot,
                    tipoCafe,
                    sweet,
                    email,
                    selected,
                    selectedDate
                }) 
                limpiarLocalStorage();                
                localStorage.setItem("turno", JSON.stringify(datosTurno))
                toast.success("Redirigiendo a la confirmación del turno", {
                    onClose: () => navigate("/servicios/confirmar-servicio"),
                });
                return
            }

            const respuesta = await ApiHelpers(response)

            console.log(respuesta)

            toast.error(respuesta)
        }
        catch (error) {
            //console.log(error)
            toast.error("No hemos tenido respuesta del servidor, intente mas tarde")
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <section id="order" className="mb-3">
                <h1 className="text-center mt-3">RESERVA SU TURNO</h1>
                <section>
                    <hr className="container" />
                    {loading ? <div className='text-center enviando'>Enviando...</div> : ""}
                    <section>
                        <form className="py-1" id="form-turno" onSubmit={handleSubmit}>
                            <div className="container">
                                <div className="row">
                                    <section className="row">
                                        <h2 className="h3 py-3 fw-bolder text-center custom-color-blue-marine">
                                            Selecciona día y horario
                                        </h2>
                                        <section className="col-md-6 d-flex justify-content-md-end justify-content-center p-3 border-md-end border-2 mb-md-2">
                                            {/* Contenedor del almanaque */}
                                            <Flatpickr
                                                value={selectedDate}
                                                onChange={(dates, dateStr) => setSelectedDate(dateStr)}
                                                options={{
                                                    minDate: "today",
                                                    maxDate: new Date(new Date().getFullYear() + 1, 11, 31),
                                                    dateFormat: "Y-m-d",
                                                    locale: Spanish,
                                                    inline: true
                                                }}
                                                className="fw-bold fs-4"
                                            />
                                        </section>
                                        <div className="col-md-6 px-3">
                                            <div className="d-flex justify-content-md-start justify-content-center">
                                                <div className="mb-3 me-5 me-md-3">
                                                    <label
                                                        htmlFor="startTime"
                                                        className="custom-color-blue-marine"
                                                    >Desde</label>
                                                    <br />
                                                    <select
                                                        name="startTime"
                                                        id="startTime"
                                                        value={horaInicio}
                                                        className="form-select"
                                                        onChange={(e) => setHoraInicio(e.target.value)}
                                                    >
                                                        <option value="">--</option>
                                                        {
                                                            Array.from({ length: 23 }, (_, i) => {
                                                                const hora = 1 + i;
                                                                const value = `${hora.toString().padStart(2, "0")}:00`;
                                                                return (
                                                                    <option key={value} value={value}>{value}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-3 ms-5 ms-md-3">
                                                    <label htmlFor="endTime" className="custom-color-blue-marine">
                                                        Hasta
                                                    </label>
                                                    <br />
                                                    <select
                                                        name="endTime"
                                                        id="endTime"
                                                        value={horaFinal}
                                                        className="form-select"
                                                        onChange={(e) => setHoraFinal(e.target.value)}
                                                    >
                                                        <option value="">--</option>
                                                        {
                                                            Array.from({ length: 23 }, (_, i) => {
                                                                const hora = 1 + i;
                                                                const value = `${hora.toString().padStart(2, "0")}:00`;
                                                                return (
                                                                    <option key={value} value={value}>{value}</option>
                                                                )
                                                            })
                                                        }
                                                        <option value="23:59"> 23:59 </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <p className="custom-color-blue-marine text-center text-md-start">
                                                Se cobrará un 50% por adelantado para reservar
                                            </p>
                                            {!usuario && (<section className="mb-3">
                                                <label htmlFor="email">Ingrese su email</label>
                                                <input
                                                    id="email"
                                                    className="form-control w-75"
                                                    type="text"
                                                    name="email"
                                                    value={email}
                                                    placeholder="usuario@mail.com"
                                                    onChange={(e) => setEmail(e.target.value)}

                                                />
                                            </section>)}
                                            <hr />
                                            <section className='width-md-50'>
                                                <h3 className='text-center text-md-start py-2 h4'>Consumisión opcional</h3>
                                                <div className="d-flex justify-content-md-start justify-content-center">
                                                    <div className="mb-3 me-3">
                                                        <label
                                                            htmlFor="cafe"
                                                            className="text-center custom-color-blue-marine d-block"
                                                        ><i className="fa-solid fa-mug-saucer"></i></label>
                                                        <select
                                                            name="cafe"
                                                            id="cafe"
                                                            value={tipoCafe}
                                                            className="form-select"
                                                            onChange={(e) => setTipoCafe(e.target.value)}
                                                        >
                                                            <option value="">Seleccioná Café </option>
                                                            {
                                                                Object.keys(CAFE_PRECIOS).map((cofe) => (
                                                                    <option key={cofe} value={cofe}>{cofe}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="mb-3 ms-3">
                                                        <label htmlFor="sweet" className="custom-color-blue-marine text-center d-block">
                                                            <i className="fa-solid fa-burger"></i>
                                                        </label>
                                                        <select
                                                            name="sweet"
                                                            id="sweet"
                                                            value={sweet}
                                                            className="form-select"
                                                            onChange={(e) => setSweet(e.target.value)}
                                                        >
                                                            <option value="">Seleccioná postre</option>
                                                            {
                                                                Object.keys(SWEET_PRECIOS).map((sw) => (
                                                                    <option key={sw} value={sw}>{sw}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* IMAGEN DINAMICA */}
                                                {getImagenConsumo(tipoCafe, sweet) && (<div className='text-center py-3'>
                                                    <img src={getImagenConsumo(tipoCafe, sweet)} alt="consumo" width="25%" />
                                                </div>)}
                                                <p className="h5 text-center text-md-start">Precio adicional:$ {foot || 0}</p>
                                            </section>
                                        </div>

                                    </section>
                                    <div className="row pt-3">
                                        <div className="mb text-center w-100">
                                            <input
                                                type="submit"
                                                className="btn btn-dark custom-bg-blue-marine"
                                                value="Solicitar Turno"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                </section>
            </section>
        </>
    )
}

export default ReservasTurnos;