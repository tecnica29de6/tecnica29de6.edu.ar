// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona los elementos del carrusel
    const deslizador = document.querySelector('.carrusel-deslizador');
    const slides = document.querySelectorAll('.carrusel-diapositiva');
    const botonAnterior = document.getElementById('prevBtn');
    const botonSiguiente = document.getElementById('nextBtn');
    
    //  Dropdown Móvil
    const menuHamburger = document.getElementById('menu-hamburger');
    const navegacion = document.getElementById('navegacion');

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

        // Cerrar el menú al hacer clic en un enlace
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

    // Lógica del Carrusel con Transform (Alto Rendimiento)
    if (deslizador && slides.length > 0 && botonAnterior && botonSiguiente) {
        let indiceActual = 0;

        const actualizarCarrusel = () => {
            const desplazamiento = -indiceActual * (100 / slides.length);
            deslizador.style.transform = `translateX(${desplazamiento}%)`;
        };

        botonSiguiente.addEventListener('click', () => {
            if (indiceActual >= slides.length - 1) {
                indiceActual = 0; // Volver al inicio
            } else {
                indiceActual++;
            }
            actualizarCarrusel();
        });

        botonAnterior.addEventListener('click', () => {
            if (indiceActual <= 0) {
                indiceActual = slides.length - 1; // Ir al final
            } else {
                indiceActual--;
            }
            actualizarCarrusel();
        });

        // Ajuste para resize (actualizar cálculo si cambia el ancho)
        window.addEventListener('resize', () => {
            actualizarCarrusel();
        });
    }

});
