// src/components/Overlay.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Overlay = ({ setAuthToken, setUsername }) => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Por favor, completa todos los campos');
      return;
    }

    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          setAuthToken(json.token);
          setUsername(username);
          if (rememberMe) localStorage.setItem('authToken', json.token);
          navigate('/products');
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      })
      .catch(() => setError('Error en la conexión con el servidor'));
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>¡Vaya! No estás logueado.</h2>
        <p>Inicia sesión para ver el contenido de la tienda.</p>
          <div className="container-fluid d-flex align-items-center justify-content-center">
          <div className="card p-4 contenedorlogin">
            <div className="row g-0">
              <div className="col-md-6 d-flex align-items-center">
                <img
                  src="https://i.imgur.com/kAhRmUJ.png"
                  className="img-fluid"
                  alt="Phone"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h2 className="card-title">Iniciar Sesión</h2>
                  {error && <div className="alert alert-danger">{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Nombre de usuario</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsernameInput(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 position-relative">
                      <label htmlFor="password" className="form-label">Contraseña</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-dark w-100">Iniciar Sesión</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Overlay;
