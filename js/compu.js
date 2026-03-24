document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PLAN DE ESTUDIO - TABS Y MATERIAS
       ========================================================================== */
    const yearTabs = document.querySelectorAll('.cb-tabs-header .cb-tab-btn');
    const materiaCards = document.querySelectorAll('.subjects-grid .cb-card');
    

    // Lógica al hacer click en un año (tab)
    yearTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Actualizar botones de tabs
            yearTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedYear = tab.getAttribute('data-year');
            

            // Filtrar materias
            materiaCards.forEach(card => {
                if (card.getAttribute('data-year') === selectedYear) {
                    card.style.display = 'block'; // Mostrar
                } else {
                    card.style.display = 'none'; // Ocultar
                }
            });

            const planGrid = document.querySelector('.plan-grid');
            if (planGrid) planGrid.classList.remove('panel-open');
        });
    });

    // Inicializar mostrando el año seleccionado por defecto (e.g., 3ro año, que es el primero)
    const activeTab = document.querySelector('.cb-tabs-header .cb-tab-btn.active') || document.querySelector('.cb-tab-btn[data-year="3"]');
    if (activeTab) {
        if (!activeTab.classList.contains('active')) activeTab.classList.add('active');
        activeTab.click(); 
    }


    /* ==========================================================================
       3. MODAL DE PROYECTOS UX/UI
       ========================================================================== */
    window.openProjectModal = function(title, imgSrc, desc) {
        const modalTitle = document.getElementById('modal-title');
        const modalImg = document.getElementById('modal-img');
        const modalDesc = document.getElementById('modal-desc');
        const modal = document.getElementById('project-modal');

        if (modalTitle && modalImg && modalDesc && modal) {
            modalTitle.textContent = title;
            modalImg.src = imgSrc;
            modalDesc.textContent = desc;
            modal.style.display = 'flex';
        }
    };

    window.closeProjectModal = function() {
        const modal = document.getElementById('project-modal');
        if (modal) modal.style.display = 'none';
    };

    // Cerrar con click afuera del recuadro blanco
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('project-modal');
        if (e.target === modal) {
            window.closeProjectModal();
        }
    });

});