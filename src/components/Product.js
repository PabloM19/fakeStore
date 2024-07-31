// src/components/Product.js
import React from 'react';

const Product = ({ id, title, description, price, category, image, onDelete }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar el producto "${title}"?`);
    if (confirmed) {
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Product deleted:', data);
          onDelete(id);
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">{price} USD</p>
          <p className="card-text"><small className="text-muted">{category}</small></p>
          <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
