document.addEventListener('DOMContentLoaded', () => {
    // Original Tab System Logic
    const tabHeaders = document.querySelectorAll('.cb-tabs-header');

    tabHeaders.forEach(header => {
        const container = header.closest('.cb-tabs-container');
        const buttons = header.querySelectorAll('.cb-tab-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                const contents = container.querySelectorAll('.cb-tab-content');

                // Remove active class from buttons in THIS header
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Remove active class from contents in THIS container
                contents.forEach(content => content.classList.remove('active'));

                // Add active class to current button and content
                button.classList.add('active');
                const targetTab = document.getElementById(tabId);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            });
        });
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
