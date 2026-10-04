export function filtrarProductos(productos, busqueda) {
  const termino = busqueda.trim().toLowerCase();

  if (!termino) {
    return productos;
  }

  return productos.filter((producto) => (
    producto.titulo.toLowerCase().includes(termino)
    || producto.categoria.toLowerCase().includes(termino)
    || producto.descripcion.toLowerCase().includes(termino)
  ));
}
