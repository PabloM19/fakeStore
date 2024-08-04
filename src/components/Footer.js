// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import FacebookLogo from '../assets/icons/facebook-logo.svg'
import InstagramLogo from '../assets/icons/instagram-logo.svg'
import LinkedinLogo from '../assets/icons/linkedin-logo.svg'
import TwitterLogo from '../assets/icons/twitter-logo.svg'
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-dark pt-5">
      {/* Footer top */}
      <div className="container">
        <div className="row mb-5">
          {/* Company info */}
          <div className="col-md-4">
            <Link to="/">
              <img src={logo} alt="Logo de la tienda" className="img-fluid mb-3" />
            </Link>
            <p>
              Bienvenido a nuestra tienda de productos. Ofrecemos una amplia gama de artículos de alta calidad para satisfacer todas tus necesidades.
            </p>
            <div className="d-flex gap-3">
              <img src={FacebookLogo} className="text-dark fs-4" style={{width:"20px", cursor:"pointer"}}/>
              <img src={InstagramLogo} className="text-dark fs-4" style={{width:"20px", cursor:"pointer"}}/>
              <img src={LinkedinLogo} className="text-dark fs-4" style={{width:"20px", cursor:"pointer"}}/>
              <img src={TwitterLogo} className="text-dark fs-4" style={{width:"20px", cursor:"pointer"}}/>
            </div>
          </div>

          {/* Catalog */}
          <div className="col-md-2">
            <h5 className="text-uppercase mb-4">Catálogo</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Collares
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Sudaderas
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Caja de Joyas
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Camisetas
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Chaquetas
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer services */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-4">Atención al Cliente</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Rastrea tu pedido
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Cuidado y Reparación de Productos
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Reservar una Cita
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Envíos y Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* About us */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-4">Acerca de Nosotros</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Nuestros Productores
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Mapa del Sitio
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/" className="text-dark text-decoration-none">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-secondary text-center py-3">
        <p className="mb-0 text-white">&copy; {currentYear} Fake Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
