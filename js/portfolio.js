// Projects data com detalhes e imagens
const projectsData = {
  'p1': {
    title: 'Casa Silva',
    category: 'Residencial',
    location: 'Mindelo',
    year: 2024,
    description: 'Reforma completa da casa Silva com modernização completa, pintura, acabamentos e novas instalações.',
    challenge: 'Adaptar-se ao layout existente mantendo a estrutura original',
    solution: 'Projeto modular com fases de execução sem comprometer a segurança',
    before: 'img/Galeria/1.jpg',
    after: 'img/Galeria/4.jpg'
  },
  'p2': {
    title: 'Loja Centro',
    category: 'Comercial',
    location: 'Centro da Cidade',
    year: 2023,
    description: 'Renovação comercial completa com novo layout, iluminação e acabamentos premium.',
    challenge: 'Manter operações durante a reforma',
    solution: 'Execução em fases noturnas e finais de semana',
    before: 'img/Galeria/2.jpg',
    after: 'img/Galeria/5.jpg'
  },
  'p3': {
    title: 'Apart. Costa',
    category: 'Residencial',
    location: 'Bairro Costa',
    year: 2022,
    description: 'Reforma parcial focada em cozinha e banheiro com modernização de instalações.',
    challenge: 'Espaço limitado para armazenamento de materiais',
    solution: 'Planejamento otimizado com entregas just-in-time',
    before: 'img/Galeria/3.jpg',
    after: 'img/Galeria/6.jpg'
  }
};

// Inicializa eventos na página
document.addEventListener('DOMContentLoaded', function(){
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  // Filtros na página de projetos
  function applyFilter(filter){
    cards.forEach(card => {
      const cat = card.getAttribute('data-category');
      if(filter === 'all' || cat === filter){
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    })
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      applyFilter(f);
    })
  })

  // Botões 'Ver detalhes' na página de projetos — abre modal
  document.querySelectorAll('.project-card .btn').forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      const id = b.getAttribute('data-id');
      openProjectModal(id);
    })
  })

  // Cards da home — abrem modal ao clicar
  document.querySelectorAll('.project-card-home').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openProjectModal(id);
    })
  })
});

// Função para abrir modal com antes/depois
function openProjectModal(projectId){
  const project = projectsData[projectId];
  if(!project) return;

  const modal = document.getElementById('projectModal') || createProjectModal();
  
  // Preenche conteúdo
  const header = modal.querySelector('.modal-header');
  const body = modal.querySelector('.modal-body');
  
  header.innerHTML = `<h2>${project.title}</h2><span class="modal-project-close" onclick="closeProjectModal()">✕</span>`;
  
  body.innerHTML = `
    <div class="before-after" id="beforeAfter">
      <img src="${project.before}" alt="Antes - ${project.title}">
      <div class="before-after-slider" id="beforeAfterSlider">
        <img src="${project.after}" alt="Depois - ${project.title}">
      </div>
      <div class="before-after-handle"></div>
    </div>
    <div class="project-details">
      <p><strong>Categoria:</strong> ${project.category} | <strong>Local:</strong> ${project.location} | <strong>Ano:</strong> ${project.year}</p>
      <h3>Descrição</h3>
      <p>${project.description}</p>
      <h3>Desafio</h3>
      <p>${project.challenge}</p>
      <h3>Solução</h3>
      <p>${project.solution}</p>
      <div style="margin-top:20px; text-align:center;">
        <a href="contact.html" class="btn-primary">Solicitar Orçamento</a>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
  setupBeforeAfterSlider();
}

// Cria modal dinamicamente se não existir
function createProjectModal(){
  const modal = document.createElement('div');
  modal.id = 'projectModal';
  modal.className = 'modal-project';
  modal.innerHTML = `
    <div class="modal-project-content">
      <div class="modal-header"></div>
      <div class="modal-body"></div>
    </div>
  `;
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeProjectModal();
  });
  document.body.appendChild(modal);
  return modal;
}

// Fecha modal
function closeProjectModal(){
  const modal = document.getElementById('projectModal');
  if(modal) modal.classList.remove('active');
}

// Setup antes/depois slider com mouse/touch
function setupBeforeAfterSlider(){
  const container = document.getElementById('beforeAfter');
  const slider = document.getElementById('beforeAfterSlider');
  if(!container || !slider) return;

  function updateSlider(e){
    const rect = container.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if(percentage < 0) percentage = 0;
    if(percentage > 100) percentage = 100;
    slider.style.width = percentage + '%';
  }

  let isActive = false;
  slider.addEventListener('mousedown', () => { isActive = true; });
  slider.addEventListener('touchstart', () => { isActive = true; });
  document.addEventListener('mouseup', () => { isActive = false; });
  document.addEventListener('touchend', () => { isActive = false; });
  document.addEventListener('mousemove', (e) => { if(isActive) updateSlider(e); });
  document.addEventListener('touchmove', (e) => { if(isActive) updateSlider(e); });
}

// Rotacionador simples para a thumbnail do portfólio (home)
document.addEventListener('DOMContentLoaded', function(){
  const thumb = document.getElementById('portfolio-thumb');
  if(!thumb) return;

  const images = [
    'img/Elaboracao de Projetos/1.jpg',
    'img/Elaboracao de Projetos/2.jpg',
    'img/Elaboracao de Projetos/3.jpg',
    'img/CC/1.png',
    'img/Blocos/1.jpg'
  ];
  let idx = 0;
  thumb.style.opacity = 1;
  thumb.style.transition = 'opacity .5s ease';

  setInterval(() => {
    idx = (idx + 1) % images.length;
    thumb.style.opacity = 0;
    setTimeout(() => {
      thumb.src = images[idx];
      thumb.style.opacity = 1;
    }, 450);
  }, 3000);
});
