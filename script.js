document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    
    // 1. Lógica del Menú Hamburguesa (UX/UI Responsive)
    // Al hacer clic en el ícono de hamburguesa, alterna la clase 'active' para mostrar/ocultar los enlaces.
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 2. Cerrar el menú al hacer clic en un enlace (para móviles)
    // Si el menú está abierto y se hace clic en un enlace de navegación, se cierra.
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 3. Simulación de Envío de Formulario
    // Detiene el envío HTTP por defecto y muestra un mensaje de confirmación.
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        
        if (nombre && email) {
            // Un alert simple para confirmar que el script funciona
            alert('✅ Mensaje de ' + nombre + ' enviado con éxito. Pronto nos pondremos en contacto contigo al email: ' + email + '.');
            contactForm.reset(); 
        } else {
            alert('⚠️ Por favor, completa todos los campos requeridos.');
        }
    });
});