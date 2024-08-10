// script.js

// Aquí puedes incluir las clases Producto y Carrito y las funciones
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        const index = this.productos.findIndex(item => item.producto === producto);
        if (index > -1) {
            this.productos[index].cantidad += cantidad;
        } else {
            this.productos.push({ producto, cantidad });
        }
    }

    calcularTotal() {
        return this.productos.reduce((total, item) =>
            total + item.producto.precio * item.cantidad, 0);
    }

    mostrarDetalles() {
        let detalles = '';
        this.productos.forEach(item => {
            detalles += `${item.producto.nombre} - $${item.producto.precio} x ${item.cantidad} = $${item.producto.precio * item.cantidad}\n`;
        });
        detalles += `Total: $${this.calcularTotal()}`;
        return detalles;
    }
}

const productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Pan de Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

const carrito = new Carrito();

function mostrarProductos() {
    let productosTexto = 'Productos Disponibles:\n';
    productosDisponibles.forEach((producto, index) => {
        productosTexto += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
    });
    return productosTexto;
}

function agregarAlCarrito() {
    const productoId = parseInt(prompt('Ingrese el número del producto que desea comprar:'));
    const cantidad = parseInt(prompt('Ingrese la cantidad:'));

    if (isNaN(productoId) || isNaN(cantidad) || productoId < 1 || productoId > productosDisponibles.length || cantidad <= 0) {
        alert('Datos inválidos. Inténtelo de nuevo.');
        return;
    }

    const producto = productosDisponibles[productoId - 1];
    carrito.agregarProducto(producto, cantidad);
    return `Producto agregado: ${producto.nombre} x ${cantidad}\n\nEl carrito ahora tiene:\n${carrito.mostrarDetalles()}`;
}

function finalizarCompra() {
    if (carrito.productos.length === 0) {
        return 'El carrito está vacío';
    }

    const total = carrito.calcularTotal();
    let descuento = 0;

    if (total > 5000) {
        descuento = total * 0.1;
    }

    const totalFinal = total - descuento;

    carrito.productos = [];
    return `Total a pagar: $${totalFinal.toFixed(2)}\nDescuento aplicado: $${descuento.toFixed(2)}`;
}

function agregarMasProductos() {
    let resultado = '';
    let continuar = true;

    while (continuar) {
        resultado += agregarAlCarrito() + '\n';
        const respuesta = prompt('¿Desea agregar más productos al carrito? (S/N)').toLowerCase();

        if (respuesta === 's') {
            continuar = true;
        } else if (respuesta === 'n') {
            continuar = false;
        } else {
            alert('Respuesta no válida. Por favor ingrese "S" o "N".');
        }
    }

    resultado += finalizarCompra();
    return resultado;
}

document.getElementById('mostrarProductos').addEventListener('click', () => {
    document.getElementById('resultado').innerText = mostrarProductos();
});

document.getElementById('agregarAlCarrito').addEventListener('click', () => {
    document.getElementById('resultado').innerText = agregarAlCarrito();
});

document.getElementById('finalizarCompra').addEventListener('click', () => {
    document.getElementById('resultado').innerText = finalizarCompra();
});

document.getElementById('agregarMasProductos').addEventListener('click', () => {
    document.getElementById('resultado').innerText = agregarMasProductos();
});

