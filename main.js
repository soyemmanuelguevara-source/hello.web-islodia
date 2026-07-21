/* =====================================================
   ILSOLDIA — LABORATORIO CLÍNICO
   Interacciones: preloader, scroll reveal, contadores,
   partículas, parallax, typewriter, FAQ, formulario WhatsApp.
   ===================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------
     PRELOADER
     --------------------------------------------------- */
  function initLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;

    document.body.classList.add('no-scroll');

    // Partículas flotantes dentro del loader
    var particlesWrap = document.getElementById('loader-particles');
    if (particlesWrap) {
      for (var i = 0; i < 26; i++) {
        var p = document.createElement('span');
        var size = 2 + Math.random() * 4;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
        p.style.animationDuration = (4 + Math.random() * 5) + 's';
        p.style.animationDelay = (Math.random() * 4) + 's';
        particlesWrap.appendChild(p);
      }
    }

    var fill = loader.querySelector('.loader-progress-fill');
    var label = loader.querySelector('.loader-progress-label');
    var messages = ['Extrayendo precisión...', 'Centrifugando resultados...', 'Casi listo...'];
    var progress = 0;
    var minDisplayTime = prefersReducedMotion ? 400 : 2900;
    var startTime = Date.now();
    var windowLoaded = false;

    window.addEventListener('load', function () { windowLoaded = true; });

    var progressTimer = setInterval(function () {
      var target = windowLoaded ? 100 : 88;
      progress += (target - progress) * 0.12 + 0.4;
      if (progress > 100) progress = 100;
      if (fill) fill.style.width = progress + '%';
      if (label) label.textContent = messages[Math.min(messages.length - 1, Math.floor(progress / 34))];

      var elapsed = Date.now() - startTime;
      if (progress >= 99.4 && windowLoaded && elapsed >= minDisplayTime) {
        clearInterval(progressTimer);
        exitLoader(loader);
      }
    }, 60);

    // Failsafe: never trap the user on the loader
    setTimeout(function () {
      clearInterval(progressTimer);
      exitLoader(loader);
    }, 7000);
  }

  function exitLoader(loader) {
    if (loader.classList.contains('is-exiting')) return;
    loader.classList.add('is-exiting');
    document.body.classList.add('page-revealed');
    setTimeout(function () {
      document.body.classList.remove('no-scroll');
      loader.classList.add('is-hidden');
    }, 1600);
  }

  /* ---------------------------------------------------
     NAVBAR
     --------------------------------------------------- */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 40) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        var isActive = mobileMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        hamburger.innerHTML = isActive ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
        document.body.classList.toggle('no-scroll', isActive);
      });
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileMenu.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.innerHTML = '<i class="fas fa-bars"></i>';
          document.body.classList.remove('no-scroll');
        });
      });
    }
  }

  /* ---------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------
     CONTADORES ANIMADOS
     --------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll('.stat-num span[data-target]');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1800;
      var startTime = null;

      function step(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.floor(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------
     TYPEWRITER — HERO
     --------------------------------------------------- */
  function initTypewriter() {
    var el = document.getElementById('typewriter-text');
    if (!el) return;
    if (prefersReducedMotion) { el.textContent = 'Dermatología, Ortopedia y Estética'; return; }

    var words = ['Dermatología', 'Ortopedia', 'Medicina Estética', 'Regeneración Capilar'];
    var wordIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      var current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
        setTimeout(tick, 65 + Math.random() * 40);
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 32);
      }
    }
    setTimeout(tick, 1900);
  }

  /* ---------------------------------------------------
     RIPPLE EN BOTONES
     --------------------------------------------------- */
  function initRipple() {
    document.querySelectorAll('[data-ripple]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var rect = btn.getBoundingClientRect();
        var ripple = document.createElement('span');
        var size = Math.max(rect.width, rect.height) * 1.2;
        ripple.className = 'ripple-el';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 700);
      });
    });
  }

  /* ---------------------------------------------------
     FAQ ACORDEÓN
     --------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var btn = item.querySelector('.faq-btn');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isActive = item.classList.contains('active');
        items.forEach(function (i) { i.classList.remove('active'); });
        if (!isActive) item.classList.add('active');
      });
    });
  }

  /* ---------------------------------------------------
     FORMULARIO DE CONTACTO -> WHATSAPP
     --------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#cf-name').value.trim();
      var phone = form.querySelector('#cf-phone').value.trim();
      var message = form.querySelector('#cf-message').value.trim();

      var text = 'Hola, soy ' + name + '.';
      if (message) text += ' Me gustaría información sobre: ' + message + '.';
      if (phone) text += ' Mi teléfono de contacto es ' + phone + '.';

      var url = 'https://wa.me/5215566959724?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  }

  /* ---------------------------------------------------
     PARALLAX EN IMÁGENES DE FONDO (efecto fixed)
     --------------------------------------------------- */
  function initParallax() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    if (!elements.length || prefersReducedMotion) return;

    var items = elements.map(function (el) {
      return { el: el, img: el.querySelector('img'), speed: parseFloat(el.getAttribute('data-parallax-speed')) || 0.2 };
    }).filter(function (i) { return i.img; });

    var ticking = false;

    function update() {
      var vh = window.innerHeight;
      items.forEach(function (item) {
        var rect = item.el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        var center = rect.top + rect.height / 2 - vh / 2;
        var offset = center * item.speed * -1;
        item.img.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0) scale(1.1)';
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ---------------------------------------------------
     PARTÍCULAS EN CANVAS (hero, stats, cta)
     --------------------------------------------------- */
  function ParticleField(canvas, opts) {
    if (!canvas || prefersReducedMotion) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var count = opts.count || 44;
    var color = opts.color || '155,124,174';
    var maxSize = opts.size || 2.4;
    var speed = opts.speed || 0.25;
    var linkDist = opts.link || 0;
    var w, h, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed - 0.06,
        r: 0.6 + Math.random() * maxSize,
        a: 0.25 + Math.random() * 0.5
      };
    }

    function init() {
      resize();
      particles = [];
      for (var i = 0; i < count; i++) particles.push(makeParticle());
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + color + ',' + p.a + ')';
        ctx.fill();
      }
      if (linkDist) {
        for (var a = 0; a < particles.length; a++) {
          for (var b = a + 1; b < particles.length; b++) {
            var dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < linkDist) {
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.strokeStyle = 'rgba(' + color + ',' + (0.12 * (1 - dist / linkDist)) + ')';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
      requestAnimationFrame(step);
    }

    init();
    requestAnimationFrame(step);
    window.addEventListener('resize', init);
  }

  function initParticles() {
    ParticleField(document.getElementById('hero-canvas'), { count: 50, color: '237,225,245', size: 2, speed: 0.22, link: 120 });
    ParticleField(document.getElementById('stats-canvas'), { count: 32, color: '155,124,174', size: 1.8, speed: 0.15, link: 0 });
    ParticleField(document.getElementById('cta-canvas'), { count: 32, color: '155,124,174', size: 1.8, speed: 0.15, link: 0 });
  }

  /* ---------------------------------------------------
     INIT
     --------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initNavbar();
    initReveal();
    initCounters();
    initTypewriter();
    initRipple();
    initFaq();
    initContactForm();
    initParallax();
    initParticles();
  });
})();
