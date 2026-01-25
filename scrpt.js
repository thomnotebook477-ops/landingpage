document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     NAVBAR SCROLL
  ========================= */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled', 'shadow-lg');
    } else {
      navbar.classList.remove('scrolled', 'shadow-lg');
    }
  });

  /* =========================
     FECHAR MENU MOBILE
  ========================= */
  const offcanvasElement = document.getElementById('offcanvasNavbar');

  if (offcanvasElement) {
    const navLinks = document.querySelectorAll(
      '.offcanvas-body .nav-link, .offcanvas-body .btn'
    );

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) bsOffcanvas.hide();
      });
    });
  }

  /* =========================
     MODAL DINÂMICO
  ========================= */
  const dynamicModal = document.getElementById('dynamicModal');

  if (dynamicModal) {
    dynamicModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const type = button.getAttribute('data-type');

      const modalTitle = dynamicModal.querySelector('.modal-title');
      const modalDesc = document.getElementById('modalDesc');
      const modalDuration = document.getElementById('modalDuration');

      const contentData = {
        emagrecimento: {
          title: 'Desafio Emagrecimento 30D',
          desc: 'Um protocolo intensivo com foco total em queima de gordura e otimização metabólica.',
          duration: '30 Dias'
        },
        premium: {
          title: 'Consultoria Premium Trimestral',
          desc: 'Acompanhamento completo com ajustes quinzenais e suporte personalizado.',
          duration: '3 Meses'
        },
        saude: {
          title: 'Programa Reeducação & Saúde',
          desc: 'Criação de rotina saudável com foco em longevidade e bem-estar.',
          duration: '6 Meses'
        }
      };

      if (contentData[type]) {
        modalTitle.textContent = contentData[type].title;
        modalDesc.textContent = contentData[type].desc;
        modalDuration.textContent = contentData[type].duration;
      }
    });
  }

  /* =========================
     FORMULÁRIO FAKE SUBMIT
  ========================= */
  const contactForm = document.getElementById('contactForm');
  const successOverlay = document.getElementById('formSuccess');

  if (contactForm && successOverlay) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalContent = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Enviando...';

      setTimeout(() => {
        successOverlay.classList.remove('d-none');
        contactForm.reset();
        btn.innerHTML = originalContent;
        btn.disabled = false;

        setTimeout(() => {
          successOverlay.classList.add('d-none');
        }, 2500);
      }, 1500);
    });
  }

  /* =========================
     ANO AUTOMÁTICO
  ========================= */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* =========================
     ANIMAÇÃO POR SCROLL
  ========================= */
  const animatedItems = document.querySelectorAll('.animate-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  animatedItems.forEach(el => observer.observe(el));
});

/* =========================
   PARALLAX HERO
========================= */
const heroBg = document.querySelector('.hero-bg-image');

if (heroBg) {
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    heroBg.style.transform = `scale(1.15) translateY(${scroll * 0.12}px)`;
  });
}
