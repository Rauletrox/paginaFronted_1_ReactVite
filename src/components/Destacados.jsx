import React from 'react';
import { destacados } from '../data/siteData';
import { publicPath } from '../utils/paths';
import { calcularAhorroProducto, calcularPorcentajeDescuento, formatearPrecio, obtenerPrecioProducto } from '../utils/price';

function Destacados({ carrito, tarjetaActiva, onActivarTarjeta, onAgregarCarrito }) {
  return (
    <section className="container my-5" aria-labelledby="titulo-destacados">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <h2 id="titulo-destacados" className="h3 mb-2">OFERTAS CYBER</h2>
          <p className="text-secondary mb-0">Videojuegos seleccionados con 50% de descuento cyber.</p>
        </div>
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
                <div className="d-flex flex-wrap gap-2 mb-2">
                  <span className="badge text-bg-info">{producto.categoria}</span>
                  <span className="badge text-bg-danger">50% dcto. cyber</span>
                </div>
                <h3 className="card-title h5">{producto.titulo}</h3>
                <p className="card-text text-secondary">{producto.descripcion}</p>
                <div className="mb-3">
                  <p className="mb-1">
                    Antes <span className="text-secondary text-decoration-line-through">{formatearPrecio(producto.precioNormal)}</span>
                  </p>
                  <p className="fw-bold text-primary fs-5 mb-1">
                    Ahora con un {calcularPorcentajeDescuento(producto)}% de descuento queda en {formatearPrecio(obtenerPrecioProducto(producto))}
                  </p>
                  <p className="small text-success mb-0">Ahorras {formatearPrecio(calcularAhorroProducto(producto))}</p>
                </div>
                <button
                  className={`btn mt-auto ${carrito.some((item) => item.id === producto.id) ? 'btn-outline-success' : 'btn-success'}`}
                  type="button"
                  onClick={() => onAgregarCarrito(producto)}
                >
                  {carrito.some((item) => item.id === producto.id) ? 'En el carrito' : 'Agregar al carrito'}
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Destacados;
