/**
 * animations.js — Scroll-reveal & micro-animations  v2.0
 *
 * Uses IntersectionObserver to trigger CSS reveal animations on
 * elements with [data-reveal]. Supports stagger delays via
 * [data-stagger] on parent containers.
 *
 * v2: respects prefers-reduced-motion (instantly reveals all elements
 * and skips counter animation when OS motion-reduction is enabled).
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Motion preference ──────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll-Reveal Observer ──────────────────────────────────────────────── */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el    = entry.target;
        var delay = prefersReducedMotion ? 0 : parseInt(el.dataset.delay || '0', 10);

        if (delay === 0) {
          el.classList.add('revealed');
        } else {
          setTimeout(function () { el.classList.add('revealed'); }, delay);
        }

        revealObserver.unobserve(el);
      });
    },
    {
      threshold:   0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  /* Observe all elements that should animate in */
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (prefersReducedMotion) {
      /* Instantly reveal — no animation */
      el.classList.add('revealed');
    } else {
      revealObserver.observe(el);
    }
  });

  /* ── Staggered Children ──────────────────────────────────────────────────── */
  /*
   * [data-stagger="100"] on a parent applies increasing delay
   * to each direct child that has [data-reveal].
   * e.g. children delayed by 0ms, 100ms, 200ms …
   */
  document.querySelectorAll('[data-stagger]').forEach(function (container) {
    var step     = parseInt(container.dataset.stagger || '80', 10);
    var children = container.querySelectorAll('[data-reveal]');

    children.forEach(function (child, i) {
      if (!prefersReducedMotion) {
        child.dataset.delay = String(i * step);
        revealObserver.observe(child);
      }
    });
  });

});

