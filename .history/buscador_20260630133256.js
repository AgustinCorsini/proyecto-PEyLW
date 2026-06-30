// Selecciono el input y todas las tarjetas de productos
const buscador = document.getElementById("buscador");
const productos = document.querySelectorAll(".card");

// Evento: cada vez que el usuario escribe en el input
buscador.addEventListener("keyup", ()=>{
  const texto = buscador.value.toLowerCase(); // normalizo a minúsculas

  productos.forEach(producto=>{
    const nombre = producto.querySelector("h3").textContent.toLowerCase();

    // Si el texto buscado está dentro del nombre del producto, se muestra
    if(nombre.includes(texto)){
        producto.style.display = "block";
    }else{
        producto.style.display = "none";
    }
});
});
