import React from 'react';
import './Product.css'; // Importa el archivo CSS para estilos personalizados

const Product = ({ id, title, description, price, category, image, quantity = 0, onAddToCart, onRemoveFromCart }) => {
  const handleAddToCart = () => {
    onAddToCart(id);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(id);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ minHeight: "450px", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="card-content">
            <p className="card-text">{description}</p>
            <p className="card-text">{price} USD</p>
            <p className="card-text"><small className="text-muted">{category}</small></p>
            <button className="btn btn-dark" onClick={handleAddToCart}>Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
