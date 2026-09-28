import React from 'react';
import ProductoCard from './ProductoCard';

function Catalogo({ busqueda, estado, productos, onBuscar, onCambiarBusqueda, onRecargar, onAgregarCarrito }) {
  return (
    <section id="productos" className="container my-5" aria-labelledby="titulo-productos">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
        <div>
          <h2 id="titulo-productos" className="h3 mb-2">Catalogo de productos</h2>
          <p className="text-secondary mb-0">Los productos se cargan desde un archivo JSON local usando Fetch API dentro de React.</p>
        </div>
        <form className="d-flex gap-2" role="search" onSubmit={onBuscar}>
          <label htmlFor="busqueda" className="visually-hidden">Buscar productos</label>
          <input id="busqueda" className="form-control" type="search" placeholder="Buscar videojuego o categoria" value={busqueda} onChange={(event) => onCambiarBusqueda(event.target.value)} />
          <button className="btn btn-primary" type="submit">Buscar</button>
        </form>
      </div>

      <div className={`alert alert-${estado.tipo}`} role="status">{estado.texto}</div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" type="button" onClick={onRecargar}>Recargar productos</button>
      </div>
      <div className="row g-4">
        {productos.length === 0 ? (
          <div className="col-12">
            <p className="text-secondary mb-0">No hay productos para mostrar.</p>
          </div>
        ) : (
          productos.map((producto) => (
            <ProductoCard key={producto.id} producto={producto} onAgregarCarrito={onAgregarCarrito} />
          ))
        )}
      </div>
    </section>
  );
}

export default Catalogo;
