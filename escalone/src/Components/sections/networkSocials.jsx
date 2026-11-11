const NetworkSocials = () => {

    const networks = [
        {
            name:"Facebook",
            url:"https://www.facebook.com",
            icon:"fa-facebook"
        },
        {
            name:"X",
            url:"https://x.com",
            icon:"fa-x-twitter"
        },
        {
            name:"instagram",
            url:"https://www.instagram.com",
            icon:"fa-square-instagram"
        },
        {
            name:"Youtube",
            url:"https://youtube.com",
            icon:"fa-youtube"
        },
    ];

    return (
        <section className="s_networks text-center">
            <h3 className="my-4">Visita nuestra red social</h3>
            {networks.map((net)=>(
                <a 
                    key={net.name}                    
                    href={net.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                    aria-label={net.name}
                >
                    <i className={`fa-brands ${net.icon} m-2`}></i>
                </a>
            ))}
            {/*<a href="http://www.facebook.com" target="_blank" className="text-white">
                <i className="fa-brands fa-facebook m-2"></i>
            </a>
            <a href="https://x.com/" target="_blank" className="text-white">
                <i className="fa-brands fa-x-twitter m-2"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" className="text-white">
                <i className="fa-brands fa-square-instagram m-2"></i>
            </a>
            <a href="https://www.tiktok.com/explore" target="_blank" className="text-white">
                <i className="fa-brands fa-tiktok m-2"></i>
            </a>
            <a href="https://www.youtube.com/" target="_blank" className="text-white">
                <i className="fa-brands fa-youtube m-2"></i>
            </a>*/}
            <hr />
            {/*<p>© 2025 Escalones</p>*/}
            <p>
                ® 2025 Escalone. Todos los derechos reservados.{" "}
                <a className="text-white" href="#">
                    Términos de uso
                </a>
            </p>
        </section>
    )
}

export default NetworkSocials