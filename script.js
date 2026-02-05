document.addEventListener('DOMContentLoaded', () => {

  /* NAVBAR SCROLL */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled', 'shadow-lg');
    } else {
      navbar.classList.remove('scrolled', 'shadow-lg');
    }
  });

  /* FECHAR MENU MOBILE */
  const offcanvasElement = document.getElementById('offcanvasNavbar');
  if (offcanvasElement) {
    const navLinks = document.querySelectorAll('.offcanvas-body .nav-link, .offcanvas-body .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) bsOffcanvas.hide();
      });
    });
  }

  /* MODAL DINÂMICO (SERVIÇOS) */
  const dynamicModal = document.getElementById('dynamicModal');
  if (dynamicModal) {
    dynamicModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const type = button.getAttribute('data-type');

      const modalTitle = dynamicModal.querySelector('.modal-title');
      const modalDesc = document.getElementById('modalDesc');
      const modalPrice = document.getElementById('modalDuration'); // mantive o id

      const contentData = {
        corte: {
          title: 'Corte de Cabelo',
          desc: 'Corte clássico ou moderno, com acabamento limpo e personalizado pro seu estilo.',
          price: 'R$ 30,00'
        },
        corte_barba: {
          title: 'Corte + Barba',
          desc: 'Combo completo com corte e barba alinhada, finalização na régua.',
          price: 'R$ 40,00'
        },
        pe: {
          title: 'Pé de Cabelo',
          desc: 'Alinhamento e acabamento do pé pra manter o visual em dia.',
          price: 'R$ 15,00'
        },
        pigmentacao: {
          title: 'Pigmentação',
          desc: 'Realce e acabamento com pigmentação pra dar aquele toque final.',
          price: 'R$ 10,00'
        },
        sobrancelha: {
          title: 'Sobrancelha',
          desc: 'Design e limpeza pra finalizar o visual.',
          price: 'R$ 5,00'
        }
      };

      if (contentData[type]) {
        modalTitle.textContent = contentData[type].title;
        modalDesc.textContent = contentData[type].desc;
        modalPrice.textContent = contentData[type].price;
      }
    });
  }

  /* FORM -> WHATSAPP (placeholder)
     TROQUE AQUI quando tiver o número final:
     - só números, com DDI + DDD (Brasil = 55)
     Ex.: 5535999999999
  */
  const WHATSAPP_NUMBER = '0000000000000';

  const contactForm = document.getElementById('contactForm');
  const successOverlay = document.getElementById('formSuccess');

  if (contactForm && successOverlay) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = (document.getElementById('nome')?.value || '').trim();
      const tel = (document.getElementById('tel')?.value || '').trim();
      const interesse = (document.getElementById('interesse')?.value || '').trim();
      const msg = (document.getElementById('msg')?.value || '').trim();

      const interesseTextMap = {
        corte: 'Corte de cabelo',
        corte_barba: 'Corte + barba',
        pe: 'Pé de cabelo',
        pigmentacao: 'Pigmentação',
        sobrancelha: 'Sobrancelha'
      };

      const servico = interesseTextMap[interesse] || 'Serviço não informado';

      const texto =
        `Olá! Gostaria de agendar um horário na Lipp Barber.%0A%0A` +
        `Nome: ${nome || '-'}%0A` +
        `WhatsApp: ${tel || '-'}%0A` +
        `Serviço: ${servico}%0A` +
        (msg ? `Obs.: ${msg}%0A` : '');

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalContent = btn ? btn.innerHTML : '';

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Abrindo WhatsApp...';
      }

      window.open(url, '_blank', 'noopener,noreferrer');

      successOverlay.classList.remove('d-none');
      contactForm.reset();

      setTimeout(() => {
        successOverlay.classList.add('d-none');
        if (btn) {
          btn.innerHTML = originalContent;
          btn.disabled = false;
        }
      }, 2000);
    });
  }

  /* ANO AUTOMÁTICO */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ANIMAÇÃO POR SCROLL */
  const animatedItems = document.querySelectorAll('.animate-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  animatedItems.forEach(el => observer.observe(el));
});

/* PARALLAX HERO */
const heroBg = document.querySelector('.hero-bg-image');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    heroBg.style.transform = `scale(1.15) translateY(${scroll * 0.12}px)`;
  });
}
