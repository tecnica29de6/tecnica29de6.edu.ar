document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('menu-hamburger');
    const nav = document.getElementById('navegacion');
    const icon = hamburger ? hamburger.querySelector('i') : null;

    if (!hamburger || !nav) {
        return;
    }

    const closeMenu = () => {
        nav.classList.remove('activo');
        hamburger.classList.remove('activo');
        hamburger.setAttribute('aria-expanded', 'false');

        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    const openMenu = () => {
        nav.classList.add('activo');
        hamburger.classList.add('activo');
        hamburger.setAttribute('aria-expanded', 'true');

        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    };

    hamburger.addEventListener('click', () => {
        if (nav.classList.contains('activo')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    const enlaces = nav.querySelectorAll('a:not(.nav-desplegable__toggle)');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', closeMenu);
    });
});
