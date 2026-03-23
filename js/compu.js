document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PLAN DE ESTUDIO - TABS Y MATERIAS
       ========================================================================== */
    const yearTabs = document.querySelectorAll('.cb-tabs-header .cb-tab-btn');
    const materiaCards = document.querySelectorAll('.subjects-grid .cb-card');
    
    // Elementos del panel lateral
    const pTitle = document.getElementById('panel-title');
    const pDesc = document.getElementById('panel-desc');
    const pHours = document.getElementById('panel-hours');

    const sidePanel = document.querySelector('.side-panel-detail');
    if (sidePanel) sidePanel.style.display = 'none'; // oculto por defecto

    // Función para actualizar el panel
    function updatePanel(card) {
        if (!card) return;
        const titleEl = card.querySelector('.cb-card__title');
        
        // Si la tarjeta ya estaba activa, se oculta el panel
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            if (sidePanel) sidePanel.style.display = 'none';
            document.querySelector('.plan-grid').classList.remove('panel-open');
            return;
        }

        pTitle.textContent = titleEl ? titleEl.textContent.trim().toUpperCase() : card.textContent.trim().toUpperCase();
        pDesc.textContent = card.getAttribute('data-desc') || "Descripción no disponible para esta materia.";
        pHours.textContent = `carga horaria: ${card.getAttribute('data-hours') || "N/A"}`;
        
        // Mostrar panel
        if (sidePanel) sidePanel.style.display = 'block';
        document.querySelector('.plan-grid').classList.add('panel-open');

        // Estilo activo
        materiaCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    }

    // Lógica al hacer click en una materia
    materiaCards.forEach(card => {
        card.addEventListener('click', () => updatePanel(card));
    });

    // Lógica al hacer click en un año (tab)
    yearTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Actualizar botones de tabs
            yearTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedYear = tab.getAttribute('data-year');
            
            // Actualizar badge de año
            const badgeYearText = document.getElementById('badge-year-text');
            if (badgeYearText) {
                badgeYearText.textContent = tab.textContent.trim().toUpperCase();
            }

            // Filtrar materias
            materiaCards.forEach(card => {
                if (card.getAttribute('data-year') === selectedYear) {
                    card.style.display = 'block'; // Mostrar
                } else {
                    card.style.display = 'none'; // Ocultar
                }
                card.classList.remove('active');
            });

            // Ocultar panel al cambiar de año, obliga a elegir una materia nueva
            if (sidePanel) sidePanel.style.display = 'none';
            const planGrid = document.querySelector('.plan-grid');
            if (planGrid) planGrid.classList.remove('panel-open');
        });
    });

    // Inicializar mostrando el año seleccionado por defecto (e.g., 4to año)
    const activeTab = document.querySelector('.cb-tabs-header .cb-tab-btn.active');
    if (activeTab) {
        activeTab.click(); // Disparar el filtro inicial
    }

    /* ==========================================================================
       2. SLIDER DE COMPETENCIAS
       ========================================================================== */
    const sliderItems = [
        { t: "Dominio de Paradigmas de Programación", d: "Manejar los distintos paradigmas de la programación." },
        { t: "Polivalencia en Lenguajes de Desarrollo", d: "Seleccionar y aplicar lenguajes de programación de diferentes características." },
        { t: "Pensamiento Lógico y Administración de Datos", d: "Desarrollar un pensamiento lógico y estructurado que le permita un correcto y eficiente desempeño en las actividades relacionadas con la programación y administración de datos." },
        { t: "Implementación de Diseño de Software", d: "Interpretar e implementar el diseño de una aplicación." },
        { t: "Optimización de la Experiencia de Usuario", d: "Facilitar la operatoria del usuario." },
        { t: "Seguridad e Integridad de la Información", d: "Mantener la integridad de los datos locales del usuario, protección total (virus)." },
        { t: "Despliegue de Redes y Sistemas", d: "Instalar y poner en marcha componentes o sistemas, equipos y redes." },
        { t: "Mantenimiento Preventivo y Correctivo de Hardware", d: "Mantener equipos y sistemas de baja complejidad o componentes de los mismos." },
        { t: "Gestión del Entorno Operativo", d: "Optimizar el ambiente informático de trabajo del usuario." },
        { t: "Consultoría Comercial Informática", d: "Asesorar y apoyar en la compra y en la venta de productos o servicios informáticos." },
        { t: "Autogestión y Emprendimiento Profesional", d: "Autogestionar sus actividades." }
    ];
    let currentSlide = 0;

    const sliderContent = document.getElementById('slider-content');
    const sliderTitle = document.querySelector('.slider-content h2');
    const sliderDesc = document.querySelector('.slider-content p');
    const btnNext = document.getElementById('slider-next');
    const btnPrev = document.getElementById('slider-prev');

    function updateSliderAnim() {
        if (!sliderContent) return;
        sliderContent.style.opacity = '0';
        setTimeout(() => {
            sliderTitle.textContent = sliderItems[currentSlide].t;
            sliderDesc.textContent = sliderItems[currentSlide].d;
            sliderContent.style.opacity = '1';
        }, 300);
    }

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % sliderItems.length;
            updateSliderAnim();
        });
        btnPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
            updateSliderAnim();
        });
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