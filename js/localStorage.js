let carrito = JSON.parse(localStorage.getItem("carrito")) || [];   // Declaro carrito

productos = [];                             // Lista de productos disponibles

function agregarAlCarrito(id) {
    const productoSeleccionado = productos.find(prod => prod.id === id);        // Busca el producto en el catálogo
    
    if (!productoSeleccionado) return;                                         // Si no existe, salimos de la función

    const productoEnCarrito = carrito.find(item => item.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ 
            id: productoSeleccionado.id, 
            nombre: productoSeleccionado.nombre, 
            precio: productoSeleccionado.precio, 
            cantidad: 1 
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}