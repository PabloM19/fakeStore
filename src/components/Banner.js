import React from 'react';
import './Banner.css'; // Asegúrate de que la ruta sea correcta y que exista el archivo CSS

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-text"></div>
        <div className="banner-info">
            <h2 className="text-white">Jewlery</h2>
          <p className="banner-description">
          The most exclusive collection we have in Fake Store. If you wear any of our jewelry you will radiate luxury.
          </p>
          <button className="btn btn-light">Go Shopping!</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
