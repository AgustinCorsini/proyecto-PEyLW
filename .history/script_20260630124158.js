// Carrusel con animación automática
const slides = document.querySelectorAll(".slide");
const dots   = document.querySelectorAll(".dot");
let actual   = 0;

// Función que muestra el slide y su dot correspondiente
function mostrarSlide(i){
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[i].classList.add("active");
    dots[i].classList.add("active");
}

// Función genérica para avanzar/retroceder
function cambiarSlide(dir){
    actual = (actual + dir + slides.length) % slides.length; 
    // % asegura que nunca se salga del rango
    mostrarSlide(actual);
}

const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

if(btnNext && btnPrev){
    btnNext.onclick = () => cambiarSlide(1);
    btnPrev.onclick = () => cambiarSlide(-1);
}

//Click en los dots
dots.forEach((dot,i) => dot.onclick = () => mostrarSlide(actual = i));

//  Carrusel automático cada 5 segundos
setInterval(() => cambiarSlide(1), 5000);


/*---------------- PAGINACIÓN ----------------*/

// Obtengo todos los productos
const productos = document.querySelectorAll(".card");

// Obtengo únicamente los botones con número
const paginas = document.querySelectorAll(".pagina-btn.numero");

// Obtengo las flechas
const btnAnterior = document.querySelector(".anterior");
const btnSiguiente = document.querySelector(".siguiente");

// Cantidad de productos por página
const productosPorPagina = 10;

// Página actual
let paginaActual = 1;

/*
Muestra solamente los productos correspondientes
a la página recibida.
*/
function mostrarPagina(pagina){
    paginaActual = pagina;

    // Calcula desde qué producto hasta cuál mostrar
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    // Muestra u oculta los productos
    productos.forEach((producto, indice)=>{
        if(indice >= inicio && indice < fin){
            producto.style.display = "block";
        }else{
            producto.style.display = "none";
        }

    });

    // Quita el activo de todos los botones
    paginas.forEach(boton=>boton.classList.remove("active"));

    // Activa el botón de la página actual
    paginas[pagina - 1].classList.add("active");

    // Deshabilita la flecha izquierda en la primera página
    if(pagina === 1){
        btnAnterior.classList.add("disabled");
    }else{
        btnAnterior.classList.remove("disabled");
    }

    // Deshabilita la flecha derecha en la última página
    if(pagina === paginas.length){
        btnSiguiente.classList.add("disabled");
    }else{
        btnSiguiente.classList.remove("disabled");
    }

}

/* Evento click para cada botón de página */
paginas.forEach((boton, indice)=>{

    boton.addEventListener("click", ()=>{
        mostrarPagina(indice + 1);
    });

});

/* Flecha anterior */
btnAnterior.addEventListener("click", ()=>{

    if(paginaActual > 1){
        mostrarPagina(paginaActual - 1);
    }

});

/* Flecha siguiente */
btnSiguiente.addEventListener("click", ()=>{

    if(paginaActual < paginas.length){
        mostrarPagina(paginaActual + 1);
    }

});

// Muestra la primera página al iniciar
mostrarPagina(1);




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