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

// Obtiene todos los productos (cards)
const productos = document.querySelectorAll(".card");

// Obtiene los botones con los números de página
const paginas = document.querySelectorAll(".pagina-btn");

// Cantidad de productos que se mostrarán por página
const productosPorPagina = 10;

/*
Muestra únicamente los productos de la página seleccionada.
*/
function mostrarPagina(pagina){

    // Calcula el primer y último producto de esa página
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    // Recorre todos los productos
    productos.forEach((producto, indice)=>{

        if(indice >= inicio && indice < fin){
            producto.style.display = "block";
        }else{
            producto.style.display = "none";
        }

    });

    // Quita el color activo de todos los botones
    paginas.forEach(boton=>boton.classList.remove("active"));

    // Marca la página seleccionada
    paginas[pagina].classList.add("active");

}

// Asigna el evento click a cada botón de página
for(let i = 1; i <= 3; i++){

    paginas[i].addEventListener("click", ()=>{

        mostrarPagina(i);

    });

}

// Al cargar la página se muestran los primeros 10 productos
mostrarPagina(1);