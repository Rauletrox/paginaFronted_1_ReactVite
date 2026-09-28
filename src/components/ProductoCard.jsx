import React from 'react';
import { publicPath } from '../utils/paths';

function ProductoCard({ producto, onAgregarCarrito }) {
  return (
    <div className="col-md-6">
      <article className="card h-100 shadow-sm">
        <img src={publicPath(producto.imagen)} className="card-img-top object-fit-cover catalogo-img" alt={producto.titulo} />
        <div className="card-body d-flex flex-column">
          <div className="d-flex flex-wrap gap-2 mb-2">
            <span className="badge text-bg-info">{producto.categoria}</span>
            {producto.oferta && <span className="badge text-bg-danger">Oferta</span>}
          </div>
          <h3 className="card-title h5">{producto.titulo}</h3>
          <p className="card-text text-secondary">{producto.descripcion}</p>
          <p className="fw-bold text-primary">{producto.precio}</p>
          <button className="btn btn-success mt-auto" type="button" onClick={() => onAgregarCarrito(producto)}>Agregar al carrito</button>
        </div>
      </article>
    </div>
  );
}

export default ProductoCard;
