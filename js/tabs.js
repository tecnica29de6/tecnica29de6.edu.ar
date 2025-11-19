document.addEventListener('DOMContentLoaded', () => {

    // 1. Encontrar la columna principal
    const mainColumn = document.querySelector('.main-column');
    if (!mainColumn) return;

    // 2. Encontrar el video (para insertar las pestañas *después* de él)
    const videoContainer = mainColumn.querySelector('.video-container');
    if (!videoContainer) return;
    
    // 3. Encontrar todas las secciones de contenido que se convertirán en pestañas
    const contentSections = mainColumn.querySelectorAll('.content-section');
    if (contentSections.length < 1) {
        // No hay nada que convertir en pestañas
        return;
    }

    // 4. Crear los contenedores principales del sistema de pestañas
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';

    const tabsNav = document.createElement('div');
    tabsNav.className = 'tabs-nav'; // Barra de botones izquierda

    const tabsContent = document.createElement('div');
    tabsContent.className = 'tabs-content'; // Área de contenido derecha

    // 5. Procesar cada 'content-section'
    contentSections.forEach((section, index) => {
        // Encontrar el título H2 dentro de la sección
        const h2 = section.querySelector('h2');
        if (!h2) return; // Si no hay H2, no podemos crear un botón

        const title = h2.textContent;
        // Creamos un ID único para vincular el botón y el panel
        const paneId = `tab-pane-${index}`;

        // a. Crear el botón de navegación
        const button = document.createElement('button');
        button.className = 'tabs-nav-button';
        button.textContent = title;
        // Guardamos una referencia al ID del panel que debe activar
        button.dataset.target = `#${paneId}`;
        tabsNav.appendChild(button);

        // b. Modificar la sección original para que sea un panel
        section.id = paneId;
        section.classList.add('tabs-pane'); // Añadimos clase para estilos
        h2.style.display = 'none'; // Ocultamos el H2 original (ya está en el botón)
        
        // Movemos la sección (ahora un panel) al contenedor de contenido
        tabsContent.appendChild(section);

        // c. Añadir el evento de clic al botón
        button.addEventListener('click', () => {
            // Ocultar todo
            tabsNav.querySelectorAll('.tabs-nav-button').forEach(btn => {
                btn.classList.remove('active');
            });
            tabsContent.querySelectorAll('.tabs-pane').forEach(pane => {
                pane.classList.remove('active');
            });

            // Mostrar el actual
            button.classList.add('active');
            document.querySelector(button.dataset.target).classList.add('active');
        });
    });

    // 6. Ensamblar y mostrar el sistema de pestañas
    tabsContainer.appendChild(tabsNav);
    tabsContainer.appendChild(tabsContent);

    // Insertar el nuevo sistema de pestañas justo después del video
    videoContainer.insertAdjacentElement('afterend', tabsContainer);

    // 7. Activar la primera pestaña por defecto
    if (tabsNav.children.length > 0) {
        tabsNav.children[0].classList.add('active');
    }
    if (tabsContent.children.length > 0) {
        tabsContent.children[0].classList.add('active');
    }

    document.addEventListener('click', function(e) {
    if (e.target.classList.contains('accordion-header')) {
        const header = e.target;
        const content = header.nextElementSibling;

        // Cerrar otros
        document.querySelectorAll('.accordion-content').forEach(c => {
            if (c !== content) c.style.display = 'none';
        });
        document.querySelectorAll('.accordion-header').forEach(h => {
            if (h !== header) h.classList.remove('active');
        });

        // Toggle del actual
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        header.classList.toggle('active');
    }
});
});
