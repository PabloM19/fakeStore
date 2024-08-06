import React, { useState, useEffect } from 'react';
import Product from './Product';
import Pagination from './Pagination';
import Header from './Header';
import Footer from './Footer';
import CategoryFilter from './CategoryFilter';
import AddProductForm from './AddProductForm';
import Overlay from './Overlay';
import { useCart } from '../contexts/CartContext'; 
import { useCategory } from '../contexts/CategoryContext';
import '../styles/Overlay.css';
import ProductToolbar from './ProductToolbar';
import ProductModal from './ProductModal';

const ProductList = ({ isAuthenticated, username, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Asegúrate de inicializar como un array vacío
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const productsPerPage = 12;
  const { selectedCategory } = useCategory(); 
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      .then(data => setCategories(data || [])); // Proteger contra undefined
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart(product); 
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
          <ProductToolbar categories={categories} />
          <div className="row">
            <div className="col-md-3 mb-4" style={{ display: "none" }}>
              <AddProductForm onProductAdded={handleProductAdded} setMessage={setMessage} setMessageType={setMessageType} />
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={(category) => { }} 
              />
            </div>
            <div className="col-md-12">
              <div className="row">
                {currentProducts.map(product => (
                  <Product
                    key={product.id}
                    {...product}
                    onAddToCart={() => handleAddToCart(product)} 
                    onDelete={handleProductDeleted}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
                <ProductModal
                 product={selectedProduct} 
                 show={showModal} 
                 handleClose={handleCloseModal} 
                />
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
