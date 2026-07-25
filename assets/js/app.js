/* ============================================================
   BE UP RESIDENCIAL — LP Scripts
   - Carrossel automático
   - Simulador de parcela
   - FAQ accordion
   - IntersectionObserver reveal
   - Contador regressivo de unidades
   - Header scroll state
   - WhatsApp com mensagem pronta
   ============================================================ */

// ============== WHATSAPP HELPER ==============
const WHATS_NUMBER = '5522997944778';
function whatsUrl(message) {
  return 'https://wa.me/' + WHATS_NUMBER + '?text=' + encodeURIComponent(message);
}
const DEFAULT_MSG = 'Olá Cleber! Vim pelo site do Be Up Residencial e quero saber mais sobre as últimas 76 unidades. Pode me passar as condições?';

document.querySelectorAll('[data-whats]').forEach(el => {
  const msg = el.dataset.whats || DEFAULT_MSG;
  el.href = whatsUrl(msg);
  el.target = '_blank';
  el.rel = 'noopener noreferrer';
});

// ============== HEADER SCROLL ==============
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });
}

// ============== REVEAL ON SCROLL ==============
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ============== CARROSSEL ==============
const carousel = document.querySelector('.carousel');
if (carousel) {
  const section = carousel.closest('section');
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = section.querySelectorAll('.carousel-dot');
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  let current = 0;
  const total = slides.length;
  let autoplayTimer = null;

  function go(idx) {
    current = (idx + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach((d, i) => {
      const isActive = i === current;
      d.classList.toggle('active', isActive);
      d.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }
  function autoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => go(current + 1), 5500);
  }
  function reset() { autoplay(); }

  dots.forEach((d, i) => d.addEventListener('click', () => { go(i); reset(); }));
  if (prev) prev.addEventListener('click', () => { go(current - 1); reset(); });
  if (next) next.addEventListener('click', () => { go(current + 1); reset(); });

  // Pausa ao hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  carousel.addEventListener('mouseleave', autoplay);

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) go(current + 1); else go(current - 1);
      reset();
    }
  }, { passive: true });

  go(0);
  autoplay();
}

// ============== CARROSSEL DE LOTES ==============
const lotesCarousel = document.querySelector('.lotes-carousel');
if (lotesCarousel) {
  const track = lotesCarousel.querySelector('.lotes-track');
  const slides = lotesCarousel.querySelectorAll('.lotes-slide');
  const dots = document.querySelectorAll('.lotes-dot');
  const prev = document.querySelector('.lotes-prev');
  const next = document.querySelector('.lotes-next');
  let current = 0;
  const total = slides.length;

  function go(idx) {
    current = (idx + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dots.forEach((d, i) => {
      const isActive = i === current;
      d.classList.toggle('active', isActive);
      d.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  if (prev) prev.addEventListener('click', () => go(current - 1));
  if (next) next.addEventListener('click', () => go(current + 1));

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;
  lotesCarousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lotesCarousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) go(current + 1); else go(current - 1);
    }
  }, { passive: true });

  // Autoplay leve (só roda quando visível na tela)
  let inView = true;
  const obs = new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
  }, { threshold: 0.3 });
  obs.observe(lotesCarousel);

  setInterval(() => {
    if (inView && document.hasFocus()) go(current + 1);
  }, 7000);

  go(0);
}

// ============== FAQ ==============
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // fecha todos
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ============== SIMULADOR DE PARCELA ==============
const simForm = document.querySelector('#simulador-form');
const simResult = document.querySelector('#simulador-result');
const simParcela = document.querySelector('#sim-parcela');
const simInfo = document.querySelector('#sim-info');
const simCta = document.querySelector('#sim-cta');

if (simForm) {
  const planoSelect = simForm.querySelector('#plano');
  const VALOR_BASE = 62999.79;

  // Parcelas fixas por plano (valores oficiais do material)
  const PARCELAS = {
    '240': 525.00,   // a partir de R$ 525 em 240x
    '72': 788.00     // sem juros, R$ 788 em 72x
  };

  function fmt(v) {
    return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calcularSimulacao() {
    const plano = planoSelect.value;
    const parcela = PARCELAS[plano] || 525;
    const labelPlano = plano === '72' ? '72x sem juros' : '240x';

    simParcela.textContent = 'R$ ' + fmt(parcela);
    simInfo.textContent = 'Lote a partir de R$ ' + fmt(VALOR_BASE) + ' · ' + labelPlano + ' · simulação ilustrativa';

    const msg = 'Olá Cleber! Fiz uma simulação no site do Be Up Residencial:\n'
      + '• Plano: ' + labelPlano + '\n'
      + '• Parcela: R$ ' + fmt(parcela) + '/mês\n'
      + '• Lote a partir de: R$ ' + fmt(VALOR_BASE) + '\n\n'
      + 'Pode me passar as condições oficiais (entrada, documentação, etc.)?';
    simCta.href = whatsUrl(msg);
    simCta.target = '_blank';
    simCta.rel = 'noopener noreferrer';

    simResult.style.display = 'block';
  }

  planoSelect.addEventListener('change', calcularSimulacao);
  calcularSimulacao();
}

// ============== CONTADOR REGRESSIVO DIÁRIO ==============
const counter = document.querySelector('#contador-unidades');
if (counter) {
  // Simula 76 unidades como "últimas" — alvo mostra um número realista
  // (em produção esse número viria de uma API; aqui só animamos a contagem)
  const target = 76;
  let shown = 0;
  const step = Math.max(1, Math.floor(target / 60));
  const dur = 1800;
  const interval = dur / (target / step);
  const t = setInterval(() => {
    shown += step;
    if (shown >= target) {
      shown = target;
      clearInterval(t);
    }
    counter.textContent = shown;
  }, interval);
}

// ============== NEWSLETTER / EVENTO DEMO ==============
console.log('%cBE UP Residencial — Site feito com ☀', 'background:#0E5C3A;color:#FFC928;padding:8px 16px;font-family:Inter;font-weight:700;border-radius:6px;');
