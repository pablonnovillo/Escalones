import valid from "card-validator"
import { useEffect } from "react"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { initMercadoPago, Wallet, CardPayment } from "@mercadopago/sdk-react"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"

// Inicializa MercadoPago con tu Public Key
initMercadoPago('APP_USR-d278dbc6-286e-41aa-9a25-df50b7c7f332');

const Checkout = () => {

    const usuario = JSON.parse(sessionStorage.getItem('usuario'))

    const [showDirectForm, setShowDirectForm] = useState(false)
    const [showWallet, setShowWallet] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [preferenceId, setPreferenceId] = useState(null)
    const [email, setEmail] = useState(usuario ? usuario.email : "")
    const [modoEntrega, setModoEntrega] = useState('retiro-local')
    const [domicilio, setDomicilio] = useState('')
    const [carrito, setCarrito] = useState([])
    const [precioTotal, setPrecioTotal] = useState(0)
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: ""
    })

    const URL_API = import.meta.env.VITE_API_URL
    const URL = import.meta.env.VITE_HOST_URL
    const navigate = useNavigate()

    const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    useEffect(() => {
        const carritoCheckout = JSON.parse(localStorage.getItem('carrito')) || []
        const totalPrecio = localStorage.getItem("total_compra") || 0
        setPrecioTotal(totalCarrito)

        setCarrito(carritoCheckout)
    }, [])

    const verificarMonto = () => {
        if (totalCarrito <= 0) {
            toast.error("No hay productos en el carrito!");
            return false;
        }
        return true;
    };

    const actualizarCantidadProducto = (id, nuevaCantidad) => {
        const cant = parseInt(nuevaCantidad)
        if (isNaN(cant) || cant < 0) return

        const nuevoCarrito = carrito.map(item => {
            if (item.id === id) {
                return { ...item, cantidad: cant }
            }
            return item
        })
        setCarrito(nuevoCarrito)
    }

    const actualizarCarrito = (carrito, email, formaEntrega, domicilio) => {
        const pedidoCompleto = {
            productos: carrito.map(item => ({
                id: item.id,
                nombre: item.nombre,
                cantidad: item.cantidad,
                subtotal: item.precio * item.cantidad
            })),
            //...carrito,
            precio_total: totalCarrito,
            modo_entrega: formaEntrega,
            domicilio,
            email
        }
        localStorage.setItem('carrito_data', JSON.stringify(pedidoCompleto));
    }

    const eliminarProducto = (id) => {
        const nuevoCarrito = carrito.filter(function(item){
            return item.id!==id
        })

        setCarrito(nuevoCarrito)
        localStorage.setItem('carrito',JSON.stringify(nuevoCarrito))
    }


    const createPreference = async (e) => {
        e.preventDefault()
        if (!verificarMonto()) return; // <--- Bloqueo aquí
        setIsLoading(true)
        const esValido = await validarCarrito()
        
        if (!esValido) {
            setIsLoading(false)
            return
        }

        if (carrito.length === 0) {
            toast.error("No hay productos elegidos!")
            return
        }
        setShowDirectForm(false)
        setShowWallet(false)
        const methodPayment = "MercadoPago"
        localStorage.setItem("modo-pago", methodPayment)
        actualizarCarrito(carrito, email, modoEntrega, domicilio)

        try {
            const res = await fetch(`${URL_API}/api/mercadopago/preference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: `Pedido Mercaderia`,
                    quantity: 1,
                    price: totalCarrito,
                    email
                })
            })

            if(!res.ok) throw new Error("Error en la respuesta del servidor")

            const data = await res.json()
            //console.log(data)
            console.log(data.preferenceId)  
            if(data.preferenceId){
                console.log(data.preferenceId)  
                setPreferenceId(data.preferenceId)  

            }

            if(data.init_point){
                window.location.href=data.init_point;
            }
            else{
                setShowWallet(true)    
            }
            /*if (!res.ok) throw new Error()
            setPreferenceId(data.preferenceId)
            setShowWallet(true)

            if (data.init_point) {
                window.location.href = data.init_point
            }*/

        } catch (error) {
            console.log("error en la preferencia", error)
            toast.error("No se pudo procesaro el pago, intente más tarde")
        } finally {
            setIsLoading(false)
        }
    }

    const formatCardNumber = (value) =>
        value
            .replace(/\D/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();

    const formatExpiry = (value) => {
        const v = value.replace(/\D/g, "");
        if (v.length >= 3) return v.slice(0, 2) + "/" + v.slice(2, 4);
        return v;
    }

    const pagarDirecto = async (e) => {
        e.preventDefault()
        if (!verificarMonto()) return; // <--- Bloqueo aquí
        //alert("funciona!")
        console.log("funciona")
        setIsLoading(true)
        const esValido = await validarCarrito()
        if (!esValido) {
            setIsLoading(false)
            return
        }

        const { number, name, expiry, cvv } = cardData

        if (!number || !name || !expiry || !cvv) {
            toast.error("Por favor, ingrese los datos de la tarjeta")
            return
        }

        if (carrito.length === 0) {
            toast.error("No hay productos elegidos!")
            return
        }

        const numberValidation = valid.number(cardData.number)
        const expiryValidation = valid.expirationDate(cardData.expiry)
        const cvvValidation = valid.cvv(cardData.cvv)
        const methodPayment = numberValidation.card.niceType

        if (!numberValidation.isValid) {
            toast.error("Numero de tarjeta invalido")
            return
        }

        if (!expiryValidation.isValid) {
            toast.error("Fecha de vancimiento no valido")
            return
        }

        if (!cvvValidation.isValid) {
            toast.error("CVV no valido")
            return
        }

        localStorage.setItem("modo-pago", methodPayment)
        actualizarCarrito(carrito, email, modoEntrega, domicilio)

        setIsLoading(false)
        toast.success("Pagó confirmado", {
            onClose: () => navigate("/pago-verificado")
        })
    }

    const validarCarrito = async () => {
        try {
            const res = await fetch(`${URL_API}/api/validar-carrito`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    email_cliente: email,
                    modo_entrega: modoEntrega,
                    direccion_envio: domicilio
                })
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 422 && data.errors) {
                    const errores = Object.values(data.errors)
                    toast.error(errores[0][0])
                } else {
                    toast.error("Error al validar los datos")
                }
                return false
            }
            return true
        } catch (error) {
            console.log("error en la validación", error)
            toast.error("Error de conecion de servidor, intente más tarde")
            return false
        }
    }


    return (
        <main className="container my-5 flex-grow-1">
            {isLoading ? <div className='text-center enviando py-3'>Solicitando...</div> : ""}
            <div className="row g-4">
                {/** resumen compra */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 p-4">
                        <h4 className="custom-color-blue-marine mb-4 fw-bold border-bottom pb-2">
                            <i className="fa-solid fa-cart-shopping me-2"></i>Resumen de tu pedido
                        </h4>
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr className="text-muted small">
                                        <th>Producto</th>
                                        <th className="text-center">Cantidad</th>
                                        <th className="text-center">acción</th>
                                        <th className="text-end">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    {/*<div className="bg-light rounded p-2 me-3" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <i className="fa-solid fa-image text-muted"></i>
                                                        
                                                    </div>*/}
                                                    <img
                                                        src={`${URL}/images/tienda/${item.image}`}
                                                        alt={item.nombre}
                                                        style={{ width: "50px", height: "50px", objectFit: "contain" }}
                                                        className="me-3"
                                                    />
                                                    <div>
                                                        <span className="fw-bold d-block">{item.nombre}</span>
                                                        <small className="text-muted">AR$ {item.precio.toLocaleString()}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center fw-bold">
                                                <input
                                                    type="number"
                                                    className="form-control text-center f-bold shadow-sm w-50 mx-auto"
                                                    value={item.cantidad}
                                                    onChange={(e) => actualizarCantidadProducto(item.id, e.target.value)}
                                                    min="0"
                                                />
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-link text-danger p-0"
                                                    onClick={()=>eliminarProducto(item.id)}
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>                                                
                                            </td>
                                            <td className="text-end fw-bold w-25">AR$ {(item.precio * item.cantidad).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex flex-column align-items-end mt-4 border-top pt-3">
                            <div className="d-flex justify-content-between w-25">
                                <span className="text-muted">Subtotal:</span>
                                <span>AR$ {totalCarrito.toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <h4 className="fw-bold custom-color-blue-marine">Total:</h4>
                                <h4 className="fw-bold text-primary">AR$ {totalCarrito.toLocaleString()}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {/* COLUMNA DERECHA (4) - PASARELA DE PAGO */}
                <aside className="col-lg-4">

                    <div className="card shadow-sm border-0 p-4 bg-white">
                        <h4 className="mb-4 fw-bold">Finalizar Pago</h4>
                        {/* Simulación de usuario no logueado */}
                        <div className="mb-4">
                            {!usuario && (
                                <>
                                    <label className="form-label small fw-bold text-muted">Email para el recibo</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control border-0 bg-light py-2"
                                        placeholder="ejemplo@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </>
                            )}
                            <label className="form-label small fw-bold text-muted py-2">Entrega</label>
                            <div className="form-check mb-3">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="orderMode"
                                    id="received"
                                    value="retiro-local"
                                    checked={modoEntrega == "retiro-local"}
                                    onChange={() => setModoEntrega('retiro-local')}
                                />
                                <label className="form-check-label" htmlFor="received">Retiro por el local</label>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="orderMode"
                                    id="delivery"
                                    value="envio"
                                    checked={modoEntrega == "envio"}
                                    onChange={() => setModoEntrega('envio')}
                                />
                                <label className="form-check-label px-2" htmlFor="delivery">Envió a domicilio</label>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Ingrese su domicilio"
                                    disabled={modoEntrega !== "envio"}
                                    value={domicilio}
                                    onChange={(e) => setDomicilio(e.target.value)}
                                />
                            </div>
                        </div>

                        {!showDirectForm ? (
                            <div className="d-grid gap-3">
                                {/* Botón Mercado Pago */}

                                <button
                                    className="btn btn-warning fw-bold py-3 shadow-sm border-0"
                                    style={{ backgroundColor: '#f7e017' }}
                                    onClick={createPreference}
                                    disabled={isLoading}
                                >
                                    <i className="fa-solid fa-bolt me-2"></i>Pagar con Mercado Pago
                                </button>

                                <div className="text-center position-relative my-2">
                                    <hr />
                                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">O PAGAR CON</span>
                                </div>

                                {/* Botón Tarjeta Personal */}
                                <button
                                    className="btn btn-dark py-3 shadow-sm border-0"
                                    onClick={() => setShowDirectForm(true)}
                                    disabled={isLoading}
                                >
                                    <i className="fa-solid fa-credit-card me-2"></i>Tarjeta de Crédito / Débito
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h6 className="fw-bold mb-3"><i className="fa-solid fa-lock me-2"></i>Datos de la tarjeta</h6>
                                <form onSubmit={pagarDirecto}>
                                    <div className="mb-3">
                                        <input
                                            className="form-control border-0 bg-light"
                                            placeholder="0000 0000 0000 0000"
                                            value={cardData.number}
                                            onChange={e => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            className="form-control border-0 bg-light text-uppercase"
                                            placeholder="Nombre como figura en la tarjeta"
                                            style={{ textTransform: 'uppercase' }}
                                            onChange={e => setCardData({ ...cardData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="row g-2 mb-4">
                                        <div className="col-6">
                                            <input
                                                className="form-control border-0 bg-light"
                                                placeholder="MM/AA"
                                                value={cardData.expiry}
                                                onChange={e => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <input
                                                className="form-control border-0 bg-light"
                                                type="password"
                                                placeholder="CVC"
                                                value={cardData.cvv}
                                                onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary w-100 py-3 fw-bold mb-2">
                                        Confirmar Compra
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link w-100 text-muted small text-decoration-none"
                                        onClick={() => setShowDirectForm(false)}
                                    >
                                        <i className="fa-solid fa-chevron-left me-1"></i> Volver a métodos de pago
                                    </button>
                                </form>
                            </div>
                        )}

                        {showWallet && preferenceId && (
                            <div className="mt-3">
                                <Wallet initialization={{ preferenceId }} />
                            </div>
                        )}

                        <div className="mt-4 text-center">
                            <img src="/images/tienda/cart/visa.png" width="30" alt="visa" className="me-2" />
                            <img src="/images/tienda/cart/mastercard.png" width="30" alt="mastercard" className="me-2" />
                            <img src="/images/tienda/cart/mercadopago.jpg" width="30" alt="mercadopago" />
                            <p className="text-muted small mt-2"><i className="fa-solid fa-shield-halved"></i> Pago 100% seguro</p>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    )
}

export default Checkout