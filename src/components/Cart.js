import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = ({ onClose }) => {
  const { cart } = useCart();

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <button className="btn btn-close" onClick={onClose}>X</button>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>The cart is empty</p>
        ) : (
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.productId} className="list-group-item">
                Product ID: {item.productId} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
