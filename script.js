/**
 * ============================================
 * Ajith Kumar M — Portfolio Interactions
 * Vanilla JS | No Dependencies
 * ============================================
 */

(function () {
  'use strict';

  // ---------- DOM Ready ----------
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initCounterAnimation();
    initActiveLinkTracking();
    initBackToTop();
    initContactForm();
    initTypingEffect();
  }

  // ---------- Navigation Scroll Effect ----------
  function initNavScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 50) {
            nav.classList.add('nav--scrolled');
          } else {
            nav.classList.remove('nav--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ---------- Mobile Menu ----------
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      const isOpen = links.classList.toggle('nav__links--open');
      toggle.classList.toggle('nav__mobile-toggle--active');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('.nav__link, .nav__cta').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('nav__links--open');
        toggle.classList.remove('nav__mobile-toggle--active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Smooth Scroll ----------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        var navHeight = document.getElementById('main-nav')
          ? document.getElementById('main-nav').offsetHeight
          : 72;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // ---------- Scroll Reveal ----------
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      reveals.forEach(function (el) {
        el.classList.add('reveal--visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---------- Counter Animation ----------
  function initCounterAnimation() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target, prefersReducedMotion);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(el, instant) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 2000;

    if (instant) {
      el.textContent = prefix + target + suffix;
      return;
    }

    var start = 0;
    var startTime = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(easeOutCubic(progress) * target);
      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  // ---------- Active Link Tracking ----------
  function initActiveLinkTracking() {
    var sections = document.querySelectorAll('.section[id]');
    var navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('nav__link--active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('nav__link--active');
              }
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-72px 0px -50% 0px'
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ---------- Back to Top ----------
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 600) {
            btn.classList.add('back-to-top--visible');
          } else {
            btn.classList.remove('back-to-top--visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Contact Form ----------
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#form-name').value.trim();
      var email = form.querySelector('#form-email').value.trim();
      var subject = form.querySelector('#form-subject').value.trim();
      var message = form.querySelector('#form-message').value.trim();

      if (!name || !email || !message) {
        showFormFeedback(form, 'Please fill in all required fields.', 'error');
        return;
      }

      // Construct mailto
      var mailtoSubject = encodeURIComponent(subject || 'Portfolio Inquiry from ' + name);
      var mailtoBody = encodeURIComponent(
        'Hi Ajith,\n\n' +
        message +
        '\n\n---\nFrom: ' + name + '\nEmail: ' + email
      );

      window.location.href = 'mailto:ajithkumaraec10@gmail.com?subject=' + mailtoSubject + '&body=' + mailtoBody;
      showFormFeedback(form, 'Opening your email client...', 'success');
      form.reset();
    });
  }

  function showFormFeedback(form, message, type) {
    // Remove existing
    var existing = form.querySelector('.form__feedback');
    if (existing) existing.remove();

    var feedback = document.createElement('div');
    feedback.className = 'form__feedback';
    feedback.style.cssText =
      'padding: 12px 16px; border-radius: 8px; font-size: 0.875rem; font-weight: 500; margin-top: 12px;' +
      (type === 'success'
        ? 'background: #eff6ff; color: #2563eb; border: 1px solid #dbeafe;'
        : 'background: #fef2f2; color: #e63946; border: 1px solid #fecaca;');
    feedback.textContent = message;
    form.appendChild(feedback);

    setTimeout(function () {
      if (feedback.parentNode) {
        feedback.style.opacity = '0';
        feedback.style.transition = 'opacity 300ms ease';
        setTimeout(function () {
          if (feedback.parentNode) feedback.remove();
        }, 300);
      }
    }, 4000);
  }

  // ---------- Typing Effect ----------
  function initTypingEffect() {
    var el = document.getElementById('typing-text');
    if (!el) return;

    var titles = [
      'Product Marketing & GTM Architect',
      'SEO-Led Growth Strategist',
      'Founder-Led Distribution Builder',
      'B2B SaaS Growth Engineer'
    ];

    var titleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var currentText = '';

    function type() {
      var current = titles[titleIndex];

      if (isDeleting) {
        currentText = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = current.substring(0, charIndex + 1);
        charIndex++;
      }

      el.textContent = currentText;

      var typeSpeed = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    // Start after a brief delay
    setTimeout(type, 1000);
  }
})();
