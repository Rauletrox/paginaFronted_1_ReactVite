import React from 'react';

function Footer({ mensajeFormulario, onEnviarContacto }) {
  return (
    <footer id="contacto" className="bg-dark text-white py-4">
      <div className="container text-center">
        <h2 className="h4">Contacto</h2>
        <p className="mb-1">Una U pa Delante - Tienda de Videojuegos</p>
        <p className="mb-3">
          Correo: <a href="mailto:contacto@unaupadelante.cl" className="link-info">contacto@unaupadelante.cl</a>
        </p>
        <ul className="nav justify-content-center gap-3 mb-3">
          <li className="nav-item"><a href="https://www.instagram.com/unaupadelante/" className="link-info">Instagram</a></li>
          <li className="nav-item"><a href="https://open.spotify.com/show/55B2uIjux1x0ItjP1Y36UK?si=F2HfkPCkTkS_hjYmrr6XYg&nd=1&dlsi=d672dcbd4efd426c" className="link-info">Spotify</a></li>
        </ul>
        <form className="row g-2 justify-content-center mb-3" noValidate onSubmit={onEnviarContacto}>
          <div className="col-md-4">
            <label htmlFor="nombre" className="visually-hidden">Nombre</label>
            <input id="nombre" name="nombre" className="form-control" type="text" placeholder="Tu nombre" required />
          </div>
          <div className="col-md-4">
            <label htmlFor="email" className="visually-hidden">Correo electronico</label>
            <input id="email" name="email" className="form-control" type="email" placeholder="Tu correo" required />
          </div>
          <div className="col-md-auto">
            <button className="btn btn-info w-100" type="submit">Enviar</button>
          </div>
        </form>
        <div className="small text-info" role="status">{mensajeFormulario}</div>
        <p className="small text-white-50 mb-0">&copy; 2026 Una U pa Delante fue creado por zuniga-industries.cl. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
