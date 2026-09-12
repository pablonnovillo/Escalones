import { contarImagenes } from "./imageUtils";
import { contarPaginasPdf } from "./contarPdfUtils"; // ajusta la ruta

export const calcularPresupuesto = async (archivos, cantCopias) => {
    const cantPdf = await contarPaginasPdf(archivos);
    const cantImg = contarImagenes(archivos);
    
    // Definimos el precio por página/imagen (ej: 100)
    const PRECIO_UNITARIO = 150;
    
    //const total = (cantPdf + cantImg) * cantCopias * PRECIO_UNITARIO;
    const total = (cantPdf * cantCopias * PRECIO_UNITARIO) + (cantImg * cantCopias * PRECIO_UNITARIO)
    const senia = total / 2;

    return { total, senia, cantPdf, cantImg };
};