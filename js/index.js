// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona los elementos del carrusel
    const deslizador = document.querySelector('.carrusel-deslizador');
    const botonAnterior = document.getElementById('prevBtn');
    const botonSiguiente = document.getElementById('nextBtn');
    
    //  Dropdown Móvil
    const menuHamburger = document.getElementById('menu-hamburger');
    const navegacion = document.getElementById('navegacion');
    const navDesplegableToggle = document.querySelector('.nav-desplegable__toggle');

    if (menuHamburger && navegacion) {
        menuHamburger.addEventListener('click', () => {
            navegacion.classList.toggle('activo');
            menuHamburger.classList.toggle('activo');
            
            const icon = menuHamburger.querySelector('i');
            if (navegacion.classList.contains('activo')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar el menú al hacer clic en un enlace (excepto el toggle del dropdown)
        const enlaces = navegacion.querySelectorAll('a:not(.nav-desplegable__toggle)');
        enlaces.forEach(enlace => {
            enlace.addEventListener('click', () => {
                navegacion.classList.remove('activo');
                menuHamburger.classList.remove('activo');
                const icon = menuHamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Logic for dropdown removed as links are now flat

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