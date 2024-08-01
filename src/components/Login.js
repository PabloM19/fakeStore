// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = ({ setAuthToken, setUsername }) => {
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
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card p-4 contenedorlogin">
        <div className="row g-0">
          <div className="col-md-6 d-flex align-items-center">
            <img
              src="https://i.imgur.com/kAhRmUJ.png"
              className="img-fluid"
              alt="Authentication"
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
                  <button
                    type="button"
                    className="btn btn-link-secondary position-absolute end-0 top-0"
                    style={{ marginTop: '8px' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>

                <button type="submit" className="btn btn-dark w-100">Iniciar Sesión</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
