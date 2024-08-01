// src/components/Product.js
import React from 'react';
import { useCart } from '../contexts/CartContext';
import './Product.css'; // Asegúrate de que la ruta sea correcta


const Product = ({ id, title, description, price, category, image }) => {
  // Utilizar el contexto del carrito
  const { cart, dispatch } = useCart();

  // Buscar si el producto ya está en el carrito
  const productInCart = cart.find(item => item.productId === id);
  const quantity = productInCart ? productInCart.quantity : 0;

  // Manejar añadir al carrito
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId: id } });
  };

  // Manejar remover del carrito
  const handleRemoveFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: id } });
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ minHeight: "800px"}}>
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ minHeight: "450px", objectFit: "contain" }}
        />
        <div className="card-body" >
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">{category}</small></p>
          <div className="card-content">
            <p className="card-text">{price} USD</p>
            {quantity > 0 ? (
              <div className="product-counter">
                <button className="btn btn-outline-dark" onClick={handleRemoveFromCart}>-</button>
                <span>{quantity}</span>
                <button className="btn btn-outline-dark" onClick={handleAddToCart}>+</button>
              </div>
            ) : (
              <button className="btn btn-dark" onClick={handleAddToCart}>Añadir al carrito</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
