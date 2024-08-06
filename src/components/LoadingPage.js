// src/components/LoadingPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        // Configura el temporizador para la cuenta atrás
        const countdownTimer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(countdownTimer); // Limpia el temporizador cuando la cuenta atrás termina
                    navigate('/home'); // Redirige al login cuando la cuenta atrás llega a 0
                }
                return prevCountdown - 1;
            });
        }, 1000);

        // Limpiar el temporizador si el componente se desmonta antes de que termine la cuenta atrás
        return () => clearInterval(countdownTimer);
    }, [navigate]);

    return (
        <div className="overlay">
            <div className="overlay-content">
                <h1>Session closed correctly</h1>
                <p>Redirecting to login in {countdown}...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
