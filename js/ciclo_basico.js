document.addEventListener('DOMContentLoaded', () => {
    // Original Tab System Logic
    const tabHeaders = document.querySelectorAll('.cb-tabs-header');

    tabHeaders.forEach(header => {
        const container = header.closest('.cb-tabs-container');
        const buttons = header.querySelectorAll('.cb-tab-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                const selectedYear = button.getAttribute('data-year');
                
                // Remove active class from buttons in THIS header
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (tabId) {
                    // Logic for content switching (Old system)
                    const contents = container.querySelectorAll('.cb-tab-content');
                    contents.forEach(content => content.classList.remove('active'));
                    const targetTab = document.getElementById(tabId);
                    if (targetTab) {
                        targetTab.classList.add('active');
                    }
                } else if (selectedYear) {
                    // Logic for grid filtering (Materias)
                    const materiaCards = container.querySelectorAll('.subjects-grid .cb-card');
                    materiaCards.forEach(card => {
                        if (card.getAttribute('data-year') === selectedYear) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    // Update dynamic title
                    const materiasTitle = document.getElementById('materias-year-title');
                    if (materiasTitle) {
                        materiasTitle.textContent = selectedYear === '1'
                            ? 'PLAN DE ESTUDIOS - PRIMER AÑO'
                            : 'PLAN DE ESTUDIOS - SEGUNDO AÑO';
                    }
                } else if (button.getAttribute('data-year-talleres')) { // Changed to else if
                    const selectedYearTalleres = button.getAttribute('data-year-talleres');
                    // Logic for grid filtering (Talleres)
                    const talleresCards = container.querySelectorAll('#talleres-grid .cb-card');
                    talleresCards.forEach(card => {
                        if (card.getAttribute('data-year-talleres') === selectedYearTalleres) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    // Update dynamic title
                    const talleresTitle = document.getElementById('talleres-year-title');
                    if (talleresTitle) {
                        talleresTitle.textContent = selectedYearTalleres === '1'
                            ? 'TALLERES - PRIMER AÑO'
                            : 'TALLERES - SEGUNDO AÑO';
                    }
                }
            });
        });

        // Initialize grid filtering for active tab if it uses data-year
        const activeYearTab = header.querySelector('.cb-tab-btn.active[data-year]');
        if (activeYearTab) {
            activeYearTab.click();
        }

        // Initialize grid filtering for active tab if it uses data-year-talleres
        const activeYearTalleresTab = header.querySelector('.cb-tab-btn.active[data-year-talleres]');
        if (activeYearTalleresTab) {
            activeYearTalleresTab.click();
        }
    });

    // Syllabus Detail Toggle
    const syllabusBar = document.querySelector('.section-transition-bar');
    const syllabusDetail = document.getElementById('syllabus-detail');

    if (syllabusBar && syllabusDetail) {
        syllabusBar.addEventListener('click', () => {
            syllabusDetail.classList.toggle('active');
        });
    }

    // Hourly load interaction
    const grids = document.querySelectorAll('.cb-curriculum-grid');

    grids.forEach(grid => {
        const displayCard = grid.querySelector('.cb-card--hours-display');
        const subjectCards = grid.querySelectorAll('.cb-card:not(.cb-card--hours-display)');

        if (displayCard) {
            subjectCards.forEach(card => {
                card.addEventListener('click', () => {
                    const hours = card.getAttribute('data-hours');
                    if (hours) {
                        displayCard.textContent = `Carga horaria: ${hours}`;
                    }
                });
            });
        }
    });

    // (Mobile menu toggle moved to index.js to handle it globally)
});
