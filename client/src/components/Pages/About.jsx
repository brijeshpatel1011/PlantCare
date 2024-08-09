import Navbar from "../Navbar/Navbar";
import about from "../../assests/about1.jpeg"
import Footer from "./Footer";
import "./HeroStyles.css"

const About = () => {
    return(
        <>
        <Navbar/>
        <div className="hero-mid">
            <img src={about} alt="hero" />
            <div className="hero-text">
                <h1>About</h1>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default About;