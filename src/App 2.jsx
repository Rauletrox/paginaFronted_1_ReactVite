import { useEffect, useMemo, useState } from 'react';
import './App.css';

const destacados = [
  {
    titulo: 'Final Fantasy 7 Rebirth',
    descripcion: 'Cloud Strife y sus aliados abandonan Midgar para perseguir a Sephiroth a traves del planeta de Gaia.',
    imagen: '/assets/img/juegos/nintendo/finalfantasy7_rebirt_nsw2.jpg',
    alt: 'Portada de Final Fantasy 7 Rebirth para Nintendo Switch 2',
  },
  {
    titulo: 'Little Nightmares 3',
    descripcion: 'Low y Alone deben cooperar para escapar de los inquietantes parajes de El Espiral.',
    imagen: '/assets/img/juegos/nintendo/littlenightmare3_nsw2.jpg',
    alt: 'Portada de Little Nightmares 3 para Nintendo Switch 2',
  },
  {
    titulo: 'Nintendo World Championships',
    descripcion: 'Desafios de velocidad inspirados en los torneos clasicos de Nintendo de los anos 90.',
    imagen: '/assets/img/juegos/nintendo/nintendo-world-championships_-nes-edition-deluxe-set-1200x675-nsw.jpg',
    alt: 'Portada de Nintendo World Championships NES Edition',
  },
  {
    titulo: 'Tomodachi Life',
    descripcion: 'Un simulador de vida social donde tus personajes Mii conviven en una isla tropical.',
    imagen: '/assets/img/juegos/nintendo/tomodachi-nsw.jpg',
    alt: 'Portada de Tomodachi Life Living the Dream para Nintendo Switch 2',
  },
];

const resumenServicios = [
  {
    titulo: 'Videojuegos',
    descripcion: 'Lanzamientos y clasicos para disfrutar solo o con amigos.',
  },
  {
    titulo: 'Consolas',
    descripcion: 'Equipos para iniciar o renovar tu espacio gamer.',
  },
  {
    titulo: 'Accesorios',
    descripcion: 'Controles, audifonos y articulos para mejorar tu experiencia.',
  },
];

function obtenerPrecioNumerico(precio) {
  return Number(precio.replace('$', '').replaceAll('.', ''));
}

function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`;
}

function calcularTotalCarrito(carrito) {
  return carrito.reduce((total, producto) => (
    total + obtenerPrecioNumerico(producto.precio) * producto.cantidad
  ), 0);
}

function App() {
  const [mensajeHero, setMensajeHero] = useState('Somos tu tienda de videojuegos, consolas y accesorios. Encuentra tus juegos favoritos y disfruta de nuevas aventuras.');
  const [alertaHero, setAlertaHero] = useState('');
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [estadoProductos, setEstadoProductos] = useState({ tipo: 'info', texto: 'Cargando productos...' });
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carritoCompra');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  const [mensajeFormulario, setMensajeFormulario] = useState('');
  const [tarjetaActiva, setTarjetaActiva] = useState(null);

  // Carga el catalogo externo al iniciar la aplicacion.
  useEffect(() => {
    cargarProductos();
  }, []);

  // Sincroniza el carrito con localStorage para usarlo tambien en checkout.html.
  useEffect(() => {
    if (carrito.length === 0) {
      localStorage.removeItem('carritoCompra');
      return;
    }

    localStorage.setItem('carritoCompra', JSON.stringify(carrito));
  }, [carrito]);

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    if (!termino) {
      return productos;
    }

    return productos.filter((producto) => (
      producto.titulo.toLowerCase().includes(termino)
      || producto.categoria.toLowerCase().includes(termino)
      || producto.descripcion.toLowerCase().includes(termino)
    ));
  }, [busqueda, productos]);

  const totalCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  const precioTotalCarrito = calcularTotalCarrito(carrito);

  // Actualiza contenido visual del hero mediante estado de React.
  function cambiarMensajeHero() {
    setMensajeHero('Tenemos novedades, ofertas y juegos destacados para tu proxima aventura.');
    setAlertaHero('Mensaje actualizado correctamente con estado de React.');
  }

  // Obtiene los productos desde un JSON local usando Fetch API.
  function cargarProductos() {
    setEstadoProductos({ tipo: 'info', texto: 'Cargando productos...' });

    fetch('/data/ofertas.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los productos.');
        }

        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
        setEstadoProductos({ tipo: 'success', texto: 'Productos cargados correctamente desde Fetch API.' });
      })
      .catch((error) => {
        setProductos([]);
        setEstadoProductos({ tipo: 'danger', texto: `No pudimos cargar el catalogo. ${error.message}` });
      });
  }

  // Procesa el formulario de busqueda sin recargar la pagina.
  function buscarProductos(event) {
    event.preventDefault();
    setEstadoProductos({
      tipo: 'success',
      texto: `${productosFiltrados.length} producto(s) encontrado(s).`,
    });
  }

  // Agrega productos al carrito o aumenta su cantidad si ya existen.
  function agregarAlCarrito(producto) {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === producto.id);

      if (existe) {
        return carritoActual.map((item) => (
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        ));
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  }

  // Elimina un producto completo del carrito segun su id.
  function eliminarDelCarrito(idProducto) {
    setCarrito((carritoActual) => carritoActual.filter((producto) => producto.id !== idProducto));
  }

  // Valida el formulario de contacto y muestra un mensaje condicional.
  function enviarContacto(event) {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const nombre = datos.get('nombre').trim();
    const email = datos.get('email').trim();

    if (!nombre || !email) {
      setMensajeFormulario('Completa tu nombre y correo antes de enviar.');
      return;
    }

    setMensajeFormulario(`Gracias, ${nombre}. Te contactaremos pronto a ${email}.`);
    event.currentTarget.reset();
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar totalCarrito={totalCarrito} />
      <Hero mensaje={mensajeHero} alerta={alertaHero} onCambiarMensaje={cambiarMensajeHero} />

      <main>
        <Carousel />
        <Presentacion />
        <Catalogo
          busqueda={busqueda}
          estado={estadoProductos}
          productos={productosFiltrados}
          onBuscar={buscarProductos}
          onCambiarBusqueda={setBusqueda}
          onRecargar={cargarProductos}
          onAgregarCarrito={agregarAlCarrito}
        />
        <Carrito
          productos={carrito}
          totalProductos={totalCarrito}
          totalPrecio={precioTotalCarrito}
          onEliminarProducto={eliminarDelCarrito}
        />
        <Categorias />
        <Destacados
          tarjetaActiva={tarjetaActiva}
          onActivarTarjeta={setTarjetaActiva}
        />
      </main>

      <Footer mensajeFormulario={mensajeFormulario} onEnviarContacto={enviarContacto} />
    </div>
  );
}

function Navbar({ totalCarrito }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
          <img src="/assets/img/logos_tienda/LOGO-ALTA-UNA-U.png" alt="Logo de Una U pa Delante" width="56" height="40" className="object-fit-contain" />
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
              <a className="nav-link position-relative d-inline-flex align-items-center" href="/checkout.html" aria-label="Ver detalle de compra">
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

function Hero({ mensaje, alerta, onCambiarMensaje }) {
  return (
    <header id="inicio" className="bg-dark text-white text-center py-5">
      <div className="container">
        <img src="/assets/img/logos_tienda/LOGO-ALTA-UNA-U.png" alt="Logo de la tienda Una U pa Delante" className="img-fluid mb-4" width="220" height="147" />
        <h1 className="display-5 fw-bold">Tu tienda favorita de videojuegos</h1>
        <p className="lead mb-4">{mensaje}</p>
        <button className="btn btn-info" type="button" onClick={onCambiarMensaje}>Cambiar mensaje</button>
        {alerta && <div className="alert alert-info mt-4 mb-0" role="status">{alerta}</div>}
      </div>
    </header>
  );
}

function Carousel() {
  return (
    <section className="container my-5" aria-labelledby="titulo-carrusel">
      <h2 id="titulo-carrusel" className="h3 mb-4">Novedades destacadas</h2>
      <div id="carouselProductos" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          {destacados.slice(0, 3).map((producto, index) => (
            <button key={producto.titulo} type="button" data-bs-target="#carouselProductos" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : undefined} aria-label={`Producto destacado ${index + 1}`} />
          ))}
        </div>
        <div className="carousel-inner rounded">
          {destacados.slice(0, 3).map((producto, index) => (
            <div key={producto.titulo} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={producto.imagen} className="d-block w-100 object-fit-cover carousel-img" alt={producto.alt} />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                <h3 className="h5">{producto.titulo}</h3>
                <p className="mb-0">{producto.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselProductos" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselProductos" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}

function Presentacion() {
  return (
    <section className="container my-5" aria-labelledby="titulo-presentacion">
      <div className="row align-items-center g-4">
        <div className="col-lg-5">
          <img src="/assets/img/logos_tienda/Maquina Arcade 4.png" alt="Maquina arcade decorativa de la tienda" className="img-fluid rounded shadow-sm" />
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

function ProductoCard({ producto, onAgregarCarrito }) {
  return (
    <div className="col-md-6">
      <article className="card h-100 shadow-sm">
        <img src={producto.imagen.replace('assets/', '/assets/')} className="card-img-top object-fit-cover catalogo-img" alt={producto.titulo} />
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
            <a className={`btn btn-primary ${productos.length === 0 ? 'disabled' : ''}`} href="/checkout.html" aria-disabled={productos.length === 0}>
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
                        {producto.precio} x {producto.cantidad}
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="fw-bold">{formatearPrecio(obtenerPrecioNumerico(producto.precio) * producto.cantidad)}</span>
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

function Categorias() {
  return (
    <>
      <section id="nintendo" className="container my-5" aria-labelledby="titulo-nintendo">
        <div className="p-4 bg-white border rounded">
          <h2 id="titulo-nintendo" className="h3">Categoria Nintendo</h2>
          <p className="text-secondary mb-0">Juegos, accesorios y packs pensados para jugadores de Nintendo Switch.</p>
        </div>
      </section>

      <section id="pc-gaming" className="container my-5" aria-labelledby="titulo-pc">
        <div className="p-4 bg-white border rounded">
          <h2 id="titulo-pc" className="h3">Categoria PC Gaming</h2>
          <p className="text-secondary mb-0">Componentes y articulos para mejorar tu computador gamer.</p>
        </div>
      </section>
    </>
  );
}

function Destacados({ tarjetaActiva, onActivarTarjeta }) {
  return (
    <section className="container my-5" aria-labelledby="titulo-destacados">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <h2 id="titulo-destacados" className="h3 mb-2">Videojuegos destacados</h2>
          <p className="text-secondary mb-0">Conoce algunos titulos recomendados disponibles en nuestra tienda.</p>
        </div>
        <a href="#contacto" className="btn btn-primary">Consultar disponibilidad</a>
      </div>

      <div className="row g-4">
        {destacados.map((producto) => (
          <div className="col-sm-6 col-lg-3" key={producto.titulo}>
            <article
              className={`card h-100 shadow-sm producto-card ${tarjetaActiva === producto.titulo ? 'border-primary is-active' : ''}`}
              onMouseOver={() => onActivarTarjeta(producto.titulo)}
              onMouseOut={() => onActivarTarjeta(null)}
            >
              <img src={producto.imagen} className="card-img-top destacados-img" alt={producto.alt} />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title h5">{producto.titulo}</h3>
                <p className="card-text text-secondary">{producto.descripcion}</p>
                <a href="#contacto" className="btn btn-outline-primary mt-auto">Ver producto</a>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

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

export default App;
