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

        function updateSlider() {
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });

        // Auto-rotation every 6 seconds
        let autoPlay = setInterval(() => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 6000);

        // Pause on hover
        const wrapper = document.querySelector('.inst-gallery-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
            wrapper.addEventListener('mouseleave', () => {
                autoPlay = setInterval(() => {
                    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
                    updateSlider();
                }, 6000);
            });
        }
    }
});
