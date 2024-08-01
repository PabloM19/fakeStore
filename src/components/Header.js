import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ username, onLogout, cartItems = [], onUpdateCart }) => {
  const [showCart, setShowCart] = useState(false);

  const handleHover = (hover) => {
    setShowCart(hover);
  };

  const handleQuantityChange = (id, delta) => {
    onUpdateCart(id, delta);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to="/products">Mi Tienda</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            {/* Aquí puedes añadir más enlaces de navegación si es necesario */}
          </ul>
          <div className="dropdown-cart position-relative">
            <button 
              className="btn btn-outline-dark" 
              type="button"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <i className="bi bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">{totalItems}</span>
            </button>
          </div>
          {username ? (
            <ul className="navbar-nav ms-3">
              <li className="nav-item">
                <span className="navbar-text">Bienvenido, {username}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={onLogout}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-3">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
