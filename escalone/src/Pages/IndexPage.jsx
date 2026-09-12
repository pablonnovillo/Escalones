import Header from '../Components/sections/header'
import Slide from "../Components/sections/slide"
import AboutUs from "../Components/sections/aboutUs"
import Faq from "../Components/sections/faq"
import BrandPartners from "../Components/sections/brandPartners"
import Contact from "../Components/sections/contact"
import Footer from '../Components/sections/footer'

export default function Index(){
    //console.log(import.meta.env.VITE_API_URL)
    return(
        <>
        <Header />
        <Slide />
        <AboutUs />
        <hr />
        <Faq />
        <hr />
        <BrandPartners />
        <section className="custom-bg-blue-marine">
            <Contact />
        </section>        
        <Footer />
        </>
    )
}