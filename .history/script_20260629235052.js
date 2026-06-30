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



/*==========================================================
                    PAGINACIÓN DE PRODUCTOS
==========================================================*/

/*
Obtiene todas las tarjetas de productos.
querySelectorAll devuelve un NodeList similar a un arreglo.
*/
const productos = document.querySelectorAll(".card");

/*
Cantidad de productos que se mostrarán por página.
Si en el futuro querés mostrar 8 o 12 solamente cambiás este número.
*/
const productosPorPagina = 10;

/*
Math.ceil redondea hacia arriba.

Ejemplo:
30 productos / 10 = 3 páginas
27 productos / 10 = 2.7 -> 3 páginas
*/
const totalPaginas = Math.ceil(productos.length / productosPorPagina);

/*
Página actual.
Se comienza siempre en la primera.
*/
let paginaActual = 1;


/*
Obtiene todos los botones numéricos (1,2,3).
Se excluyen las flechas utilizando :not().
*/
const botonesPagina = document.querySelectorAll(".pagina-btn:not(.anterior):not(.siguiente)");

/*
Botones de avanzar y retroceder.
*/
const btnAnterior = document.querySelector(".anterior");
const btnSiguiente = document.querySelector(".siguiente");


/*==========================================================
            FUNCIÓN QUE MUESTRA LOS PRODUCTOS
==========================================================*/

function mostrarPagina(numeroPagina){

    /*
    Guarda cuál es la página actual.
    */
    paginaActual = numeroPagina;

    /*
    Calcula desde qué producto comienza la página.

    Página 1:
    (1-1)*10 = 0

    Página 2:
    (2-1)*10 = 10

    Página 3:
    (3-1)*10 = 20
    */
    const inicio = (paginaActual - 1) * productosPorPagina;

    /*
    Calcula hasta qué producto mostrar.

    Página 1:
    0 + 10 = 10

    Página 2:
    10 + 10 = 20
    */
    const fin = inicio + productosPorPagina;


    /*
    Recorre todos los productos.

    Si el índice pertenece al rango de la página,
    se muestra.

    Caso contrario se oculta.
    */
    productos.forEach((producto, indice)=>{

        if(indice >= inicio && indice < fin){

            producto.style.display = "block";

        }else{

            producto.style.display = "none";

        }

    });


    /*
    Quita la clase active de todos los botones.
    */
    botonesPagina.forEach(btn=>{

        btn.classList.remove("active");

    });


    /*
    Marca el botón correspondiente a la página actual.
    Como los arreglos empiezan en 0,
    se resta 1.
    */
    botonesPagina[paginaActual-1].classList.add("active");


    /*
    Si estamos en la primera página,
    se deshabilita el botón anterior.
    */
    btnAnterior.classList.toggle("disabled", paginaActual === 1);


    /*
    Si estamos en la última página,
    se deshabilita el botón siguiente.
    */
    btnSiguiente.classList.toggle("disabled", paginaActual === totalPaginas);

}


/*==========================================================
        EVENTOS DE LOS BOTONES NUMÉRICOS
==========================================================*/

/*
Cada botón conoce su posición mediante el índice i.

Botón 0 -> Página 1

Botón 1 -> Página 2

Botón 2 -> Página 3
*/
botonesPagina.forEach((boton,i)=>{

    boton.addEventListener("click",()=>{

        mostrarPagina(i+1);

    });

});


/*==========================================================
            BOTÓN SIGUIENTE
==========================================================*/

btnSiguiente.addEventListener("click",()=>{

    /*
    Solo cambia de página si todavía no llegó
    a la última.
    */
    if(paginaActual < totalPaginas){

        mostrarPagina(paginaActual+1);

    }

});


/*==========================================================
            BOTÓN ANTERIOR
==========================================================*/

btnAnterior.addEventListener("click",()=>{

    /*
    Solo retrocede si no estamos en la primera.
    */
    if(paginaActual > 1){

        mostrarPagina(paginaActual-1);

    }

});


/*==========================================================
        AL CARGAR LA PÁGINA
==========================================================*/

/*
Se muestran automáticamente los primeros
10 productos.
*/
mostrarPagina(1);