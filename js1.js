document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.nav.prev');
    const nextBtn = document.querySelector('.nav.next');
    const products = document.querySelectorAll('.product');
    const totalItems = products.length;
    let visibleCount = window.innerWidth < 600 ? 1 : 3;
    let currentIndex = 0;
    function updateVisibleCount() {
      visibleCount = window.innerWidth < 600 ? 1 : 3;
      if (currentIndex > totalItems - visibleCount) {
        currentIndex = Math.max(0, totalItems - visibleCount);
      }
    }
    function updateButtons() {
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= totalItems - visibleCount;
    }
    function updateSlider() {
      const style = getComputedStyle(products[0]);
      const width = products[0].offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap) || 20;
      const moveX = -(width + gap) * currentIndex;
      track.style.transform = `translateX(${moveX}px)`;
      updateButtons();
    }
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalItems - visibleCount) {
        currentIndex++;
        updateSlider();
      }
    });
    window.addEventListener('resize', () => {
      const oldVisibleCount = visibleCount;
      updateVisibleCount();
      if (oldVisibleCount !== visibleCount) {
        updateSlider();
      }
    });
    updateVisibleCount();
    updateSlider();
  });