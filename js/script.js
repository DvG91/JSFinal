let productos = []; // Array global para productos
carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Carrito en localStorage

document.addEventListener("DOMContentLoaded", () => {                       // Función principal que carga los productos al iniciar la página
    const productContainer = document.getElementById("product-container");

    fetch("js/productos.json")                                              // Carga los productos desde productos.json con fetch
        .then(response => response.json())          
        .then(data => {
            productos = data;                                               // Guardamos los productos en el array global
            data.forEach(producto => {
                const productCard = document.createElement("div");
                productCard.classList.add("col-md-4", "mb-4");
                productCard.innerHTML = `
                    <div class="card shadow-sm">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <!-- Input de cantidad -->
                            <input type="number" id="cantidad-${producto.id}" min="1" value="1" class="form-control mb-2">
                            <!-- Botón para agregar al carrito -->
                            <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                `;
                productContainer.appendChild(productCard);
            });

            renderizarCarrito();                                            // Renderiza el carrito al cargar la página
        })
        .catch(error => console.error("Error al cargar productos:", error));
});

function agregarAlCarrito(id) {                                             // Función para agregar productos al carrito
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value) || 1;

    const productoExistente = carrito.find(item => item.id === id);         // Verifica si el producto ya está en el carrito
    if (productoExistente) {
        productoExistente.cantidad += cantidad;                 // Si está, suma la cantidad existente
    } else {
        carrito.push({ id, cantidad });                         // Si no, agrega el producto al carrito
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));   // Guardar en localStorage
    renderizarCarrito();
}

function eliminarDelCarrito(id) {                                           // Función para eliminar producto del carrito
    carrito = carrito.filter(item => item.id !== id);           // Filtra el producto por ID
    localStorage.setItem("carrito", JSON.stringify(carrito));   // Actualiza localStorage, esto permite eliminar productos del carrito
    renderizarCarrito();
}

function renderizarCarrito() {                                  // Función para renderizar el carrito en la página
    const carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = "";                            // Limpia el carrito antes de renderizar

    let total = 0;              // Creamos variable para el total

    carrito.forEach(item => {                                   // Recorre los productos del carrito
        const producto = productos.find(p => p.id === item.id); // Obtener producto por ID
        total += producto.precio * item.cantidad;

        // Renderiza producto en el carrito
        carritoContainer.innerHTML += `                         
            <div class="d-flex justify-content-between align-items-center mb-2">
                <p>${producto.nombre} - $${producto.precio} x 
                <input type="number" min="1" value="${item.cantidad}" 
                    onchange="modificarCantidad(${item.id}, this.value)" 
                    style="width: 50px;">
                </p>
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">
                    Eliminar
                </button>
            </div>
        `;
    });

    carritoContainer.innerHTML += `<hr><strong>Total: $${total}</strong>`;             // Renderizar el total
    localStorage.setItem("carrito", JSON.stringify(carrito));                          // Actualiza localStorage
}

function modificarCantidad(id, nuevaCantidad) {                                     // Función para modificar cantidad desde el input en el carrito
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad = parseInt(nuevaCantidad) || 1;               // Actualiza la cantidad
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));           // Guardar los cambios
    renderizarCarrito();                                                // Y actualiza la vista
}

function vaciarCarrito() {                                              // Función para vaciar el carrito
    carrito = [];                                                       // Vacia el array
    localStorage.setItem("carrito", JSON.stringify(carrito));           // Actualiza localStorage
    renderizarCarrito();                                                // Y renderiza el carrito vacío
}

function comprar() {                                                            // Función para confirmar la compra
    if (carrito.length === 0) {
        swal("El carrito está vacío. Agrega productos antes de comprar.");
        return;
    }
    
    swal("¡Compra realizada!", "Gracias por su compra!", "success");                      //Una mejora visual, quito modal de bootstrap
    /*const modal = new bootstrap.Modal(document.getElementById("modalCompra"));          // Mostrar el modal de bootstrap
    modal.show();*/

    // Vacia el carrito después de la compra
    carrito = [];
    vaciarCarrito();
}