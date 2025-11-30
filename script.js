document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const siteHeader = document.getElementById('siteHeader');
  const backTop = document.getElementById('backTop');
  const revealEls = document.querySelectorAll('.reveal');

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Header & back-to-top
  function onScroll() {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
      backTop.classList.add('show');
    } else {
      siteHeader.classList.remove('scrolled');
      backTop.classList.remove('show');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // Tabs
  document.querySelectorAll('.tab-links').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tab-links').forEach(b => b.classList.remove('active-link'));
      document.querySelectorAll('.tab-contents').forEach(c => c.classList.remove('active-tab'));
      this.classList.add('active-link');
      document.getElementById(this.getAttribute('data-target')).classList.add('active-tab');
    });
  });

  // Project modal
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLinks = document.getElementById('modalLinks');
  const modalClose = document.getElementById('modalClose');

  function openModal(data) {
    modalImg.src = data.img || '';
    modalImg.alt = data.title || 'Project';
    modalTitle.textContent = data.title || '';
    modalDesc.textContent = data.desc || '';
    modalLinks.innerHTML = '';
    try {
      const links = JSON.parse(data.links);
      for (const key in links) {
        if (links[key]) {
          const a = document.createElement('a');
          a.href = links[key];
          a.target = '_blank';
          a.rel = 'noopener';
          a.className = 'btn small';
          a.textContent = key.charAt(0).toUpperCase() + key.slice(1);
          modalLinks.appendChild(a);
        }
      }
    } catch {}
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalImg.src = '';
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal({
      title: card.dataset.title,
      desc: card.dataset.desc,
      img: card.dataset.img,
      links: card.dataset.links
    }));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(); });
});
