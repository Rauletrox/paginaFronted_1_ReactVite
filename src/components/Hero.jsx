import React from 'react';
import { publicPath } from '../utils/paths';

function Hero({ mensaje, alerta, onCambiarMensaje }) {
  return (
    <header id="inicio" className="bg-dark text-white text-center py-5">
      <div className="container">
        <img src={publicPath('assets/img/logos_tienda/LOGO-ALTA-UNA-U.png')} alt="Logo de la tienda Una U pa Delante" className="img-fluid mb-4" width="220" height="147" />
        <h1 className="display-5 fw-bold">Tu tienda favorita de videojuegos</h1>
        <p className="lead mb-4">{mensaje}</p>
        <button className="btn btn-info" type="button" onClick={onCambiarMensaje}>Cambiar mensaje</button>
        {alerta && <div className="alert alert-info mt-4 mb-0" role="status">{alerta}</div>}
      </div>
    </header>
  );
}

export default Hero;
