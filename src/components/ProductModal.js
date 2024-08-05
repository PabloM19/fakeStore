import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';

const ProductModal = ({ product, show, handleClose, onDelete }) => {
  // Utilizar el contexto del carrito
  const { cart, dispatch } = useCart();

  if (!product) return null;

  // Buscar si el producto ya está en el carrito
  const productInCart = cart.find(item => item.productId === product.id);
  const quantityInCart = productInCart ? productInCart.quantity : 0;

  // Manejar añadir al carrito
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId: product.id } });
  };

  // Manejar remover del carrito
  const handleRemoveFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: product.id } });
  };

  // Manejar eliminación de producto
  const handleDeleteProduct = () => {
    const confirmed = window.confirm(`¿Estás seguro de que quieres eliminar el producto "${product.title}"?`);
    if (confirmed) {
      handleClose(); // Cerrar el modal primero
      fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Product deleted:', data);
          onDelete(product.id);
          alert(`El producto "${product.title}" ha sido eliminado exitosamente.`);
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Hubo un error al intentar eliminar el producto.');
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={handleClose}>
          X
        </Button>
      </Modal.Footer>
      <Modal.Body className="p-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src={product.image} 
                alt={product.title} 
                className="img-fluid rounded" 
                style={{ width: '100%', height: 'auto' }} 
              />
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-between">
              <div>
                <h2 className="text-dark font-weight-bold">{product.title}</h2>
                <p className="text-muted mt-3">{product.description}</p>
                <p className="text-muted"><strong>Category:</strong> {product.category}</p>
                <span className="h3 text-success mt-3 d-block">${product.price}</span>
              </div>
              <div>
                {quantityInCart > 0 ? (
                  <div className="d-flex align-items-center">
                    <span className="font-weight-bold me-2">Quantity</span>
                    <Button variant="outline-secondary" onClick={handleRemoveFromCart}>-</Button>
                    <span className="mx-3">{quantityInCart}</span>
                    <Button variant="outline-secondary" onClick={handleAddToCart}>+</Button>
                  </div>
                ) : (
                  <Button 
                    variant="dark" 
                    className="w-100 mt-3" 
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                )}
                <Button 
                  variant="outline-danger" 
                  className="w-100 mt-2" 
                  onClick={handleDeleteProduct}
                >
                  Delete product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
