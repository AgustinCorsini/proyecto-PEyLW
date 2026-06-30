//================ BUSCADOR ================

// Campo donde el usuario escribe
const buscador = document.getElementById("buscador");

// Mensaje cuando no existen coincidencias
const sinResultados = document.getElementById("sinResultados");
/*
Busca productos por nombre mientras el usuario escribe.
Si el buscador queda vacío vuelve a mostrar la paginación.
*/

buscador.addEventListener("input", ()=>{

    // Convierte el texto a minúsculas para no distinguir mayúsculas
    const texto = buscador.value.toLowerCase().trim();

    // Si el buscador está vacío vuelve a la paginación
    if(texto === ""){

        mostrarPagina(paginaActual);

        sinResultados.style.display = "none";

        return;

    }

    let encontrados = 0;

    productos.forEach(producto=>{

        // Obtiene el nombre del producto
        const nombre = producto.querySelector("h3").textContent.toLowerCase();

        // Si contiene el texto buscado lo muestra
        if(nombre.includes(texto)){

            producto.style.display = "block";
            encontrados++;

        }else{

            producto.style.display = "none";

        }

    });

    // Oculta la paginación mientras se busca
    document.querySelector(".paginacion").style.display = "none";

    // Muestra mensaje si no hubo resultados
    if(encontrados === 0){

        sinResultados.style.display = "block";

    }else{

        sinResultados.style.display = "none";

    }

});

//================ Carrusel ================
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

//  Botones de navegación
document.querySelector(".next").onclick = () => cambiarSlide(1);
document.querySelector(".prev").onclick = () => cambiarSlide(-1);

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
    document.querySelector(".paginacion").style.display = "flex";

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
