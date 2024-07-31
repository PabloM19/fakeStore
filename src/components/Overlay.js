// src/components/Overlay.js
import React from 'react';
import { Link } from 'react-router-dom';

const Overlay = () => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>¡Vaya! No estás logueado.</h2>
        <p>Inicia sesión para ver el contenido de la tienda.</p>
        <Link to="/login" className="btn btn-primary">
          Ir al Login
        </Link>
      </div>
    </div>
  );
};

export default Overlay;
