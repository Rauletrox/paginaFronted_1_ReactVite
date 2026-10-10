import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import Presentacion from './components/Presentacion';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import Categorias from './components/Categorias';
import Destacados from './components/Destacados';
import Footer from './components/Footer';
import OfertaDetalle from './components/OfertaDetalle';
import { paginasOfertas, rutasOfertasPorTitulo } from './data/siteData';
import { calcularCantidadCarrito, calcularTotalCarrito } from './utils/price';
import { filtrarProductos } from './utils/products';
import { publicPath } from './utils/paths';

function obtenerCarritoGuardado() {
  try {
    const carritoGuardado = localStorage.getItem('carritoCompra');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  } catch {
    localStorage.removeItem('carritoCompra');
    return [];
  }
}

function App() {
  const [rutaActual, setRutaActual] = useState(window.location.hash);
  const [mensajeHero, setMensajeHero] = useState('Somos tu tienda de videojuegos, consolas y accesorios. Encuentra tus juegos favoritos y disfruta de nuevas aventuras.');
  const [alertaHero, setAlertaHero] = useState('');
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [estadoProductos, setEstadoProductos] = useState({ tipo: 'info', texto: 'Cargando productos...' });
  const [carrito, setCarrito] = useState(obtenerCarritoGuardado);
  const [mensajeFormulario, setMensajeFormulario] = useState('');
  const [tarjetaActiva, setTarjetaActiva] = useState(null);

  // Carga el catalogo externo al iniciar la aplicacion.
  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    function actualizarRuta() {
      setRutaActual(window.location.hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('hashchange', actualizarRuta);
    return () => window.removeEventListener('hashchange', actualizarRuta);
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
    return filtrarProductos(productos, busqueda);
  }, [busqueda, productos]);

  const totalCarrito = calcularCantidadCarrito(carrito);
  const precioTotalCarrito = calcularTotalCarrito(carrito);
  const slugOfertaActual = rutaActual.replace(/^#\/ofertas\//, '');
  const ofertaActual = paginasOfertas.find((oferta) => oferta.slug === slugOfertaActual);
  const estaEnPaginaOferta = rutaActual.startsWith('#/ofertas/');

  // Actualiza contenido visual del hero mediante estado de React.
  function cambiarMensajeHero() {
    setMensajeHero('Tenemos novedades, ofertas y juegos destacados para tu proxima aventura.');
    setAlertaHero('Mensaje actualizado correctamente con estado de React.');
  }

  // Obtiene los productos desde un JSON local usando Fetch API.
  function cargarProductos() {
    setEstadoProductos({ tipo: 'info', texto: 'Cargando productos...' });

    fetch(publicPath('data/ofertas.json'))
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
      {estaEnPaginaOferta ? (
        <OfertaDetalle
          carrito={carrito}
          oferta={ofertaActual}
          onAgregarCarrito={agregarAlCarrito}
        />
      ) : (
        <>
          <Hero mensaje={mensajeHero} alerta={alertaHero} onCambiarMensaje={cambiarMensajeHero} />

          <main>
            <Carousel />
            <Presentacion />
            <Catalogo
              busqueda={busqueda}
              carrito={carrito}
              estado={estadoProductos}
              productos={productosFiltrados}
              rutasOfertas={rutasOfertasPorTitulo}
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
        </>
      )}

      <Footer mensajeFormulario={mensajeFormulario} onEnviarContacto={enviarContacto} />
    </div>
  );
}

export default App;
