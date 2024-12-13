let productos = [];

    // Carrito (vacío al inicio)
    let carrito = [];

    // Elementos del DOM
    const productosContainer = document.getElementById("productos-container");
    const totalElement = document.getElementById("total");
    const verCarritoButton = document.getElementById("ver-carrito");

    // Renderizar productos en el DOM
    const renderizarProductos = () => {
        productosContainer.innerHTML = ""; // Limpiar contenido previo

        productos.forEach((producto) => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("col-md-4", "col-lg-3", "mb-4");

            tarjeta.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">$ ${producto.precio.toLocaleString()}</h5>
                        <p class="card-text">${producto.nombre}</p>
                        <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
                    </div>
                </div>
            `;

            productosContainer.appendChild(tarjeta);
        });

        // Agregar eventos a los botones
        document.querySelectorAll(".agregar-carrito").forEach((boton) => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    };

    // Función para agregar al carrito
    const agregarAlCarrito = (e) => {
        const idProducto = parseInt(e.target.getAttribute("data-id"));
        const producto = productos.find((prod) => prod.id === idProducto);

        if (producto) {
            carrito.push(producto);
            calcularTotal();
            alert(`Producto agregado: ${producto.nombre}`);
        }
    };

    // Calcular el total del carrito
    const calcularTotal = () => {
        const total = carrito.reduce((acum, producto) => acum + producto.precio, 0);
        totalElement.textContent = total.toLocaleString();
    };

    // Mostrar el carrito en la consola (se puede reemplazar por modal)
    verCarritoButton.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
        } else {
            console.table(carrito);
            alert(`Tienes ${carrito.length} producto(s) en tu carrito.`);
        }
    });

    // Inicialización
    renderizarProductos();