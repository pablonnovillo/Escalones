const DetailsPrinting = ({ datos }) => {
    if (!datos) return null;

    return (
        <section className="text-center">
            <h3 className="py-3">PEDIDO IMPRESIONES</h3>
            <hr />
            <ul className="list-group list-group-flush w-75 mx-auto">
                <li className="list-group-item">Copias: {datos.cantCopias}</li>
                <li className="list-group-item">Tipo de papel: {datos.tipoPapel}</li>
                <li className="list-group-item">Precio Total: ${datos.precioTotal}</li>
            </ul>
            <p className="mt-3">Modo de entrega: {datos.modoEntrega}</p>
        </section>
    );
};

export default DetailsPrinting;

