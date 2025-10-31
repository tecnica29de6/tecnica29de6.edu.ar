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