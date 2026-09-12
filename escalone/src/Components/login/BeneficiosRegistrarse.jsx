import React from "react";

const BeneficiosRegistrarse = () => {
  return (
    <div className="container mb-4">
      <div className="row">
        <section className="col-12 text-center">
          <h2 className="h1 fw-bolder">Beneficios para Registrarse</h2>
          <hr />
          <p>
            Descubre las ventajas de registrarte y disfrutá de servicios
            exclusivos para vos
          </p>
        </section>

        <article className="col-lg-6">
          <img
            src="/images/Login/bar.jpg"
            alt="Bar de Escalones"
            className="card-img-top rounded-4"
          />
        </article>

        <article className="col-lg-6 d-flex flex-column justify-content-evenly border px-4">
          <section className="my-3">
            <h3 className="fw-bolder h5">Seguimiento de Pedidos</h3>
            <p>
              Consultá el estado de tus impresiones y compras desde tu cuenta en
              todo momento
            </p>
          </section>

          <section className="my-3">
            <h3 className="fw-bolder h5">Promociones Exclusivas</h3>
            <p>
              Accedé a descuentos en impresiones, productos de librería y
              consumiciones del bar
            </p>
          </section>

          <section className="my-3">
            <h3 className="fw-bolder h5">Reservas Prioritarias</h3>
            <p>
              Tené prioridad para reservar meses de coworking y juegos como pool
              y ping pong
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default BeneficiosRegistrarse;
