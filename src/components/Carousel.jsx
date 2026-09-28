import React from 'react';
import { destacados } from '../data/siteData';
import { publicPath } from '../utils/paths';

function Carousel() {
  return (
    <section className="container my-5" aria-labelledby="titulo-carrusel">
      <h2 id="titulo-carrusel" className="h3 mb-4">Novedades destacadas</h2>
      <div id="carouselProductos" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          {destacados.slice(0, 3).map((producto, index) => (
            <button key={producto.titulo} type="button" data-bs-target="#carouselProductos" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : undefined} aria-label={`Producto destacado ${index + 1}`} />
          ))}
        </div>
        <div className="carousel-inner rounded">
          {destacados.slice(0, 3).map((producto, index) => (
            <div key={producto.titulo} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={publicPath(producto.imagen)} className="d-block w-100 object-fit-cover carousel-img" alt={producto.alt} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                <h3 className="h5">{producto.titulo}</h3>
                <p className="mb-0">{producto.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselProductos" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselProductos" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}

export default Carousel;
