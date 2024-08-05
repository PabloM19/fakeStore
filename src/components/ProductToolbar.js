// src/components/ProductToolbar.js
import React, { useState } from 'react';
import AddProductForm from './AddProductForm';
import { Modal } from 'react-bootstrap';
import FilterIcon from '../assets/icons/filter.png';

const ProductToolbar = ({ categories = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProductAdded = () => {
    setShowModal(false);
    // Aquí puedes agregar lógica adicional, como actualizar la lista de productos
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-secondary" onClick={handleOpenModal}>
          Añadir Nuevo Producto
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProductForm
            onProductAdded={handleProductAdded}
            setMessage={setMessage}
            setMessageType={setMessageType}
          />
          {message && (
            <div className={`alert alert-${messageType}`} role="alert">
              {message}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductToolbar;
