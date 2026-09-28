const carritoCompra = JSON.parse(localStorage.getItem("carritoCompra")) || [];

document.addEventListener("DOMContentLoaded", () => {
    renderizarDetalleCompra();
    configurarPago();
});

// Muestra los productos seleccionados desde la aplicacion React.
function renderizarDetalleCompra() {
    const listaDetalle = document.querySelector("#detalle-compra");
    const totalPago = document.querySelector("#total-pago");
    const mensajeCarrito = document.querySelector("#mensaje-carrito");
    const botonPagar = document.querySelector("#btn-pagar");

    listaDetalle.innerHTML = "";

    if (carritoCompra.length === 0) {
        mensajeCarrito.className = "alert alert-warning";
        mensajeCarrito.textContent = "No hay productos en el carrito. Vuelve a la tienda para agregar productos.";
        botonPagar.disabled = true;
        return;
    }

    mensajeCarrito.className = "alert alert-success";
    mensajeCarrito.textContent = "Revisa tu pedido antes de confirmar el pago.";

    carritoCompra.forEach((producto) => {
        const subtotal = obtenerPrecioNumerico(producto.precio) * producto.cantidad;
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between gap-3";
        item.innerHTML = `
            <span>${producto.titulo} <span class="text-secondary">x${producto.cantidad}</span></span>
            <strong>${formatearPrecio(subtotal)}</strong>
        `;
        listaDetalle.appendChild(item);
    });

    totalPago.textContent = formatearPrecio(calcularTotal());
}

// Simula el pago sin recargar la pagina.
function configurarPago() {
    const formulario = document.querySelector("#form-pago");
    const mensajePago = document.querySelector("#mensaje-pago");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const metodoPago = formulario.metodoPago.value;
        mensajePago.classList.remove("d-none");
        mensajePago.textContent = `Pago realizado con ${metodoPago}. Gracias por tu compra.`;
        localStorage.removeItem("carritoCompra");
    });
}

function calcularTotal() {
    return carritoCompra.reduce((suma, producto) => {
        return suma + obtenerPrecioNumerico(producto.precio) * producto.cantidad;
    }, 0);
}

function obtenerPrecioNumerico(precio) {
    return Number(precio.replace("$", "").replaceAll(".", ""));
}

function formatearPrecio(valor) {
    return `$${valor.toLocaleString("es-CL")}`;
}
