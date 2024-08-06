// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import FacebookLogo from '../assets/icons/facebook-logo.svg';
import InstagramLogo from '../assets/icons/instagram-logo.svg';
import LinkedinLogo from '../assets/icons/linkedin-logo.svg';
import TwitterLogo from '../assets/icons/twitter-logo.svg';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-dark pt-5">
      {/* Footer top */}
      <div className="container">
        <div className="row mb-5">
          {/* Company info */}
          <div className="col-md-9">
            <Link to="/">
              <img src={logo} alt="Logo de la tienda" className="img-fluid mb-3" />
            </Link>
            <p>
            Welcome to our product e-commerce store. We offer a wide range of high quality items to satisfy all your needs. At Fake Store we offer only top products to lead in the field of technology, jewelry or fashion (male or female).
            </p>
          </div>

          {/* Social media icons */}
          <div className="col-md-3 d-flex justify-content-center align-items-center">
            <div className="row text-center">
              <div className="col-6 mb-2">
                <img src={FacebookLogo} alt="Facebook" style={{ width: "25px", cursor: "pointer" }} />
              </div>
              <div className="col-6 mb-2">
                <img src={InstagramLogo} alt="Instagram" style={{ width: "25px", cursor: "pointer" }} />
              </div>
              <div className="col-6">
                <img src={LinkedinLogo} alt="LinkedIn" style={{ width: "23px", cursor: "pointer" }} />
              </div>
              <div className="col-6">
                <img src={TwitterLogo} alt="Twitter" style={{ width: "25px", cursor: "pointer" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-secondary text-center py-3">
        <p className="mb-0 text-white">Developed by Pablo Molero. {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
