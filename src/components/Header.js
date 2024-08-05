// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';
import MenuIcon from '../assets/icons/menu.png';
import CrossIcon from '../assets/icons/cross.png';
import SearchIcon from '../assets/icons/search.png';
import UserIcon from '../assets/icons/user.png';
import './Header.css';
import logo from '../assets/logo.png';
import { useCategory } from '../contexts/CategoryContext';

const Header = ({ username, onLogout }) => {
  const [showCart, setShowCart] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cart } = useCart();
  const { updateCategory } = useCategory();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (category) => {
    if (location.pathname === '/home') {
      navigate('/products');
    } else if (location.pathname === '/products') {
      updateCategory(category);
    }
    toggleMenu(); // Cierra el menú desplegable en móviles
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="bg-light py-4">
        <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <img src={SearchIcon} className="me-2" style={{ width: '20px', cursor: 'pointer' }} />
            <img src={logo} alt="Logo de la tienda" />
          </Link>

          <div className="d-none d-md-flex gap-3 align-items-center">
            {username ? (
              <div className="d-flex align-items-center">
                <button className="btn btn-outline-dark" style={{ marginRight: '10px' }}>
                  <img src={UserIcon} className="me-2" style={{ width: '20px', cursor: 'pointer' }} />
                  <span className="navbar-text me-2">{username}</span>
                </button>
                <button className="btn btn-outline-dark" onClick={handleCartClick}>
                  <i className="bi bi-cart-fill me-1"></i>
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">{totalItems}</span>
                </button>
                <button className="btn btn-link" onClick={onLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <Link className="btn btn-link" to="/login">
                Login
              </Link>
            )}
          </div>

          <div className="d-md-none">
            <button className="btn btn-link" onClick={toggleMenu}>
              {isMenuOpen ? (
                <img src={CrossIcon} style={{ width: '20px', cursor: 'pointer' }} />
              ) : (
                <img src={MenuIcon} style={{ width: '20px', cursor: 'pointer' }} />
              )}
            </button>
          </div>
        </div>
        <div className="hr-container">
          <hr style={{ width: '1200px' }}></hr>
        </div>
        <div className={`container px-4 px-lg-5 ${isMenuOpen ? '' : 'd-none'} d-md-block`}>
          <ul className="nav justify-content-center py-2">
            <li className="nav-item">
              <button
                className="nav-link text-dark btn btn-link"
                onClick={() => handleCategoryClick('')}
              >
                See All
              </button>
            </li>
            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <button
                  className="nav-link text-dark btn btn-link"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </header>
    </div>
  );
};

export default Header;
