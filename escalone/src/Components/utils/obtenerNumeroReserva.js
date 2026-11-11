export const ObtenerNumeroReserva = async () => {
    const URL_API = import.meta.env.VITE_API_URL
    try {
        //throw new Error()
        const resp = await fetch(`${URL_API}/api/consultar-numero-reserva`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })        

        if (resp.ok) {            
            const data = await resp.json()
            if(typeof data.error !== 'undefined'){
                return Number(12345)        
            }
            //console.log(data)            
            return Number(data.numero_reserva) + 1
        }

        return NaN;        
        
    } catch (error) {                
        return NaN;
    }
}