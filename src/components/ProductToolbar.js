import React from 'react';
import FilterIcon from '../assets/icons/filter.png'

const ProductToolbar = ({ categories = [] }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <button className="btn btn-secondary">Añadir Nuevo Producto</button>
      <div className="d-flex align-items-center">
        <img src={FilterIcon} className="me-2" style={{width:"35px", cursor:"pointer"}}/>
        <select className="form-select" style={{ color: '#FFF', backgroundColor: '#000' }}>
          <option value="default">Default</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductToolbar;
