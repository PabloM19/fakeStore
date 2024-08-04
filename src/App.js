// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Header from './components/Header';
import LoadingPage from './components/LoadingPage';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import { CategoryProvider } from './contexts/CategoryContext';
import HomePage from './components/HomePage';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [username, setUsername] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setAuthToken(null);
    setUsername('');
    localStorage.removeItem('authToken');

    // Redirigir a la página de carga
    setTimeout(() => {
      window.location.href = '/loading';
    }, 0); // Redirigir inmediatamente
  };

  return (
    <CartProvider>
      <Router>
      <CategoryProvider>
        <RouteWrapper 
          authToken={authToken} 
          setAuthToken={setAuthToken} 
          username={username} 
          setUsername={setUsername} 
          handleLogout={handleLogout} 
          isLoggingOut={isLoggingOut} 
        />
        </CategoryProvider>
      </Router>
    </CartProvider>
  );
}

const RouteWrapper = ({ authToken, setAuthToken, username, setUsername, handleLogout, isLoggingOut }) => {
  const location = useLocation();
  
  // Check if the current route is not the login page or loading page
  const shouldShowHeader = location.pathname !== '/login' && location.pathname !== '/loading' && location.pathname !== '/products' && location.pathname !== '/home' && !isLoggingOut;

  return (
    <>
      {shouldShowHeader && <Header username={username} onLogout={handleLogout} />}
      <Routes>
        <Route path="/home" element={<HomePage/>}/>
        <Route
          path="/login"
          element={<Login setAuthToken={setAuthToken} setUsername={setUsername} />}
        />
        <Route
          path="/products"
          element={<ProductList isAuthenticated={!!authToken} username={username} onLogout={handleLogout} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redirige a /login por defecto */}
      </Routes>
    </>
  );
};

export default App;
