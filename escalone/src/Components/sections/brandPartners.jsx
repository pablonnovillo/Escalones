const BrandPartners = () => {

    const brands = [
        {marca:"Canon", name:"Canon", image:"/images/socios/CANON.png"},
        {marca:"UB", name:"Universidad de Belgrano", image:"/images/socios/UB.jpg"},
        {marca:"HP", name:"Hewlett-Packard", image:"/images/socios/hp.png"},
        {marca:"Da Vinci", name:"Da Vinci", image:"/images/socios/da-vinci.jpg"}
    ];

    return (
        <>
            <section className="container brand_partners pb-4">
                <div className="row">
                    <h3 className="text-sm-start text-center py-2 fw-bolder">Socios de la marca</h3>
                    {brands.map((b)=>(
                        <section
                            key={b.name}
                            className="col-md-3 col-sm-6 brand_partners_art"
                        >
                            <img 
                                src={b.image} 
                                alt={b.name}
                                width="100%"
                                className="brand_partners_item rounded"
                            />                            
                        </section>
                    ))}
                    {/*<section className="col-md-3 col-sm-6 brand_partners_art">
                        <img
                            src="images/socios/CANON.png"
                            width="100%"
                            alt="canon"
                            className="brand_partners_item rounded"
                        />
                    </section>
                    <section className="col-md-3 col-sm-6 brand_partners_art">
                        <img
                            src="images/socios/UB.jpg"
                            width="100%"
                            alt="UB"
                            className="brand_partners_item rounded"
                        />
                    </section>
                    <section className="col-md-3 col-sm-6 brand_partners_art">
                        <img
                            src="images/socios/hp.png"
                            width="100%"
                            alt="Hewlett-Packard"
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
                    </section>*/}
                </div>
            </section>
        </>
    )
}

export default BrandPartners