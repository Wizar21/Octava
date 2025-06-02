


document.addEventListener('DOMContentLoaded', () => {
    const reviews = document.querySelectorAll('.review-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let intervalId;

    function showReview(index) {
      reviews.forEach((review, i) => {
        review.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
        dot.tabIndex = i === index ? 0 : -1;
      });
      currentIndex = index;
    }

    function nextReview() {
      const nextIndex = (currentIndex + 1) % reviews.length;
      showReview(nextIndex);
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(intervalId);
        const index = parseInt(dot.dataset.index, 10);
        showReview(index);
        startAutoSwitch();
      });
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dot.click();
        }
      });
    });

    function startAutoSwitch() {
      intervalId = setInterval(nextReview, 5000);
    }

    // Инициализация
    showReview(0);
    startAutoSwitch();
  });