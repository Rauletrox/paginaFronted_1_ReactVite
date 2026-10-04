export function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`;
}

export function obtenerPrecioProducto(producto) {
  return producto.oferta && producto.precioOferta ? producto.precioOferta : producto.precioNormal;
}

export function calcularPorcentajeDescuento(producto) {
  if (!producto.oferta || !producto.precioOferta || !producto.precioNormal) {
    return 0;
  }

  return Math.round(((producto.precioNormal - producto.precioOferta) / producto.precioNormal) * 100);
}

export function calcularAhorroProducto(producto) {
  if (!producto.oferta || !producto.precioOferta) {
    return 0;
  }

  return producto.precioNormal - producto.precioOferta;
}

export function calcularCantidadCarrito(carrito) {
  return carrito.reduce((total, producto) => total + producto.cantidad, 0);
}

export function calcularTotalCarrito(carrito) {
  return carrito.reduce((total, producto) => (
    total + obtenerPrecioProducto(producto) * producto.cantidad
  ), 0);
}
