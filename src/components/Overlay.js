import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Overlay.css';

const Overlay = () => {
  const [counter, setCounter] = useState(3); // Cuenta regresiva de 5 segundos
  const navigate = useNavigate();

  useEffect(() => {
    // Reducción del contador cada segundo
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    // Redirección cuando el contador llega a 0
    if (counter === 0) {
      navigate('/login');
    }

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>¡Vaya! No estás logueado.</h2>
        <p>Serás redirigido al inicio de sesión en {counter} segundos...</p>
      </div>
    </div>
  );
};

export default Overlay;
