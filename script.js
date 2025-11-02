 const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  let currentIndex = 0;
  const intervalTime = 2000;
  let carouselInterval;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
  }

  document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, intervalTime);
  }

  // Iniciar el carrusel automático
  carouselInterval = setInterval(nextSlide, intervalTime);

// --- APARICION SUAVIZADA DE SECCIONES (IntersectionObserver) ---
(function(){
  if (!('IntersectionObserver' in window)){
    // fallback: mostrar todo
    document.querySelectorAll('section').forEach(s => s.classList.add('in-view'));
    document.querySelectorAll('.card-inner, .project-inner').forEach(el => el.classList.add('in-view'));
    return;
  }

  const sectionObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        section.classList.add('in-view');

        // animar internamente las tarjetas con un ligero stagger
        const innerCards = section.querySelectorAll('.card-inner, .project-card');
        innerCards.forEach((el, i) => {
          // agregar delay escalonada
          const delay = i * 80; // ms
          el.style.transitionDelay = delay + 'ms';
          // si es project-card, activamos clase para mostrar su .project-inner
          if (el.classList.contains('project-card')){
            // activar clase in-view en la tarjeta para que su .project-inner se muestre
            el.classList.add('in-view');
          } else {
            el.classList.add('in-view');
          }
        });

        obs.unobserve(section);
      }
    });
  },{ threshold: 0.15 });

  document.querySelectorAll('section').forEach(s => sectionObserver.observe(s));
})();