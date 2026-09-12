export const generarMesaAsignada = (num) => {
    if (!num) return null;
    return String.fromCharCode(65 + ((num - 1) % 26))
}