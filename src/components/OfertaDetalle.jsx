import React from 'react';
import { publicPath } from '../utils/paths';

function OfertaDetalle({ oferta }) {
  if (!oferta) {
    return (
      <main className="container my-5">
        <div className="p-4 bg-white border rounded">
          <h1 className="h3">Oferta no encontrada</h1>
          <p className="text-secondary">La pagina que buscas no existe o fue movida.</p>
          <a href="#inicio" className="btn btn-primary">Volver al inicio</a>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-dark text-white py-5" aria-labelledby="titulo-oferta">
        <div className="container">
          <a href="#inicio" className="btn btn-outline-light mb-4">Volver al inicio</a>
          <h1 id="titulo-oferta" className="display-5 fw-bold">{oferta.titulo}</h1>
          <p className="lead mb-0">{oferta.descripcion}</p>
        </div>
      </section>

      <section className="container my-5" aria-label={`Ofertas de ${oferta.titulo}`}>
        <div className="row g-4">
          {oferta.imagenes.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.imagen}>
              <article className="card h-100 shadow-sm">
                <img src={publicPath(item.imagen)} className="card-img-top object-fit-cover oferta-img" alt={item.titulo} />
                <div className="card-body">
                  <h2 className="card-title h5">{item.titulo}</h2>
                  <p className="card-text text-secondary mb-0">{item.descripcion}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default OfertaDetalle;
