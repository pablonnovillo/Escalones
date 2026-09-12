import jsPDF from "jspdf";

export const DescargarComprobante = (params) => {
    const { data, numeroPedido, modoPago, tipoServicio } = params;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 200]
    });

    let y = 10;
    const margin = 5;
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Helpers
    const center = (text, size = 10, style = "normal") => {
        pdf.setFont("helvetica", style);
        pdf.setFontSize(size);
        pdf.text(text, pageWidth / 2, y, { align: "center" });
        y += size / 2 + 2;
    };

    const left = (text, size = 9, style = "normal") => {
        pdf.setFont("helvetica", style);
        pdf.setFontSize(size);
        pdf.text(text, margin, y);
        y += size / 2 + 1;
    };

    const line = () => {
        pdf.setLineWidth(0.1);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 4;
    };

    // --- ENCABEZADO ---
    center("ESCALONE", 12, "bold");
    center("Dirección MiCasa - MiCiudad", 8);
    center("Tel: 5555-5555", 8);
    center("email: escalone@gmail.com", 8);
    line();

    // --- INFO PEDIDO ---
    left(`FECHA: ${new Date().toLocaleDateString("es-AR")}`);
    left(`PEDIDO N°: ${numeroPedido}`, 10, "bold");
    left(`CLIENTE: ${data.email}`, 8);
    left(`MÉTODO PAGO: ${modoPago}`);
    line();

    // --- DETALLE ---
    if (tipoServicio === "carrito") {
        center("DETALLE DE COMPRA", 9, "bold");
        y += 2;

        pdf.setFontSize(8);
        pdf.text("Prod.", margin, y);
        pdf.text("Cant.", 45, y);
        pdf.text("Subt.", 65, y);
        y += 4;

        data.productos.forEach(item => {
            pdf.setFont("helvetica", "normal");
            pdf.text(item.nombre.substring(0, 20), margin, y);
            pdf.text(item.cantidad.toString(), 48, y);
            pdf.text(`$${item.subtotal}`, 65, y);
            y += 5;
        });

        line();
        left(`MODO ENTREGA: ${data.modo_entrega}`, 8);
        if (data.domicilio) left(`DIRECCIÓN: ${data.domicilio}`, 7);
        center(`TOTAL: $${data.productos.reduce((acc, i) => acc + i.subtotal, 0)}`, 11, "bold");
    }

    line();
    center("¡Gracias por tu confianza!", 9, "italic");
    center("Conservá este ticket para retirar", 7);

    pdf.save(`comprobante-${numeroPedido}.pdf`);
};

export const DescargarPDF = (params) => {
    const { tipoServicio, data, numeroPedido, mesaAsignada,  numeroReserva } = params;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 140]
    });

    pdf.setFont("courier", "normal");
    pdf.setFontSize(10);

    let y = 10;

    const center = (text) => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        pdf.text(text, pageWidth / 2, y, { align: "center" });
        y += 6;
    };

    const line = () => {
        pdf.line(5, y, 75, y);
        y += 6;
    };

    pdf.rect(3, 3, 74, 134);

    if (tipoServicio === "imprimir") {
        center("COMPROBANTE DE IMPRESIONES");
        line();
        pdf.text(`Numero pedido: ${numeroPedido}`, 8, y); y += 5;
        pdf.text(`Copias: ${data.cantCopias}`, 8, y); y += 5;
        pdf.text(`Papel: ${data.tipoPapel}`, 8, y); y += 8;
        y += 3;

        pdf.text(`Entrega ${data.modoEntrega}`, 8, y); y += 5;
        pdf.text(`Pago señado: ${data.senia}`, 8, y); y += 8;
        line();
        center(`TOTAL: $${data.precioTotal}`);
        line();
    }

    if (tipoServicio === "turno") {       

        center(`RESERVA TURNO: ${data.servicio}`);
        line();
        center(`${new Date(data.fecha).toLocaleDateString("es-AR")}`);
        center(`${data.horaInicio} a ${data.horaFinal}`);
        center(`MESA ASIGNADA: ${mesaAsignada}`);
        center(`Pago señado: ${data.senia}`);
        y += 4;
        line();
        center(`TOTAL: ${data.precio}`);
        line();
        y += 4;
        center(`Confirmación enviada a`);
        center(data.email);
        line();
    }

    const filename = tipoServicio === "turno" ? `reserva-${numeroReserva}.pdf` : `pedido-${numeroPedido}.pdf`;
    pdf.save(filename);
};

export const descargarTurnoPdf = (res) => {
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 140]
    })

    pdf.setFont("courier", "normal")
    pdf.setFontSize(11)

    let y = 10
    const center = (text) => {
        const pageWidth = pdf.internal.pageSize.getWidth()
        pdf.text(text, pageWidth / 2, y, { align: "center" })
        y += 6
    }

    const line = () => {
        pdf.line(5, y, 75, y)
        y += 6
    }

    pdf.rect(3, 3, 74, 134)

    center("COMPROBANTE DE RESERVA")
    center(" - ESCALONE - ")
    line()

    pdf.text(`Reserva N°: ${res.numero_reserva}`, 8, y); y += 6
    pdf.text(`Fecha: ${res.fecha}`, 8, y); y += 6
    pdf.text(`Desde: ${res.hora_inicio}`, 8, y); y += 6
    pdf.text(`Hasta: ${res.hora_final}`, 8, y); y += 6

    line()
    center(`MESA ASIGNADA: ${res.mesa_asignada}`)
    line()

    y += 4
    center("Gracias por elegirnos")
    center("¡Te esperamos!")
    line()

    pdf.save(`reserva-${res.numero_reserva}.pdf`)
}