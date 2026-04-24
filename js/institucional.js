document.addEventListener('DOMContentLoaded', () => {
    // Dropdown (Especialidades)
    const toggles = document.querySelectorAll('.nav-desplegable__toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('activo');
        });
    });

    /* ==========================================================================
       2. PREMIUM GALLERY SLIDER (NATIVO Y ROBUSTO)
       ========================================================================== */
    const slider = document.getElementById('inst-gallery-slider');
    const prevBtn = document.getElementById('inst-gallery-prev');
    const nextBtn = document.getElementById('inst-gallery-next');
    
    if (slider && prevBtn && nextBtn) {
        let isScrolling = false;

        const showNext = () => {
            if (isScrolling) return;
            isScrolling = true;

            const maxScroll = slider.scrollWidth - slider.clientWidth;
            if (slider.scrollLeft >= maxScroll - 10) {
                slider.scrollTo({ left: 0 });
            } else {
                slider.scrollBy({ left: slider.clientWidth });
            }

            setTimeout(() => { isScrolling = false; }, 600);
        };

        const showPrev = () => {
            if (isScrolling) return;
            isScrolling = true;

            if (slider.scrollLeft <= 10) {
                slider.scrollTo({ left: slider.scrollWidth });
            } else {
                slider.scrollBy({ left: -slider.clientWidth });
            }

            setTimeout(() => { isScrolling = false; }, 600);
        };

        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Auto-rotation every 6 seconds
        let autoPlay = setInterval(showNext, 6000);

        // Pause on hover
        const wrapper = document.querySelector('.inst-gallery-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
            wrapper.addEventListener('mouseleave', () => {
                autoPlay = setInterval(showNext, 6000);
            });
        }
        
        // El navegador maneja el resize automáticamente con scroll nativo
    }
});
