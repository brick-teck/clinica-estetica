/* JavaScript puro. Scripts clássicos permitem abrir index.html diretamente. */
(() => {
  const data = window.clinicData;
  const { utils, components, home } = window.Lumiere;
  const { filterItems, whatsappURL, safeURL } = utils;
  const { header, footer, dialogs, treatmentCard } = components;
  const focusOrigins = new WeakMap();
  let galleryIndex = 0;

  for (const [key, value] of Object.entries(data.colors)) {
    if (/^#[\da-f]{6}$/i.test(value)) document.documentElement.style.setProperty(`--${key}`, value);
  }
  document.title = `${data.name} · Sua beleza merece um cuidado especial`;
  document.getElementById('site-header').innerHTML = header();
  document.getElementById('conteudo').innerHTML = home();
  document.getElementById('site-footer').innerHTML = footer();
  document.getElementById('site-dialogs').innerHTML = dialogs();
  document.querySelector('meta[name="theme-color"]').content = data.colors.canvas;
  document.querySelector('meta[property="og:title"]').content = document.title;
  const canonical = safeURL(data.siteUrl);
  if (canonical) {
    document.querySelector('link[rel="canonical"]').href = canonical;
    document.querySelector('meta[property="og:url"]').content = canonical;
  }

  function openDialog(dialog, origin = document.activeElement) {
    focusOrigins.set(dialog, origin);
    dialog.showModal();
    dialog.querySelector('[data-close]')?.focus({ preventScroll: true });
  }
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target.closest('[data-close]')) dialog.close();
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      const origin = focusOrigins.get(dialog);
      if (!document.querySelector('dialog[open]') && origin?.isConnected && origin.getClientRects().length) origin.focus({ preventScroll: true });
    });
  });

  function book(trigger) {
    const professional = data.professionals.find(item => item.id === trigger.dataset.professional);
    const context = professional ? ` Tenho interesse em conversar sobre ${professional.role.toLowerCase()}.` : '';
    const link = whatsappURL(data.contact.whatsapp, data.contact.message + context);
    if (link) { window.open(link, '_blank', 'noopener,noreferrer'); return; }
    let origin = trigger.classList.contains('nav-book') ? document.querySelector('.menu-toggle') : trigger;
    const current = trigger.closest('dialog[open]');
    if (current) { origin = focusOrigins.get(current) || document.querySelector('.header-book'); current.close(); }
    document.getElementById('appointment-context').textContent = professional ? `Perfil demonstrativo selecionado: ${professional.name}.` : 'Explore os tratamentos e conheça a proposta de cuidado.';
    openDialog(document.getElementById('appointment-dialog'), origin);
  }
  function showTreatment(id, origin) {
    const item = data.treatments.find(item => item.id === id);
    if (!item) return;
    const image = document.getElementById('detail-image'); image.src = item.image; image.alt = item.alt;
    document.getElementById('detail-title').textContent = item.name;
    document.getElementById('detail-category').textContent = components.categoryName(item.category);
    document.getElementById('detail-description').textContent = item.detail;
    openDialog(document.getElementById('detail-dialog'), origin);
  }
  function galleryImage(index) {
    if (!data.gallery.length) return;
    galleryIndex = (index + data.gallery.length) % data.gallery.length;
    const item = data.gallery[galleryIndex];
    const image = document.getElementById('gallery-image'); image.src = item.image; image.alt = item.description;
    document.getElementById('gallery-caption').textContent = `${item.name} · ${item.description} · ${galleryIndex + 1}/${data.gallery.length}`;
  }
  const information = {
    location: ['Nos encontramos em breve.', 'Este modelo ainda não possui um endereço real. O mapa e as orientações de chegada ficam disponíveis quando a clínica confirma sua localização.'],
    instagram: ['Acompanhe os próximos encontros.', 'O perfil de Instagram ainda não está configurado nesta demonstração. Nenhuma rede social real está associada à marca fictícia.'],
    privacy: ['Privacidade nesta demonstração.', 'Este site não possui formulário, cadastro, cookies de análise ou envio de dados. O carregamento das fontes usa Google Fonts. Quando configurados, WhatsApp, Instagram e Google Maps são serviços externos, com suas próprias políticas de privacidade.']
  };
  document.addEventListener('click', event => {
    const target = event.target.closest('button'); if (!target) return;
    if (target.hasAttribute('data-book')) book(target);
    else if (target.hasAttribute('data-treatment')) showTreatment(target.dataset.treatment, target);
    else if (target.hasAttribute('data-gallery')) { galleryImage(Number(target.dataset.gallery)); openDialog(document.getElementById('gallery-dialog'), target); }
    else if (target.hasAttribute('data-gallery-prev')) galleryImage(galleryIndex - 1);
    else if (target.hasAttribute('data-gallery-next')) galleryImage(galleryIndex + 1);
    else if (target.hasAttribute('data-demo')) {
      const [title, description] = information[target.dataset.demo] || information.location;
      document.getElementById('info-title').textContent = title;
      document.getElementById('info-description').textContent = description;
      openDialog(document.getElementById('info-dialog'), target);
    } else if (target.hasAttribute('data-category')) {
      const items = filterItems(data.treatments, { category: target.dataset.category });
      document.querySelectorAll('[data-category]').forEach(button => {
        const active = button === target;
        button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
      });
      document.getElementById('treatment-results').innerHTML = items.length ? items.map(treatmentCard).join('') : '<p class="empty-state">Não há cuidados nesta categoria. Selecione Todos para explorar o catálogo.</p>';
      document.querySelector('.filter-status').textContent = `${items.length} ${items.length === 1 ? 'cuidado para explorar' : 'cuidados para explorar'}`;
    }
  });
  document.getElementById('gallery-dialog').addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); galleryImage(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1)); }
  });
  initNavigation();
  initReveal();

  function initNavigation() {
    const menu = document.querySelector('.menu-toggle'), nav = document.getElementById('main-nav'), header = document.querySelector('.site-header');
    const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); };
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', event => { if (event.target.closest('a, [data-book]')) closeMenu(); });
    document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
    header.addEventListener('focusout', event => { if (event.relatedTarget && !header.contains(event.relatedTarget)) closeMenu(); });
    matchMedia('(min-width: 1280px)').addEventListener('change', closeMenu);
    const scrollState = () => header.classList.toggle('is-scrolled', scrollY > 24);
    addEventListener('scroll', scrollState, { passive: true }); scrollState();
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
  }
  function initReveal() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('will-reveal'); observer.observe(element); });
  }
})();
