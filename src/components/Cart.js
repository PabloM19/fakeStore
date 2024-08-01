import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = ({ onClose }) => {
  const { cart } = useCart();

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <button className="btn btn-close" onClick={onClose}>Cerrar</button>
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.productId} className="list-group-item">
                Producto ID: {item.productId} - Cantidad: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
