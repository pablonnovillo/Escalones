import React from "react";

const PublicidadEscalone = () => {
  return (
    <div className="custom-bg-blue-marine">
      <div className="container">
        <section className="col-lg-12 text-center py-5">
          <h2 className="text-center text-white">
            Buenos Aires no para, nosotros tampoco
          </h2>
          <hr className="bg-light border border-2 border-light w-50 mx-auto" />
          <iframe
            width="50%"
            height="315"
            src={import.meta.env.VITE_LINK_YOUTUBE}
            title="Publicidad Escalone"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </section>
      </div>
    </div>
  );
};

export default PublicidadEscalone;
