import React from 'react';
import { formatearPrecio, obtenerPrecioProducto } from '../utils/price';
import { publicPath } from '../utils/paths';

function Carrito({ productos, totalProductos, totalPrecio, onEliminarProducto }) {
  return (
    <section className="container my-5" aria-labelledby="titulo-carrito">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
            <div>
              <h2 id="titulo-carrito" className="h3 mb-1">Carrito de compras</h2>
              <p className="text-secondary mb-0">Resumen de productos agregados antes de ir al pago.</p>
            </div>
            <a className={`btn btn-primary ${productos.length === 0 ? 'disabled' : ''}`} href={publicPath('checkout.html')} aria-disabled={productos.length === 0}>
              Ir al checkout
            </a>
          </div>

          {productos.length === 0 ? (
            <div className="alert alert-warning mb-0" role="status">Todavia no hay productos en el carrito.</div>
          ) : (
            <>
              <ul className="list-group mb-3">
                {productos.map((producto) => (
                  <li className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3" key={producto.id}>
                    <div>
                      <strong>{producto.titulo}</strong>
                      <div className="text-secondary small">
                        {formatearPrecio(obtenerPrecioProducto(producto))} x {producto.cantidad}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-bold">{formatearPrecio(obtenerPrecioProducto(producto) * producto.cantidad)}</span>
                      <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onEliminarProducto(producto.id)}>
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="d-flex flex-column flex-md-row justify-content-between gap-2 fs-5 fw-bold">
                <span>Total productos: {totalProductos}</span>
                <span>Total precio: {formatearPrecio(totalPrecio)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Carrito;
