export const crearFormDataPedido=(datos)=>{
     const formData = new FormData()

        datos.archivos.forEach((file) => {
            formData.append("files[]", file);
        })

        formData.append("tipo_papel", datos.tipoPapel)
        formData.append("num_copias", datos.cantCopias)
        formData.append("nombre_cliente", datos.nombre)
        formData.append("telefono_cliente", datos.telefono)
        formData.append("email_cliente", datos.email)
        formData.append("modo_entrega", datos.modoEntrega)
        formData.append("comentario_cliente", datos.comment)
        formData.append("direccion_envio", datos.domicilio)

        return formData
}