/**
 * nav.js — Navigation behaviour  v2.0
 *
 * Features:
 *  - Glassmorphism navbar on scroll
 *  - Auto-hide on scroll-down / reveal on scroll-up
 *  - Mobile hamburger menu with backdrop overlay
 *  - Active link highlight based on current page (class + aria-current)
 *  - v2: Focus moves to first nav link when menu opens
 *  - v2: Escape key returns focus to hamburger button
 *  - v2: aria-current="page" attribute set on active link
 */

document.addEventListener('DOMContentLoaded', function () {
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  var overlay   = document.getElementById('navOverlay');

  if (!navbar) return;

  /* ── Scroll-aware navbar ─────────────────────────────────────────────────── */
  var lastScrollY = 0;
  var ticking     = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  function updateNavbar() {
    var currentY = window.scrollY;

    /* Add glassy backdrop once user has scrolled past 60px */
    navbar.classList.toggle('scrolled', currentY > 60);

    /* Hide when scrolling down past 120px; reveal on scroll-up */
    if (currentY > lastScrollY && currentY > 120) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentY;
    ticking     = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ─────────────────────────────────────────────────────────── */
  function openMenu() {
    hamburger && hamburger.classList.add('active');
    navLinks  && navLinks.classList.add('open');
    overlay   && overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    hamburger && hamburger.setAttribute('aria-expanded', 'true');

    /* Move focus to the first nav link for keyboard users */
    var firstLink = navLinks && navLinks.querySelector('.nav-link');
    if (firstLink) {
      setTimeout(function () { firstLink.focus(); }, 60);
    }
  }

  function closeMenu() {
    hamburger && hamburger.classList.remove('active');
    navLinks  && navLinks.classList.remove('open');
    overlay   && overlay.classList.remove('visible');
    document.body.style.overflow = '';
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger && hamburger.addEventListener('click', function () {
    if (navLinks && navLinks.classList.contains('open')) {
      closeMenu();
      /* Return focus to the hamburger button */
      hamburger.focus();
    } else {
      openMenu();
    }
  });

  /* Close when a nav link is tapped (mobile) */
  navLinks && navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on backdrop click */
  overlay && overlay.addEventListener('click', closeMenu);

  /* Close on Escape — return focus to hamburger */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      closeMenu();
      hamburger && hamburger.focus();
    }
  });

  /* ── Active link highlight ───────────────────────────────────────────────── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks && navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    var href   = link.getAttribute('href') || '';
    var isHome = (currentPage === '' || currentPage === '/') && href === 'index.html';

    if (href === currentPage || isHome) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');  /* Screen-reader active page signal */
    } else {
      link.removeAttribute('aria-current');
    }
  });

});
