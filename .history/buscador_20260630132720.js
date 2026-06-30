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
