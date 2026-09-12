/**
 * Convierte una lista de archivos a un array de objetos con Base64.
 */
export const prepararArchivosParaEnvio = async (files) => {
    return Promise.all(
        Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve({
                        name: file.name,
                        type: file.type,
                        data: e.target.result
                    });
                };
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
            });
        })
    );
};

export const FormDataImpresiones = (info, numPedido) => {
    const storedFiles = sessionStorage.getItem("files");
    let files = storedFiles ? JSON.parse(storedFiles) : [];

    const formData = new FormData();

    // Conversión de Base64 a Blob y anexado
    files.forEach((file) => {
        const byteString = atob(file.data.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: file.type });
        formData.append("files[]", blob, file.name);
    });

    // Anexado de datos del formulario
    formData.append("tipo_papel", info.tipoPapel);
    formData.append("num_copias", info.cantCopias);
    formData.append("nombre_cliente", info.nombreCliente);
    formData.append("telefono_cliente", info.telefono);
    formData.append("email_cliente", info.email);
    formData.append("modo_entrega", info.modoEntrega);
    formData.append("comentario_cliente", info.comentario);
    formData.append("direccion_envio", info.direccionEnvio);
    formData.append("senia_recargo", info.senia);
    formData.append("numero_pedido", numPedido);
    formData.append("precio_total", info.precioTotal);

    return formData;
};