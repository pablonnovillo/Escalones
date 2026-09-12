const SeccionArchivos = ({ 
    handleFiles, 
    tipoPapel, 
    setTipoPapel, 
    setCantCopias 
}) => {
    return (
        <section className="col-md-4 border-end p-4">
            <div id="alert"></div>
            <h5 className="border-bottom w-100 fw-bolder">Subí archivos</h5>
            <div className="mb-3">
                <label>PDF, PNG, JPG - hasta 4 MB</label>
                <input
                    className="form-control"
                    type="file"
                    name="fileprint"
                    multiple
                    onChange={handleFiles}
                />
                <span>
                    <small>El precio se calcula por cada archivo subido</small>
                </span>
                <br />
                
                <div className="accordion" id="accordionExample">
                    {/* Accordion 1: Tipo de Papel */}
                    <section className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="false"
                                aria-controls="collapseOne"
                            >
                                Tipo de papel
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {["A4", "carta", "oficio"].map((tipo) => (
                                    <div key={tipo}>
                                        <input
                                            type="radio"
                                            name="tipoPapel"
                                            value={tipo}
                                            checked={tipoPapel === tipo}
                                            onChange={(e) => setTipoPapel(e.target.value)}
                                        />{" "}
                                        {tipo}
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Accordion 2: Cantidad */}
                    <section className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                            >
                                Cantidad de Copias
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="cantCopy"
                                    placeholder="Ingrese la cantidad de copias"
                                    onChange={(e) => setCantCopias(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default SeccionArchivos;