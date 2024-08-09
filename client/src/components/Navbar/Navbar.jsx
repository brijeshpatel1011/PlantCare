import React, { Component} from "react";
import  logo  from "../../assests/plantcarelogo.png"
import "./NavbarStyles.css";
import {Link} from "react-router-dom"
  

class Navbar extends Component{
    render(){
        const handleLogout = () => {
            localStorage.removeItem("token");
            window.location.reload();
        };

        return(  
            <nav className="NavbarItems">
                <img className="navbar-logo" src={logo} alt="logo" />

                <ul className="nav-menu">
                    <li>
                        <Link to="/" className="nav-links">
                        <i class="fa-solid fa-house-user"></i>
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="nav-links">
                        <i class="fa-solid fa-circle-info"></i>
                        About
                        </Link>
                    </li>
                    <li>
                        <Link to="/service" className="nav-links">
                        <i class="fa-solid fa-briefcase"></i>
                        Service
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="nav-links">
                        <i class="fa-solid fa-address-book"></i>
                        Contact
                        </Link>
                    </li>
                    <button className="logout" onClick={handleLogout}>
                        Logout
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </ul>
                
            </nav>
        )
    }
}

export default Navbar;
