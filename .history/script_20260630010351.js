//Animación Carrusel
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let actual = 0;

function mostrarSlide(indice){

    slides.forEach(slide=>slide.classList.remove("active"));
    dots.forEach(dot=>dot.classList.remove("active"));

    slides[indice].classList.add("active");
    dots[indice].classList.add("active");

}

document.querySelector(".next").onclick=()=>{

    actual++;

    if(actual>=slides.length){

        actual=0;

    }

    mostrarSlide(actual);

}

document.querySelector(".prev").onclick=()=>{

    actual--;

    if(actual<0){

        actual=slides.length-1;

    }

    mostrarSlide(actual);

}

dots.forEach((dot,i)=>{

    dot.onclick=()=>{

        actual=i;

        mostrarSlide(actual);

    }

});

/* Carrusel automático */

setInterval(()=>{

    actual++;

    if(actual>=slides.length){

        actual=0;

    }

    mostrarSlide(actual);

},5000);
/*---------------- PAGINACIÓN ----------------*/

// Obtiene todos los productos
const productos = document.querySelectorAll(".card");

// Obtiene únicamente los botones con número
const paginas = document.querySelectorAll(".pagina-btn.numero");

// Obtiene las flechas
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


// Carrito
btnCarrito.onclick = ()=>{

    carrito.classList.toggle("abierto");

}
cerrarCarrito.onclick = ()=>{

    carrito.classList.remove("abierto");

}