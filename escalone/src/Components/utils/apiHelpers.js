
export const ApiHelpers = async (response) => {    
    let data = null
    let respuesta = null       
    try {
        data = await response.json()                      
        if (response.status === 422) {            
             respuesta = Object.values(data.errors)[0][0]
             //console.log(respuesta)
            return respuesta
        }  
        if ([400, 401, 500].includes(response.status)) {
            return data.error || "Ocurrió un error inesperado";
        }           
    } catch (error) {        
        console.log(error)
        return error
    }
}