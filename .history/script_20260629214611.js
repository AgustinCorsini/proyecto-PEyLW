//Animación Carrusel
const slides = document.querySelector(".slide");
const dots = document.querySelector(".dot");

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