// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ username, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/products">
          Mi Tienda
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          {username ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="navbar-text">Bienvenido, {username}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={onLogout}>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
