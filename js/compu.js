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

            // Actualizar título dinámico
            const yearNames = { '3': 'TERCER AÑO', '4': 'CUARTO AÑO', '5': 'QUINTO AÑO', '6': 'SEXTO AÑO' };
            const eleTitle = document.getElementById('compu-year-title');
            if (eleTitle && yearNames[selectedYear]) {
                eleTitle.textContent = 'PLAN DE ESTUDIOS - ' + yearNames[selectedYear];
            }

            const planGrid = document.querySelector('.plan-grid');
            if (planGrid) planGrid.classList.remove('panel-open');
        });
    });

    // Inicializar mostrando el año activo por defecto
    const activeTab = document.querySelector('.cb-tabs-header .cb-tab-btn.active');
    if (activeTab) {
        activeTab.click();
    }


    /* ==========================================================================
       3. MODAL DE PROYECTOS
       ========================================================================== */
    window.openProjectModal = function (title, imgSrc, desc) {
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

    window.closeProjectModal = function () {
        const modal = document.getElementById('project-modal');
        if (modal) modal.style.display = 'none';
    };

    window.addEventListener('click', function (e) {
        const modal = document.getElementById('project-modal');
        if (e.target === modal) {
            window.closeProjectModal();
        }
    });

    /* ==========================================================================
       4. CARRUSEL DE INSTALACIONES (NATIVO Y ROBUSTO)
       ========================================================================== */
    const instDeslizador = document.getElementById('inst-deslizador');
    const instPrevBtn = document.getElementById('compu-prev-btn');
    const instNextBtn = document.getElementById('compu-next-btn');

    if (instDeslizador && instPrevBtn && instNextBtn) {
        
        instNextBtn.addEventListener('click', () => {
            const maxScroll = instDeslizador.scrollWidth - instDeslizador.clientWidth;
            if (instDeslizador.scrollLeft >= maxScroll - 10) {
                instDeslizador.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                instDeslizador.scrollBy({ left: instDeslizador.clientWidth, behavior: 'smooth' });
            }
        });

        instPrevBtn.addEventListener('click', () => {
            if (instDeslizador.scrollLeft <= 10) {
                instDeslizador.scrollTo({ left: instDeslizador.scrollWidth, behavior: 'smooth' });
            } else {
                instDeslizador.scrollBy({ left: -instDeslizador.clientWidth, behavior: 'smooth' });
            }
        });

        // No se requiere lógica de resize compleja con scroll nativo (el navegador lo maneja)
    }

});
