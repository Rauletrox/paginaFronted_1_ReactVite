import React from 'react';
import { resumenServicios } from '../data/siteData';
import { publicPath } from '../utils/paths';

function Presentacion() {
  return (
    <section className="container my-5" aria-labelledby="titulo-presentacion">
      <div className="row align-items-center g-4">
        <div className="col-lg-5">
          <img src={publicPath('assets/img/logos_tienda/Maquina Arcade 4.png')} alt="Maquina arcade decorativa de la tienda" className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-lg-7">
          <h2 id="titulo-presentacion" className="h3">Bienvenido a Una U pa Delante</h2>
          <p className="fs-5 text-secondary">Somos una tienda especializada en videojuegos. Contamos con juegos para diferentes plataformas, consolas y accesorios para jugadores.</p>
          <div className="row g-3">
            {resumenServicios.map((servicio) => (
              <div className="col-md-4" key={servicio.titulo}>
                <div className="p-3 bg-white border rounded h-100">
                  <h3 className="h6">{servicio.titulo}</h3>
                  <p className="mb-0 text-secondary">{servicio.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Presentacion;
