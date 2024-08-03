import React, { useState, useEffect } from 'react';
import Product from './Product';
import Pagination from './Pagination';
import Header from './Header';
import Footer from './Footer';
import CategoryFilter from './CategoryFilter';
import AddProductForm from './AddProductForm';
import Overlay from './Overlay';
import { useCart } from '../contexts/CartContext'; // Importar el contexto del carrito
import { useCategory } from '../contexts/CategoryContext'; // Importar el contexto de categoría
import './Overlay.css';

const ProductList = ({ isAuthenticated, username, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const productsPerPage = 12;
  const { selectedCategory } = useCategory(); // Usa el contexto para obtener la categoría seleccionada

  // Utilizar el contexto del carrito
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  const fetchProducts = () => {
    const url = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : 'https://fakestoreapi.com/products';
    fetch(url)
      .then(response => response.json())
      .then(data => setProducts(data));
  };

  const fetchCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  };

  const handleProductAdded = () => {
    setMessage('Producto creado correctamente.');
    setMessageType('success');
    fetchProducts();
  };

  const handleProductDeleted = (deletedProductId) => {
    setProducts(products.filter(product => product.id !== deletedProductId));
    setMessage('Producto eliminado satisfactoriamente.');
    setMessageType('success');
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart(product); // Añadir al carrito
  };

  return (
    <div>
      <Header username={username} onLogout={onLogout} />
      {isAuthenticated ? (
        <div className="container mt-4">
          {message && (
            <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
              {message}
              <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
            </div>
          )}
          <div className="row">
            <div className="col-md-3 mb-4" style={{display:"none"}}>
              <AddProductForm onProductAdded={handleProductAdded} setMessage={setMessage} setMessageType={setMessageType} />
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onChange={(category) => {}} // No necesita función de cambio aquí
              />
            </div>
            <div className="col-md-12">
              <div className="row">
                {currentProducts.map(product => (
                  <Product
                    key={product.id}
                    {...product}
                    onAddToCart={() => handleAddToCart(product)} // Pasar la función al componente Product
                    onDelete={handleProductDeleted}
                  />
                ))}
              </div>
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <Overlay />
      )}
      <Footer />
    </div>
  );
};

export default ProductList;
