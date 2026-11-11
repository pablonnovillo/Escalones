import { COSTO_RESERVA_POR_HORA } from "../dataConstants/price";

export const getImagenTipoCafe = (tipoCafe) => {
    switch (tipoCafe) {
        case "Café": return "/images/consumo/cafe.png";
        case "Café express": return "/images/consumo/cafe-express.png";
        case "Café cortado": return "/images/consumo/cafe-cortado.png";
        case "Café con leche": return "/images/consumo/cafe-con-leche.png";
        case "Capuchino": return "/images/consumo/capuchino.png";
        default: return "";
    }
};

export const getImagenSweet = (sweet) => {
    switch (sweet) {
        case "1 medialuna": return "/images/consumo/medialuna.png";
        case "2 medialunas": return "/images/consumo/medialunas.png";
        case "Brownie": return "/images/consumo/brownie.png";
        case "Galletita": return "/images/consumo/galletitas.png";
        default: return "";
    }
};

export const getImagenCafeAndSweet = (sweet) => {
    switch (sweet) {
        case "1 medialuna": return "/images/consumo/cafe-medialuna.png";
        case "2 medialunas": return "/images/consumo/cafe-medialunas.png";
        case "Brownie": return "/images/consumo/cafe-brownie.png";
        case "Galletita": return "/images/consumo/cafe-galletitas.png";
        default: return "/images/consumo/cafe.png";
    }
};

export const getConsumision = (cafe, postre) => {
    let consumo = null;
    if (cafe && postre) {
        consumo = cafe + " y " + postre;
    } else {
        if (cafe) consumo = cafe;
        if (postre) consumo = postre;
    }
    return consumo;
};

// Esta función ahora recibe los resultados de las anteriores
export const getImagenConsumo = (tipoCafe, sweet) => {    
    if (!tipoCafe && !sweet) return "";
    if (tipoCafe && !sweet) return getImagenTipoCafe(tipoCafe);
    if (!tipoCafe && sweet) return getImagenSweet(sweet);
    if (tipoCafe && sweet) return getImagenCafeAndSweet(sweet);
    return "";
};

export const generarDatosTurnos = (config) => {
    const { horaInicio, horaFinal, foot, tipoCafe, sweet, email, selected, selectedDate } = config;

    const horaInicioNum = parseInt(horaInicio.split(":")[0]);
    const horaFinalNum = parseInt(horaFinal.split(":")[0]);

    const horasReservadas = horaFinalNum - horaInicioNum;
    let precioReserva = horasReservadas * COSTO_RESERVA_POR_HORA;

    if (foot !== 0) {
        precioReserva = precioReserva + foot;
    }
    
    let senia = precioReserva / 2;

    const adicional = getConsumision(tipoCafe, sweet);

    // Retorna el JSON (objeto) listo
    return {
        email,
        servicio: selected,
        fecha: selectedDate,
        horaInicio,
        horaFinal,
        duracion: horasReservadas,
        adicional,
        senia,
        precio: precioReserva,
    };
}