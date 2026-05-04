document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       1. TABS / FILTRADO POR AÑO (MATERIAS Y TALLERES)
       ========================================================================== */
    const tabHeaders = document.querySelectorAll('.cb-tabs-header');

    tabHeaders.forEach(header => {
        const container = header.closest('.cb-tabs-container') || header.parentElement;
        const buttons = header.querySelectorAll('.cb-tab-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                const selectedYear = button.getAttribute('data-year');
                const selectedYearTalleres = button.getAttribute('data-year-talleres');
                
                // Actualizar estado activo de los botones en este header
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // A. Cambio de contenido por ID (Sistema viejo / Directo)
                if (tabId) {
                    const contents = container.querySelectorAll('.cb-tab-content');
                    contents.forEach(content => content.classList.remove('active'));
                    const targetTab = document.getElementById(tabId);
                    if (targetTab) targetTab.classList.add('active');
                } 
                
                // B. Filtrado de Grid (Materias)
                if (selectedYear) {
                    // Buscar grid dentro del contenedor, o en toda la sección/documento si falla
                    let materiaCards = container.querySelectorAll('.subjects-grid .cb-card');
                    if (materiaCards.length === 0) {
                        const section = header.closest('section');
                        if (section) materiaCards = section.querySelectorAll('.subjects-grid .cb-card');
                    }
                    if (materiaCards.length === 0) {
                        materiaCards = document.querySelectorAll('.subjects-grid .cb-card');
                    }

                    materiaCards.forEach(card => {
                        card.style.display = (card.getAttribute('data-year') === selectedYear) ? 'flex' : 'none';
                    });
                    
                    // Actualizar título dinámico de materias
                    const yearNames = { 
                        '1': 'PRIMER AÑO', '2': 'SEGUNDO AÑO', 
                        '3': 'TERCER AÑO', '4': 'CUARTO AÑO', 
                        '5': 'QUINTO AÑO', '6': 'SEXTO AÑO' 
                    };
                    
                    // IDs posibles para el título
                    const titleIds = ['materias-year-title', 'compu-year-title', 'elec-year-title', 'meca-year-title'];
                    titleIds.forEach(id => {
                        const ele = document.getElementById(id);
                        if (ele && yearNames[selectedYear]) {
                            ele.textContent = 'PLAN DE ESTUDIOS - ' + yearNames[selectedYear];
                        }
                    });

                    const planGrid = document.querySelector('.plan-grid');
                    if (planGrid) planGrid.classList.remove('panel-open');
                }

                // C. Filtrado de Grid (Talleres - Ciclo Básico)
                if (selectedYearTalleres) {
                    const talleresCards = container.querySelectorAll('#talleres-grid .cb-card');
                    talleresCards.forEach(card => {
                        card.style.display = (card.getAttribute('data-year-talleres') === selectedYearTalleres) ? 'flex' : 'none';
                    });
                    const talleresTitle = document.getElementById('talleres-year-title');
                    if (talleresTitle) {
                        talleresTitle.textContent = selectedYearTalleres === '1' ? 'TALLERES - PRIMER AÑO' : 'TALLERES - SEGUNDO AÑO';
                    }
                }
            });
        });

        // Inicializar pestañas activas
        const activeTab = header.querySelector('.cb-tab-btn.active');
        if (activeTab) {
            // Disparar click para inicializar el filtrado
            activeTab.click();
        }
    });

    /* ==========================================================================
       2. ACORDEONES Y TARJETAS (MATERIAS)
       ========================================================================== */
    // Manejo de Subject Cards (.cb-card) para Ciclo Básico / Especialidades
    const cards = document.querySelectorAll('.cb-card:not(.cb-card--hours-display)');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Cerrar otras tarjetas en el mismo grid (opcional, pero mantiene orden)
            const parentGrid = card.closest('.cb-curriculum-grid') || card.closest('.subjects-grid');
            if (parentGrid) {
                parentGrid.querySelectorAll('.cb-card').forEach(c => {
                    if (c !== card) c.classList.remove('active');
                });
            }
            card.classList.toggle('active');
        });
    });

    // Manejo de Accordion Items (Estructura clásica de encabezado/contenido)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Cerrar otros items del mismo nivel
            const parent = item.parentElement;
            parent.querySelectorAll('.accordion-item').forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                    const c = i.querySelector('.accordion-content');
                    if (c) c.style.display = 'none';
                }
            });

            // Toggle actual
            if (!isActive) {
                item.classList.add('active');
                if (content) content.style.display = 'block';
            } else {
                item.classList.remove('active');
                if (content) content.style.display = 'none';
            }
        });
    });

    /* ==========================================================================
       3. MODAL DE PROYECTOS (ESPECIALIDADES)
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

    // Cerrar modal al hacer click afuera
    window.addEventListener('click', function (e) {
        const modal = document.getElementById('project-modal');
        if (e.target === modal) window.closeProjectModal();
    });

    /* ==========================================================================
       4. CARRUSELES DE INSTALACIONES
       ========================================================================== */
    const instDeslizador = document.getElementById('inst-deslizador');
    const prevBtnIds = ['compu-prev-btn', 'elec-prev-btn', 'meca-prev-btn', 'inst-prev-btn'];
    const nextBtnIds = ['compu-next-btn', 'elec-next-btn', 'meca-next-btn', 'inst-next-btn'];

    let instPrevBtn = null;
    let instNextBtn = null;

    prevBtnIds.forEach(id => { if (document.getElementById(id)) instPrevBtn = document.getElementById(id); });
    nextBtnIds.forEach(id => { if (document.getElementById(id)) instNextBtn = document.getElementById(id); });

    if (instDeslizador && instPrevBtn && instNextBtn) {
        let isScrolling = false;
        const handleScroll = (direction) => {
            if (isScrolling) return;
            isScrolling = true;
            
            if (direction === 'next') {
                const maxScroll = instDeslizador.scrollWidth - instDeslizador.clientWidth;
                if (instDeslizador.scrollLeft >= maxScroll - 10) {
                    instDeslizador.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    instDeslizador.scrollBy({ left: instDeslizador.clientWidth, behavior: 'smooth' });
                }
            } else {
                if (instDeslizador.scrollLeft <= 10) {
                    instDeslizador.scrollTo({ left: instDeslizador.scrollWidth, behavior: 'smooth' });
                } else {
                    instDeslizador.scrollBy({ left: -instDeslizador.clientWidth, behavior: 'smooth' });
                }
            }
            setTimeout(() => { isScrolling = false; }, 600);
        };
        
        instNextBtn.addEventListener('click', () => handleScroll('next'));
        instPrevBtn.addEventListener('click', () => handleScroll('prev'));
    }

    /* ==========================================================================
       5. EXTRAS ESPECÍFICOS (CICLO BÁSICO)
       ========================================================================== */
    // Toggle de detalle de programa (Syllabus)
    const syllabusBar = document.querySelector('.section-transition-bar');
    const syllabusDetail = document.getElementById('syllabus-detail');
    if (syllabusBar && syllabusDetail) {
        syllabusBar.addEventListener('click', () => {
            syllabusDetail.classList.toggle('active');
        });
    }

    // Visualización de carga horaria al clickear materias
    const grids = document.querySelectorAll('.cb-curriculum-grid');
    grids.forEach(grid => {
        const displayCard = grid.querySelector('.cb-card--hours-display');
        const subjectCards = grid.querySelectorAll('.cb-card:not(.cb-card--hours-display)');
        if (displayCard) {
            subjectCards.forEach(card => {
                card.addEventListener('click', () => {
                    const hours = card.getAttribute('data-hours');
                    if (hours) displayCard.textContent = `Carga horaria: ${hours}`;
                });
            });
        }
    });
});
