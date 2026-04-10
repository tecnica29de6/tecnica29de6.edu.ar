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
            const eleTitle = document.getElementById('elec-year-title');
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
       4. CARRUSEL DE INSTALACIONES (OPTIMIZADO Y MULTI-ITEM)
       ========================================================================== */
    const instDeslizador = document.getElementById('inst-deslizador');
    const instPrevBtn = document.getElementById('elec-prev-btn');
    const instNextBtn = document.getElementById('elec-next-btn');

    if (instDeslizador && instPrevBtn && instNextBtn) {
        const slides = instDeslizador.querySelectorAll('img');
        let indiceActual = 0;

        const obtenerItemsPorVista = () => {
            if (window.innerWidth > 1024) return 3;
            if (window.innerWidth > 768) return 2;
            return 1;
        };

        const actualizarCarrusel = () => {
            const itemsPorVista = obtenerItemsPorVista();
            const anchoItem = 100 / itemsPorVista;
            const desplazamiento = -indiceActual * anchoItem;
            instDeslizador.style.transform = `translateX(${desplazamiento}%)`;
        };

        instNextBtn.addEventListener('click', () => {
            const itemsPorVista = obtenerItemsPorVista();
            if (indiceActual + itemsPorVista >= slides.length) {
                indiceActual = 0;
            } else {
                indiceActual += itemsPorVista;
            }
            actualizarCarrusel();
        });

        instPrevBtn.addEventListener('click', () => {
            const itemsPorVista = obtenerItemsPorVista();
            if (indiceActual - itemsPorVista < 0) {
                indiceActual = Math.max(0, slides.length - itemsPorVista);
            } else {
                indiceActual -= itemsPorVista;
            }
            actualizarCarrusel();
        });

        window.addEventListener('resize', actualizarCarrusel);
    }

});
