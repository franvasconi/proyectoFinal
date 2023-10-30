document.addEventListener("DOMContentLoaded", () => {
   
    const productosDisponibles = [
        { nombre: "OFF-WHITE", precio: 200000, img:"./img/zapatillas.jpg"},
        { nombre: "DREW SHIRT", precio: 60000, img:"./img/remeras.jpg" },
        { nombre: "PANTS LAKERS", precio: 70000, img:"./img/pantalones.jpg" },
        { nombre: "SUPREME CUP", precio: 40000, img:"./img/accesorios.jpg" },
        { nombre: "NEW DROP",   precio: 300000, img:"./img/newdrop.jpg" },
        { nombre: "SUPREME", precio: 150000, img:"./img/supreme.jpg"},
        { nombre: "PALM ANGELS SHIRT", precio: 60000, img:"./img/palmangels.jpg" },
        { nombre: "ESSENTIALS HOODIE", precio: 70000, img:"./img/essentials.jpg" },
        { nombre: "PALM ANGELS SHIRT", precio: 40000, img:"./img/palmangels1.jpg" },
        { nombre: "BALENCIAGA SHIRT",   precio: 300000, img:"./img/balenciaga.jpg" },
    ];

    const catalogo = document.getElementById("catalogo");
    const carritoLista = document.getElementById("carrito-lista");
    const totalPrecio = document.getElementById("total-precio");
    const finalizarCompraBtn = document.getElementById("finalizar-compra");

    let carrito = cargarCarrito();

    
    function cargarCarrito() {
        const carritoJSON = localStorage.getItem("carrito");
        return carritoJSON ? JSON.parse(carritoJSON) : [];
    }


    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }


    function mostrarProductosDisponibles() {
        productosDisponibles.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");
            productoDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button class="comprar-btn">AGREGAR AL CARRITO</button>
                <img src="${producto.img}">
            `;
            productoDiv.querySelector(".comprar-btn").addEventListener("click", () => agregarProductoAlCarrito(producto.nombre));
            catalogo.appendChild(productoDiv);
        });
    }

    
    function agregarProductoAlCarrito(producto) {
        const itemCarrito = carrito.find(item => item.producto === producto);
        itemCarrito ? itemCarrito.cantidad++ : carrito.push({ producto, cantidad: 1 });
        actualizarCarrito();
        guardarCarrito();
    }


    function actualizarCarrito() {
        carritoLista.innerHTML = "";
        let compraTotal = 0;
        carrito.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.producto}: ${item.cantidad} unidades`;
            carritoLista.appendChild(listItem);
            const producto = productosDisponibles.find(p => p.nombre === item.producto);
            compraTotal += producto ? producto.precio * item.cantidad : 0;
        });
        totalPrecio.textContent = `Total a pagar: $${compraTotal}`;
    }

    
    finalizarCompraBtn.addEventListener("click", () => {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
        Swal.fire({
            title: 'COMPRA EXITOSA',
            text: 'DISFRUTE SU PRODUCTO, ESPERAMOS SU REGRESO!',
            confirmButtonText: 'ACEPTAR',
            iconHtml: '<i class="bi bi-cart-check-fill"></i>'
          })
       
                   
});



 
    mostrarProductosDisponibles();
    actualizarCarrito();
});


