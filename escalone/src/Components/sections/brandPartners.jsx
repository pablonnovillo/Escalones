const BrandPartners = () => {
    return (
        <>
            <section className="container brand_partners pb-4">
                <div className="row">
                    <h3 className="text-sm-start text-center py-2 fw-bolder">Socios de la marca</h3>
                    <section className="col-md-3 col-sm-6 brand_partners_art">
                        <img
                            src="images/socios/CANON.png"
                            width="100%"
                            alt="marca1"
                            className="brand_partners_item rounded"
                        />
                    </section>
                    <section className="col-md-3 col-sm-6 brand_partners_art">
                        <img
                            src="images/socios/UB.jpg"
                            width="100%"
                            alt="marca2"
                            className="brand_partners_item rounded"
                        />
                    </section>
                    <section className="col-md-3 col-sm-6 brand_partners_art">
                        <img
                            src="images/socios/hp.png"
                            width="100%"
                            alt="marca3"
                            className="brand_partners_item rounded"
                        />
                    </section>
                    <section className="col-md-3 col-sm-6 brand_partners_art">
                        <img
                            src="images/socios/da-vinci.jpg"
                            width="100%"
                            alt="marca4"
                            className="brand_partners_item rounded"
                        />
                    </section>
                </div>
            </section>
        </>
    )
}

export default BrandPartners