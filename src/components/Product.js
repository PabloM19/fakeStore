// src/components/Product.js
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/Product.css';
import TrashIcon from '../assets/icons/trash.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = ({ id, title, description, price, category, image, onDelete, onClick }) => {
  const { cart, dispatch } = useCart();
  const productInCart = cart.find(item => item.productId === id);
  const quantity = productInCart ? productInCart.quantity : 0;
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation(); // Evitar que se propague el evento click al contenedor superior
    setShowModal(true); // Mostrar el modal de confirmación
  };

  const confirmDelete = () => {
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product deleted:', data);
        onDelete(id); // Llama a la función onDelete para actualizar la lista de productos
        setShowModal(false); // Cierra el modal
      })
      .catch(error => console.error('Error:', error));
  };

  const truncateTitle = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  };

  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-5">
      <div style={{ marginBottom: "20px" }}>
        <div className="card border-0" style={{ boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)" }} onClick={onClick}>
          <img
            src={image}
            className="card-img-top"
            alt={title}
            style={{ height: '200px', objectFit: 'contain' }}
          />
          <div className="card-body p-2 d-flex flex-column">
            <p className="card-text mb-1">{truncateTitle(title, 20)}</p>
            <p className="card-text mb-1 text-success"><strong>${price}</strong></p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="card-text text-muted mb-2">{category}</span>
              <img 
                src={TrashIcon} 
                className="me-2" 
                style={{ height: '25px', cursor: 'pointer' }} 
                onClick={handleDelete} 
                alt="delete icon" 
              />
            </div>
          </div>
        </div>
      </div>


      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close">
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the product "{title}"?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
