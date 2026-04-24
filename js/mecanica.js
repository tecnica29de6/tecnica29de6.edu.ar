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
            const mecaTitle = document.getElementById('meca-year-title');
            if (mecaTitle && yearNames[selectedYear]) {
                mecaTitle.textContent = 'PLAN DE ESTUDIOS - ' + yearNames[selectedYear];
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
    const instPrevBtn = document.getElementById('meca-prev-btn');
    const instNextBtn = document.getElementById('meca-next-btn');

    if (instDeslizador && instPrevBtn && instNextBtn) {
        let isScrolling = false;

        const handleScroll = (direction) => {
            if (isScrolling) return;
            isScrolling = true;

            if (direction === 'next') {
                const maxScroll = instDeslizador.scrollWidth - instDeslizador.clientWidth;
                if (instDeslizador.scrollLeft >= maxScroll - 10) {
                    instDeslizador.scrollTo({ left: 0 });
                } else {
                    instDeslizador.scrollBy({ left: instDeslizador.clientWidth });
                }
            } else {
                if (instDeslizador.scrollLeft <= 10) {
                    instDeslizador.scrollTo({ left: instDeslizador.scrollWidth });
                } else {
                    instDeslizador.scrollBy({ left: -instDeslizador.clientWidth });
                }
            }

            setTimeout(() => { isScrolling = false; }, 600); // Duración de la transición smooth
        };

        instNextBtn.addEventListener('click', () => handleScroll('next'));
        instPrevBtn.addEventListener('click', () => handleScroll('prev'));
    }
});
