import React from 'react';
import { publicPath } from '../utils/paths';
import { calcularAhorroProducto, calcularPorcentajeDescuento, formatearPrecio, obtenerPrecioProducto } from '../utils/price';

function ProductoCard({ producto, estaEnCarrito, onAgregarCarrito }) {
  const precioFinal = obtenerPrecioProducto(producto);
  const porcentajeDescuento = calcularPorcentajeDescuento(producto);
  const ahorro = calcularAhorroProducto(producto);

  return (
    <div className="col-md-6">
      <article className="card h-100 shadow-sm">
        <img src={publicPath(producto.imagen)} className="card-img-top object-fit-cover catalogo-img" alt={producto.titulo} />
        <div className="card-body d-flex flex-column">
          <div className="d-flex flex-wrap gap-2 mb-2">
            <span className="badge text-bg-info">{producto.categoria}</span>
            {producto.oferta && <span className="badge text-bg-danger">{porcentajeDescuento}% dcto.</span>}
          </div>
          <h3 className="card-title h5">{producto.titulo}</h3>
          <p className="card-text text-secondary">{producto.descripcion}</p>
          <div className="mb-3">
            {producto.oferta && (
              <p className="text-secondary text-decoration-line-through mb-1">
                Normal: {formatearPrecio(producto.precioNormal)}
              </p>
            )}
            <p className="fw-bold text-primary fs-5 mb-1">
              {producto.oferta ? 'Oferta: ' : 'Precio: '}
              {formatearPrecio(precioFinal)}
            </p>
            {producto.oferta && (
              <p className="small text-success mb-0">Ahorras {formatearPrecio(ahorro)}</p>
            )}
          </div>
          <button className={`btn mt-auto ${estaEnCarrito ? 'btn-outline-success' : 'btn-success'}`} type="button" onClick={() => onAgregarCarrito(producto)}>
            {estaEnCarrito ? 'En el carrito' : 'Agregar al carrito'}
          </button>
        </div>
      </article>
    </div>
  );
}

export default ProductoCard;
