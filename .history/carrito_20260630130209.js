/*---------------- Carrito ----------------*/

// Obtiene el botón del carrito
const btnCarrito = document.getElementById("btnCarrito");

// Obtiene el panel lateral
const carrito = document.getElementById("carrito");

// Botón para cerrar el carrito
const cerrarCarrito = document.getElementById("cerrarCarrito");

// Abre o cierra el carrito
btnCarrito.addEventListener("click", ()=>{

    carrito.classList.toggle("abierto");

});

// Cierra el carrito
cerrarCarrito.addEventListener("click", ()=>{

    carrito.classList.remove("abierto");

});

/*---------------- Agregar Productos al Carrito ----------------*/

// Arreglo donde se guardarán los productos
let carritoProductos = [];

// Botones "Agregar"
const botonesAgregar = document.querySelectorAll(".btn-agregar");

// Contenedor donde se mostrarán los productos
const itemsCarrito = document.getElementById("items-carrito");

// Contador del carrito
const contador = document.getElementById("contador-carrito");

// Total
const total = document.getElementById("total");


// Agrega el evento click a todos los botones
botonesAgregar.forEach(boton => {

    boton.addEventListener("click", () => {
        // Crea un objeto con los datos del botón
        const producto = {
            id: boton.dataset.id,
            nombre: boton.dataset.nombre,
            precio: Number(boton.dataset.precio)
        };

        // Lo agrega al arreglo
        carritoProductos.push(producto);

        // Actualiza el carrito
        actualizarCarrito();

    });

});


/*
Actualiza el contenido del carrito,
el contador y el total.
*/
function actualizarCarrito(){
    itemsCarrito.innerHTML = "";

    let suma = 0;

    carritoProductos.forEach((producto, indice)=>{
        suma += producto.precio;

        itemsCarrito.innerHTML += `
            <div class="item-carrito">

                <span>${producto.nombre}</span>
                <span>$${producto.precio.toLocaleString()}</span>
                <button class="eliminar" data-indice="${indice}">
                    X
                </button>

            </div>
        `;

    });

    contador.textContent = carritoProductos.length;
    total.textContent = suma.toLocaleString();
    eliminarProductos();
}


/*
Asigna el evento eliminar a cada botón X.
*/
function eliminarProductos(){
    const botonesEliminar = document.querySelectorAll(".eliminar");

    botonesEliminar.forEach(boton=>{

        boton.addEventListener("click", ()=>{
            const indice = boton.dataset.indice;
            carritoProductos.splice(indice,1);
            actualizarCarrito();

        });
    });
}