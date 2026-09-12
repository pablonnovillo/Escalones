const NetworkSocials = () => {
    return (
        <section className="s_networks text-center">
            <h3 className="my-4">Visita nuestra red social</h3>
            <a href="http://www.facebook.com" target="_blank" className="text-white">
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
            </a>
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