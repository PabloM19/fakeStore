// src/components/ProductModal.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="modal fade" id={`productModal-${product.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{product.title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img src={product.image} alt={product.title} className="img-fluid" />
            <p><strong>Precio:</strong> {product.price} USD</p>
            <p><strong>Categoría:</strong> {product.category}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-dark" onClick={() => onAddToCart(product)}>Añadir al carrito</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
