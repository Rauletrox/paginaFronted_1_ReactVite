export function obtenerPrecioNumerico(precio) {
  return Number(precio.replace('$', '').replaceAll('.', ''));
}

export function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`;
}

export function calcularTotalCarrito(carrito) {
  return carrito.reduce((total, producto) => (
    total + obtenerPrecioNumerico(producto.precio) * producto.cantidad
  ), 0);
}
