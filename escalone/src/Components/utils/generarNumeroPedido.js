export const GenerarNumeroUnico = async () => {
    const URL_API = import.meta.env.VITE_API_URL
    let esValido = false
    let nuevoNumero = NaN
    let intentos = 0

    while (!esValido && intentos < 5) {
        intentos++
        nuevoNumero = Math.floor(100000 + Math.random() * 900000).toString();

        try {
            const resp = await fetch(`${URL_API}/api/verificar-numero-pedido?numero_pedido=${nuevoNumero}`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            })
            if (!resp.ok) { return NaN }                       
            const disponible = await resp.json()
            if (disponible === true) {
                esValido = true
            }
        } catch (error) {            
            esValido = true
            return NaN
        }
    }
    return nuevoNumero
}