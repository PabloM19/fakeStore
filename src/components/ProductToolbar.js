import React from 'react';
import FilterIcon from '../assets/icons/filter.png'

const ProductToolbar = ({ categories = [] }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <button className="btn btn-secondary">Añadir Nuevo Producto</button>
    </div>
  );
};

export default ProductToolbar;
