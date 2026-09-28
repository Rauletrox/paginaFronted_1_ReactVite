import React from 'react';
import { destacados } from '../data/siteData';
import { publicPath } from '../utils/paths';

function Destacados({ tarjetaActiva, onActivarTarjeta }) {
  return (
    <section className="container my-5" aria-labelledby="titulo-destacados">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <h2 id="titulo-destacados" className="h3 mb-2">Videojuegos destacados</h2>
          <p className="text-secondary mb-0">Conoce algunos titulos recomendados disponibles en nuestra tienda.</p>
        </div>
        <a href="#contacto" className="btn btn-primary">Consultar disponibilidad</a>
      </div>

      <div className="row g-4">
        {destacados.map((producto) => (
          <div className="col-sm-6 col-lg-3" key={producto.titulo}>
            <article
              className={`card h-100 shadow-sm producto-card ${tarjetaActiva === producto.titulo ? 'border-primary is-active' : ''}`}
              onMouseOver={() => onActivarTarjeta(producto.titulo)}
              onMouseOut={() => onActivarTarjeta(null)}
            >
              <img src={publicPath(producto.imagen)} className="card-img-top destacados-img" alt={producto.alt} />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title h5">{producto.titulo}</h3>
                <p className="card-text text-secondary">{producto.descripcion}</p>
                <a href="#contacto" className="btn btn-outline-primary mt-auto">Ver producto</a>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Destacados;
