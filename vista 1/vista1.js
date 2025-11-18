// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona los elementos del carrusel
    const deslizador = document.querySelector('.carrusel-deslizador');
    const botonAnterior = document.getElementById('prevBtn');
    const botonSiguiente = document.getElementById('nextBtn');
    
    // Verifica si los elementos existen en la página
    if (deslizador && botonAnterior && botonSiguiente) {

        // Evento para el botón "Siguiente"
        botonSiguiente.addEventListener('click', () => {
            // Calcula el ancho de una diapositiva
            const anchoSlide = deslizador.querySelector('.carrusel-diapositiva').clientWidth;
            // Mueve el scroll a la derecha por el ancho de una diapositiva
            deslizador.scrollLeft += anchoSlide;
        });

        // Evento para el botón "Anterior"
        botonAnterior.addEventListener('click', () => {
            // Calcula el ancho de una diapositiva
            const anchoSlide = deslizador.querySelector('.carrusel-diapositiva').clientWidth;
            // Mueve el scroll a la izquierda por el ancho de una diapositiva
            deslizador.scrollLeft -= anchoSlide;
        });
    }

});