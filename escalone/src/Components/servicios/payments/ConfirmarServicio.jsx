import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import valid from "card-validator"
import { formatCardNumber, formatExpiry } from "../../utils/formatCard";
import { handleCreatePreference, handlePagarDirecto } from "../../utils/paymentUtils";
import DetailsTurno from "../sectionServices/detailsTurno";
import DetailsPrinting from "../sectionServices/detailsPrinting";

// Inicializa MercadoPago con tu Public Key
initMercadoPago('APP_USR-d278dbc6-286e-41aa-9a25-df50b7c7f332');

const ConfirmarServicio = () => {
    const [datos, setDatos] = useState(null);
    const [tipoServicio, setTipoServicio] = useState(null);
    const [serviceTitle, setServiceTitle] = useState("");
    const [serviceSenia, setServiceSenia] = useState(0);
    const [servicePrecio, setServicePrecio] = useState(0);
    const [adicional, setAdicional] = useState("");

    const [email, setEmail] = useState("");
    const [preferenceId, setPreferenceId] = useState(null);
    const [showWallet, setShowWallet] = useState(false);
      
    const [showDirectForm, setShowDirectForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    })
    
    const url = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    // Cargar datos desde localStorage
    useEffect(() => {
        const turno = localStorage.getItem("turno");
        const impresiones = localStorage.getItem("imprimir");
        console.log(turno)
        console.log(impresiones)

        try {
            if (turno) {
                const data = JSON.parse(turno);
                setTipoServicio("turno");
                setDatos(data);
                setServiceTitle(data.servicio); //el tipo se servicio es Juego o Bar
                setServiceSenia(data.senia)
                setServicePrecio(data.precio);
                setEmail(data.email)
                if (data.adicional) setAdicional(data.adicional);
                return
            } 
            if (impresiones) {
                const data = JSON.parse(impresiones);
                setTipoServicio("imprimir");
                setDatos(data);
                setServiceTitle("impresiones");
                setServiceSenia(data.senia);
                setServicePrecio(data.precioTotal);
                setEmail(data.email)
                return
            } 
            navigate('/');
            return        
        } catch (e) {
            console.error("Error al parsear localStorage:", e);
            navigate('/');
        }
    }, []);

    return (
        <section id="payments" className="mb-3">
            <h1 className="text-center my-3">Confirmar Servicio</h1>
            <div className="container">
                <div className="row">
                    {/* Resumen del Servicio */}
                    <div className="col-lg-6 border-end">
                        {tipoServicio === "turno" && datos && (
                            <DetailsTurno 
                                serviceTitle={serviceTitle}
                                datos={datos}
                                adicional={adicional}
                                servicePrecio={servicePrecio}
                            />                            
                        )}
                        {tipoServicio === "imprimir" && datos && (
                            <DetailsPrinting
                                datos={datos}
                            />
                        )}
                    </div>

                    {/* Métodos de Pago */}
                    <section className="col-lg-6 border-start py-3">
                        <h3 className="text-center py-2">Método de Pago</h3>                      

                        {/* Botones */} 
                        {!showDirectForm && (
                            <div className="text-center mb-4">
                                <button
                                    className="btn btn-warning w-75 my-2"
                                    onClick={()=>handleCreatePreference({
                                        setIsLoading, 
                                        setShowDirectForm, 
                                        setShowWallet, 
                                        setPreferenceId, 
                                        url, 
                                        serviceTitle,
                                        serviceSenia,
                                        email,
                                        toast
                                    })}
                                    disabled={isLoading}
                                >
                                    Pagar con MercadoPago
                                </button>
                                <button
                                    className="btn btn-dark w-75 my-2"
                                    onClick={() => setShowDirectForm(prev => !prev)}
                                    disabled={isLoading}
                                >
                                    Pagar con Tarjeta
                                </button>
                            </div>
                        )}

                        {showWallet && preferenceId && (
                            <div className="mt-3">
                                <Wallet initialization={{ preferenceId }} />
                            </div>
                        )}                        

                        {/* CardPayment */}
                        {showDirectForm && (
                            <form className="w-75 mx-auto mt-4" onSubmit={(e)=>handlePagarDirecto(e, {
                                cardData,
                                valid,
                                toast,
                                navigate
                            })}>
                                <h5 className="text-center mb-3">Pago con Tarjeta</h5>
                                <input
                                    className="form-control mb-2"
                                    placeholder="Número de tarjeta"
                                    value={cardData.number}
                                    onChange={e => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}                                    
                                />
                                <input
                                    className="form-control mb-2"
                                    placeholder="Nombre del titular"
                                    style={{textTransform:'uppercase'}}
                                    value={cardData.name}
                                    onChange={e => setCardData({ ...cardData, name: e.target.value })}                                    
                                />
                                <div className="d-flex gab-2">
                                    <input
                                        className="form-control"
                                        placeholder="MM/AA"
                                        value={cardData.expiry}
                                        onChange={e => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}                                        
                                    />
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="CVV"
                                        value={cardData.cvv}
                                        onChange={e => setCardData({ ...cardData, cvv: e.target.value })}                                        
                                    />
                                </div>
                                <button className="btn btn-success w-100 mt-3">
                                    Confirmar Pago
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 mt-2"
                                    onClick={() => setShowDirectForm(false)} // volver a las opciones
                                >
                                    Volver
                                </button>
                            </form>
                        )}

                    </section>
                </div>
            </div>
        </section>
    );
};

export default ConfirmarServicio;
