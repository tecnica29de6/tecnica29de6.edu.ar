document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.cb-tab-btn');
    const tabContents = document.querySelectorAll('.cb-tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to current button and content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
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

    // Mobile menu toggle
    const hamburger = document.getElementById('menu-hamburger');
    const nav = document.getElementById('navegacion');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('activo');
        });
    }
});
