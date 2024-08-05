import React from 'react';
import { useCart } from '../contexts/CartContext';
import './Product.css'; // Asegúrate de que la ruta sea correcta

const Product = ({ id, title, description, price, category, image, onDelete, onClick  }) => {
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

  const truncateTitle = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  };

  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-5">
      <div style={{marginBottom:"20px"}}>
      <div className="card border-0" style={{boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)"}} onClick={onClick}>
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body p-2 d-flex flex-column">
        <p className="card-text mb-1">{truncateTitle(title, 20)}</p>
          <p className="card-text mb-1"><strong>${price}</strong></p>
          <p className="card-text text-muted mb-2">{category}</p>
          
        </div>
      </div>
      <div className="d-flex justify-content-between mt-auto">
            {quantity > 0 ? (
              <div className="d-flex align-items-center">
                <span>You have alredy:</span>
                <button className="btn btn-outline-dark btn-sm me-2" onClick={handleRemoveFromCart}>-</button>
                <span className="me-2">{quantity}</span>
                <button className="btn btn-outline-dark btn-sm" onClick={handleAddToCart}>+</button>
              </div>
            ) : (
              <span className="" onClick={handleAddToCart}>Add to cart</span>
            )}
            <span className="" onClick={handleDelete}>Delete</span>
      </div>
      </div>
    </div>
  );
};

export default Product;
