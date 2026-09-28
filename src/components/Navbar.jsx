import React from 'react';
import { publicPath } from '../utils/paths';

function Navbar({ totalCarrito }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
          <img src={publicPath('assets/img/logos_tienda/LOGO-ALTA-UNA-U.png')} alt="Logo de Una U pa Delante" width="56" height="40" className="object-fit-contain" />
          <span>Una U pa Delante</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menú de navegación">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link active" aria-current="page" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#productos">Productos</a></li>
            <li className="nav-item"><a className="nav-link" href="#nintendo">Nintendo</a></li>
            <li className="nav-item"><a className="nav-link" href="#pc-gaming">PC Gaming</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
            <li className="nav-item ms-lg-3">
              <a className="nav-link position-relative d-inline-flex align-items-center" href={publicPath('checkout.html')} aria-label="Ver detalle de compra">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="me-1" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .49.402L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.49-.402L1.61 2H.5a.5.5 0 0 1-.5-.5zM4.14 10h8.456l1.286-6H3.11l1.03 6z" />
                  <path d="M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <span className="visually-hidden">Carrito</span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info text-dark">{totalCarrito}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
