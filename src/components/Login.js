// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EyeIcon from '../assets/icons/eye.png'
import EyeSlashIcon from '../assets/icons/eye-slash.png'
import '../styles/Login.css';

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
      setError('Please, fill all the blanks');
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
          setError('Incorrect username or password');
        }
      })
      .catch(() => setError('Error connecting with the server'));
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
              <h2 className="card-title">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsernameInput(e.target.value)}
                  />
                </div>

                <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
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
                style={{ marginTop: '8px', padding: 0, border: 'none', background: 'none' }}
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <img src={EyeIcon} alt="Ocultar contraseña" style={{ width: "25px", cursor: "pointer" }} />
                ) : (
                    <img src={EyeSlashIcon} alt="Mostrar contraseña" style={{ width: "25px", cursor: "pointer" }} />
                )}
            </button>
        </div>

                <button type="submit" className="btn btn-dark w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
