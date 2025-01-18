let productoActual = '';
let descripcionActual = '';
let imagenesActuales = [];
let imagenPrincipal = '';
let descripcionProducto = [];
let preciosProducto = [];
let carrito = [];

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    actualizarCarrito(); // Actualizar la vista del carrito
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombreProducto, precio, cantidad) {
    cantidad = parseInt(cantidad); // Asegurarse de que la cantidad sea un número entero

    // Verificar si la cantidad es negativa o mayor a 10
    if (cantidad < 1 || cantidad > 10) {
        alert("La cantidad debe estar entre 1 y 10.");
        return; // No agregar el producto al carrito si la cantidad es inválida
    }

    // Limitar cantidad entre 1 y 10 (opcional, pero se deja por seguridad)
    cantidad = Math.max(1, Math.min(10, cantidad)); // Esto ya no es necesario debido a la validación anterior, pero se deja por seguridad

    // Verificar si el producto ya existe en el carrito
    let productoExistente = carrito.find(p => p.nombre === nombreProducto);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, solo actualizamos la cantidad
        productoExistente.cantidad += cantidad;
    } else {
        // Si el producto no está en el carrito, lo agregamos
        carrito.push({ nombre: nombreProducto, precio: precio, cantidad: cantidad });
    }

    // Guardar el carrito actualizado en localStorage
    guardarCarrito();

    // Mostrar alerta de "Producto agregado al carrito"
    alert(`${nombreProducto} ha sido agregado al carrito.`);

    // Actualizar el carrito en la interfaz
    actualizarCarrito();
}

// Función para actualizar el carrito visualmente
function actualizarCarrito() {
    const carritoDetalles = document.getElementById('carrito-detalles');
    const carritoCantidad = document.getElementById('carrito-cantidad');
    const carritoTotal = document.getElementById('carrito-total');

    carritoDetalles.innerHTML = ''; // Limpiar carrito antes de actualizar
    let subtotal = 0;
    
    carrito.forEach((producto, index) => {
        subtotal += producto.precio * producto.cantidad;
        carritoDetalles.innerHTML += `
            <div class="producto-carrito">
                <span>${producto.nombre}</span>
                <span> $${producto.precio} x </span>
                <!-- Usar <select> para elegir la cantidad -->
                <select onchange="cambiarCantidad(${index}, this.value)">
                    <option value="1" ${producto.cantidad === 1 ? 'selected' : ''}>1</option>
                    <option value="2" ${producto.cantidad === 2 ? 'selected' : ''}>2</option>
                    <option value="3" ${producto.cantidad === 3 ? 'selected' : ''}>3</option>
                    <option value="4" ${producto.cantidad === 4 ? 'selected' : ''}>4</option>
                    <option value="5" ${producto.cantidad === 5 ? 'selected' : ''}>5</option>
                    <option value="6" ${producto.cantidad === 6 ? 'selected' : ''}>6</option>
                    <option value="7" ${producto.cantidad === 7 ? 'selected' : ''}>7</option>
                    <option value="8" ${producto.cantidad === 8 ? 'selected' : ''}>8</option>
                    <option value="9" ${producto.cantidad === 9 ? 'selected' : ''}>9</option>
                    <option value="10" ${producto.cantidad === 10 ? 'selected' : ''}>10</option>
                </select>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </div>
        `;
    });

    // Calcular el total
    let iva = subtotal * 0.15;
    let totalConIva = subtotal + iva;

    // Actualizar el total del carrito
    carritoCantidad.textContent = carrito.length; // Número de productos en el carrito
    carritoTotal.innerHTML = `
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>IVA (15%): $${iva.toFixed(2)}</p>
        <p>Total: $${totalConIva.toFixed(2)}</p>
    `;
}

// Función para cambiar la cantidad de un producto en el carrito
function cambiarCantidad(index, cantidad) {
    cantidad = parseInt(cantidad); // Asegurarse de que la cantidad sea un número entero

    // Verificar si la cantidad es negativa o mayor a 10
    if (cantidad < 1 || cantidad > 10) {
        alert("La cantidad debe estar entre 1 y 10.");
        return; // No actualizar si la cantidad es inválida
    }

    // Limitar la cantidad entre 1 y 10
    cantidad = Math.max(1, Math.min(10, cantidad)); // Limitar la cantidad entre 1 y 10
    carrito[index].cantidad = cantidad; // Actualizar la cantidad del producto

    // Guardar el carrito actualizado en localStorage
    guardarCarrito();

    // Volver a actualizar el carrito con la nueva cantidad
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1); // Eliminar el producto por índice

    // Guardar el carrito actualizado en localStorage
    guardarCarrito();

    // Actualizar el carrito después de eliminar el producto
    actualizarCarrito();
}

// Función para cerrar el carrito
function cerrarCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.style.display = 'none';
}

// Función para abrir el carrito desplegable
function verCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.style.display = (carritoContenido.style.display === 'none' || carritoContenido.style.display === '') ? 'block' : 'none';
}

// Función para manejar la compra del producto
function finalizarCompra() {
    alert("¡Gracias por tu compra! La transacción ha sido realizada.");
    carrito = []; // Vaciar el carrito después de la compra

    // Guardar el carrito vacío en localStorage
    guardarCarrito();

    // Actualizar la vista del carrito
    actualizarCarrito();
}

// Función para ver la imagen grande al hacer clic
function verImagenGrande(imagen) {
    // Creamos un modal para la imagen ampliada
    const modal = document.createElement('div');
    modal.id = 'modal-imagen';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';

    const img = document.createElement('img');
    img.src = imagen.src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.objectFit = 'contain';
    img.style.border = '2px solid white';

    modal.appendChild(img);

    // Añadir el modal al body
    document.body.appendChild(modal);

    // Cerrar el modal cuando se haga clic en cualquier lugar
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
}

// Funciones para el menú
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
}

document.addEventListener("DOMContentLoaded", function() {
    cargarCarrito(); // Cargar el carrito desde localStorage cuando la página se cargue

    // Seleccionamos el contenedor del logo y el logo en sí
    const logoAnimation = document.getElementById('logoAnimation');
    const logoImage = document.getElementById('logoImage');

    // Función para iniciar la animación
    function animateLogo() {
        // Inicialmente el logo es grande y centrado
        logoImage.style.transform = 'scale(2)';
        logoAnimation.style.opacity = 1;

        // Después de 2 segundos, hacer que el logo se desplace hacia abajo y se desvanezca
        setTimeout(() => {
            logoImage.style.transform = 'scale(1)'; // Volver al tamaño original
            logoAnimation.style.opacity = 0; // Desaparecer el logo

            // Después de que el logo desaparezca, eliminamos el contenedor
            setTimeout(() => {
                logoAnimation.style.display = 'none';
            }, 2000); // Esto coincide con la duración de la animación (2 segundos)
        }, 2000); // Esto también dura 2 segundos, lo que es el tiempo que el logo permanece visible
    }

    // Llamamos a la función de animación
    animateLogo();
});
