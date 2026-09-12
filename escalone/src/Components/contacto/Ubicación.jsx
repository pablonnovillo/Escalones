import React from "react";

const Ubicacion = () => {
  return (
    <div className="container mb-4">
      <div className="row">
        {/* Info de ubicación */}
        <article className="col-lg-6 d-flex flex-column justify-content-evenly px-4">
          <section className="my-3">
            <h2 className="fw-bolder">Ubicación</h2>
            <p>
              Estamos en Buenos Aires, ofreciendo servicios de imprenta-bar y
              espacios coworking las 24 horas del día, todos los días.
            </p>
            <h3 className="fw-bolder h5">Dirección</h3>
            <p>Av. Alvarez Thomas 3971, CABA</p>
            <h3 className="fw-bolder h5">Horario</h3>
            <p>24 horas</p>
          </section>
        </article>

        {/* Mapa de Google */}
        <article className="col-lg-6">
          <iframe
            src={import.meta.env.VITE_MAPS_GOOGLE}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación Escalones"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default Ubicacion;
