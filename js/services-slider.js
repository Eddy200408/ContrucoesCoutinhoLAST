document.addEventListener('DOMContentLoaded', () => {
  const MOBILE_BREAKPOINT = 700;

  // Initialize a carousel element (contains .service-item slides)
  function initCarousel(carousel, host) {
    if (!carousel) return null;
    const slides = Array.from(carousel.querySelectorAll('.service-item'));
    if (!slides.length) return null;

    carousel.classList.add('slider-active');

    // create dots container next to host (host is .service-category)
    let dots = host.querySelector('.service-dots');
    if (!dots) {
      dots = document.createElement('div');
      dots.className = 'service-dots';
      host.appendChild(dots);
    }
    dots.innerHTML = '';

    slides.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => {
        goTo(i);
        restartAuto();
      });
      dots.appendChild(btn);
    });

    let index = 0;
    let autoTimer = null;

    function slideWidth() {
      return Math.round(slides[0].getBoundingClientRect().width);
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      carousel.scrollTo({ left: Math.round(index * slideWidth()), behavior: 'smooth' });
      updateDots();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function updateDots() {
      const btns = dots.querySelectorAll('button');
      btns.forEach((b, idx) => b.classList.toggle('active', idx === index));
    }

    function startAuto() { stopAuto(); autoTimer = setInterval(next, 3000); }
    function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    function restartAuto() { stopAuto(); startAuto(); }

    // Pause on interactions
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('touchstart', stopAuto, {passive:true});
    carousel.addEventListener('touchend', startAuto, {passive:true});

    // Swipe
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, {passive:true});
    carousel.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next(); else prev();
        restartAuto();
      }
    }, {passive:true});

    window.addEventListener('resize', () => { goTo(index); });

    goTo(0);
    startAuto();

    return { destroy() { stopAuto(); carousel.classList.remove('slider-active'); if (dots) dots.remove(); } };
  }

  let instances = [];

  function setup() {
    // destroy previous
    instances.forEach(i => i && i.destroy && i.destroy());
    instances = [];

    const grids = Array.from(document.querySelectorAll('.service-grid'));
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      grids.forEach(g => {
        const items = Array.from(g.querySelectorAll('.service-item'));
        if (items.length <= 0) return;

        // if already transformed, just init carousel
        if (g.querySelector('.service-carousel')) {
          const existing = g.querySelector('.service-carousel');
          const inst = initCarousel(existing, g.closest('.service-category'));
          if (inst) instances.push(inst);
          return;
        }

        // create carousel container and move ALL items into it
        const carousel = document.createElement('div');
        carousel.className = 'service-carousel';
        items.forEach(r => carousel.appendChild(r));

        // append carousel into grid
        g.appendChild(carousel);

        const inst = initCarousel(carousel, g.closest('.service-category'));
        if (inst) instances.push(inst);
      });
    } else {
      // restore desktop layout
      grids.forEach(g => {
        g.classList.remove('slider-active');
        const carousel = g.querySelector('.service-carousel');
        if (carousel) {
          const items = Array.from(carousel.querySelectorAll('.service-item'));
          items.forEach(i => g.appendChild(i));
          carousel.remove();
          const dots = g.closest('.service-category').querySelector('.service-dots');
          if (dots) dots.remove();
        }
      });
    }
  }

  setup();
  window.addEventListener('resize', () => { setup(); });
});
