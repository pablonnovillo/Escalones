export const limpiarLocalStorage = () => {
    if (localStorage.getItem('imprimir') || localStorage.getItem('turno')) {
        localStorage.removeItem('imprimir');
        localStorage.removeItem('turno');
    }
};

export const DeleteBorrarModoPago = () => {
    localStorage.removeItem('modo-pago')
}

export const DeleteCarrito = () => {
    if (localStorage.getItem('carrito_data')) {
        localStorage.removeItem('carrito_data')
        localStorage.removeItem('carrito')
        localStorage.removeItem('email')
    }
}

export const DeleteLocalStorage = () => {

    if (localStorage.getItem('imprimir') || localStorage.getItem('turno') || localStorage.getItem('email')) {
        localStorage.removeItem('imprimir')
        localStorage.removeItem('turno')
        localStorage.removeItem('modo-pago')
        localStorage.removeItem('email')
        sessionStorage.removeItem("files")
    }
}