document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Subject Cards (.cb-card)
    const cards = document.querySelectorAll('.cb-card:not(.cb-card--hours-display)');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent click propagation if nested (though currently not nested)
            e.stopPropagation();
            
            const isActive = card.classList.contains('active');

            // Optional: Close other cards in the same grid
            const parentGrid = card.closest('.cb-curriculum-grid');
            if (parentGrid) {
                parentGrid.querySelectorAll('.cb-card').forEach(c => {
                    if (c !== card) c.classList.remove('active');
                });
            }

            card.classList.toggle('active');
        });
    });

    // 2. Handle Year-level Accordions (.accordion-item)
    // Used in specialty pages (compu.html, etc.)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Close other years
            document.querySelectorAll('.accordion-item').forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                    const c = i.querySelector('.accordion-content');
                    if (c) c.style.display = 'none';
                }
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                if (content) content.style.display = 'block';
            } else {
                item.classList.remove('active');
                if (content) content.style.display = 'none';
            }
        });
    });
});
