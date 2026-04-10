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

    // Premium Gallery Slider
    const slider = document.getElementById('inst-gallery-slider');
    const prevBtn = document.getElementById('inst-gallery-prev');
    const nextBtn = document.getElementById('inst-gallery-next');
    
    if (slider && prevBtn && nextBtn) {
        const items = slider.querySelectorAll('.inst-gallery-item');
        let currentIndex = 0;

        const obtenerItemsPorVista = () => {
            if (window.innerWidth > 1024) return 3;
            if (window.innerWidth > 768) return 2;
            return 1;
        };

        const updateSlider = () => {
            const itemsPorVista = obtenerItemsPorVista();
            const anchoItem = 100 / itemsPorVista;
            const offset = -currentIndex * anchoItem;
            slider.style.transform = `translateX(${offset}%)`;
        };

        const showNext = () => {
            const itemsPorVista = obtenerItemsPorVista();
            if (currentIndex + itemsPorVista >= items.length) {
                currentIndex = 0;
            } else {
                currentIndex += itemsPorVista;
            }
            updateSlider();
        };

        const showPrev = () => {
            const itemsPorVista = obtenerItemsPorVista();
            if (currentIndex - itemsPorVista < 0) {
                currentIndex = Math.max(0, items.length - itemsPorVista);
            } else {
                currentIndex -= itemsPorVista;
            }
            updateSlider();
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
        
        // Update on resize
        window.addEventListener('resize', updateSlider);
    }
});
