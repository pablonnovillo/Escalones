import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Shop = () => {

    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const URL_API = import.meta.env.VITE_API_URL
    const URL = import.meta.env.VITE_HOST_URL

    useEffect(() => {
        (async function(){
            await fetchProductos()
            await fetchCategorias()
        })()
        
    }, [])

    const filtrarCategoria = async (nombreCategoria) => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`${URL_API}/api/productos/filtrar?categoria=${nombreCategoria}`)
            if (!response.ok) {
                throw new Error("Error en la carga de filto de productos")
            }
            const result = await response.json()
            console.log(result)
            if (result.data) {

                setProductos(result.data)
                if (result.data.length === 0) {
                    setError(result.mensaje)
                }
            }
        } catch (error) {
            console.log(error)
            setError(`No se pudo realizar el filtro de la categoria ${nombreCategoria}`)
        } finally {
            setLoading(false)
        }

    }

    const fetchCategorias = async () => {
        try {
            const response = await fetch(`${URL_API}/api/categorias`);
            const result = await response.json()
            if (result.status) {
                setCategorias(result.data)
            }
            console.log(result)
        } catch (error) {
            console.log(error)
            setError("No se pudieron cargar las categorias")
        }
    }

    const fetchProductos = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${URL_API}/api/productos`)

            if (!response.ok) {
                throw new Error("error en las respuesta del servidor")
            }

            const result = await response.json()

            if (result.status) {
                setProductos(result.data)
            }

        } catch (error) {
            console.log(error)
            setError("No se pudieron cargar los productos")
        } finally {
            setLoading(false)
        }
    }

    const agregarAlCarrito = (prod) => {
        const carritoActual = JSON.parse(localStorage.getItem('carrito')) || []        

        const existeProducto = carritoActual.find(item => item.id === prod.id)

        if (!existeProducto) {
            const productoElegido = {
                id: prod.id,
                nombre: prod.nombre,
                precio: Number(prod.oferta_precio),
                cantidad: 1,
                subtotal: Number(prod.oferta_precio),
                image: prod.image
            }

            carritoActual.push(productoElegido)
            localStorage.setItem('carrito',JSON.stringify(carritoActual))
        }

        const totalPrecio = carritoActual.reduce((acc, item) => acc + Number(item.subtotal), 0)

        localStorage.setItem('total_compra', totalPrecio)

        navigate("/tienda/checkout")
    }

    if (loading) return (
        <div className="d-flex justify-content-center my-5 flex-grow-1">
            <div className="spinner-border text-primary"></div>
        </div>
    )

    if (error) return (
        <div className="container my-5 flex-grow-1">
            <div className="alert alert-danger">{error}</div>
        </div>
    )

    return (
        <main className="flex-grow-1 container my-5" style={{ minHeight: '80vh' }}>
            <div className="row">
                {/* Lateral: Navegar por */}
                <aside className="col-lg-3 col-md-4 mb-5">
                    <h4 className="custom-color-blue-marine custom-font-weight-700 border-bottom border-secondary border-3 pb-2 mb-4">
                        Navegar por
                    </h4>
                    <ul className="list-unstyled">
                        <li className="mb-3">
                            <button
                                className="btn btn-linl p-0 text-decoration-none custom-color-blue"
                                onClick={() => fetchProductos()}
                            >
                                Todos los productos
                            </button>
                        </li>
                        {categorias.map((cat) => (
                            <li className="mb-3" key={cat.id}>
                                <button
                                    className="btn btn-linl p-0 text-decoration-none custom-color-blue"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        filtrarCategoria(cat.name)
                                    }}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Principal: Grilla de productos */}
                <section className="col-lg-9 col-md-8">
                    <div className="row align-items-center mb-4">
                        <div className="col-md-7">
                            <h2 className="custom-color-blue-marine custom-font-weight-700 m-0">Todos los productos</h2>
                        </div>                       
                    </div>                  

                    {/* Grilla */}
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                        {productos.map((prod) => (
                            <div className="col-lg-4 col-md-6" key={prod.id}>
                                <div className="card h-100 border-0 shadow-sm p-2 text-center bg-white rounded-3">
                                    <div className="p-3 d-flex align-items-center justify-content-center" style={{ height: '180px' }}>
                                        <img
                                            src={`${URL}/images/tienda/${prod.image}`}
                                            alt={prod.nombre}
                                            className="img-fluid"
                                            style={{ maxHeight: '100%', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-between pt-1">
                                        <h6 className="custom-color-blue-marine small custom-font-weight-700 mb-2" style={{ minHeight: '40px' }}>
                                            {prod.nombre}
                                        </h6>
                                        <div>
                                            <p className="mb-3">
                                                <small className="text-muted text-decoration-line-through me-2">AR${prod.original_precio}</small>
                                                <span className="custom-color-blue-marine fw-bold">AR${prod.oferta_precio}</span>
                                            </p>
                                            <button 
                                                className="btn btn-primary text-white w-100 rounded-pill py-2 shadow-sm border-0"
                                                onClick={()=> agregarAlCarrito(prod)}
                                            >
                                                Agregar al carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Shop;
