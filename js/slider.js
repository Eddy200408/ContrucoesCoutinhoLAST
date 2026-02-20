document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let index = 0;
    let autoTimer = null;
    const INTERVAL = 4000; // 4 segundos

    function goTo(i){
        index = (i + slides.length) % slides.length;
        slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
        updateDots();
    }

    function nextSlide() { goTo(index + 1); }
    function prevSlide() { goTo(index - 1); }

    function startAuto(){
        stopAuto();
        autoTimer = setInterval(nextSlide, INTERVAL);
    }
    function stopAuto(){ if(autoTimer) clearInterval(autoTimer); autoTimer = null; }

    // criar dots
    function createDots(){
        if(!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slides.forEach((s,i)=>{
            const btn = document.createElement('button');
            btn.addEventListener('click', ()=>{ goTo(i); startAuto(); });
            if(i===0) btn.classList.add('active');
            dotsContainer.appendChild(btn);
        });
    }

    function updateDots(){
        if(!dotsContainer) return;
        Array.from(dotsContainer.children).forEach((b,idx)=>{
            b.classList.toggle('active', idx===index);
        });
    }

    // handlers
    if(nextBtn) nextBtn.addEventListener('click', ()=>{ nextSlide(); startAuto(); });
    if(prevBtn) prevBtn.addEventListener('click', ()=>{ prevSlide(); startAuto(); });

    // pausa ao passar o mouse
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // iniciar
    createDots();
    startAuto();

    // garantir ajuste caso a largura mude (resize)
    window.addEventListener('resize', ()=>{ goTo(index); });
    
    // acessibilidade: permitir setas do teclado
    document.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowRight') { nextSlide(); startAuto(); }
        if(e.key === 'ArrowLeft') { prevSlide(); startAuto(); }
    });
});
