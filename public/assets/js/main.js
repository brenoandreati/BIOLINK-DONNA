/* Donna Cerimonial & Eventos — interações da página */
(() => {
  'use strict';

  /* Revelação suave dos blocos conforme entram na tela */
  const targets = document.querySelectorAll('[data-reveal], [data-reveal-group]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    targets.forEach((el) => observer.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('is-in'));
  }

  /* A faixa de cartões só recebe foco pelo teclado quando realmente rola */
  const track = document.querySelector('.moments');
  if (track) {
    const syncFocus = () => {
      if (track.scrollWidth > track.clientWidth + 1) track.setAttribute('tabindex', '0');
      else track.removeAttribute('tabindex');
    };
    syncFocus();
    window.addEventListener('resize', syncFocus, { passive: true });
  }

  /*
   * Medição de cliques (opcional).
   * Nada é enviado a terceiros a menos que o Google Analytics 4 (gtag),
   * o Google Tag Manager (dataLayer) ou o Meta Pixel (fbq) sejam instalados
   * no <head> do index.html.
   */
  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-track]');
    if (!link) return;

    const label = link.dataset.track;
    const isLead = label.startsWith('whatsapp');

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'donna_link_click', link_label: label, link_url: link.href });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', isLead ? 'generate_lead' : 'select_content', {
        link_label: label,
        link_url: link.href,
      });
    }
    if (typeof window.fbq === 'function') {
      if (isLead) window.fbq('track', 'Contact', { content_name: label });
      else window.fbq('trackCustom', 'LinkClick', { content_name: label });
    }
  });
})();
