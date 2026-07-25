/**
 * home.js — Featured artworks on the homepage
 *
 * Fetches artworks.json and renders the three cards marked `featured: true`
 * into the #featuredGrid element. Automatically triggers scroll-reveal
 * animations via the [data-reveal] + IntersectionObserver system.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    fetch('./artworks.json')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (artworks) {
        const featured = artworks.filter(function (a) { return a.featured === true; });

        featured.forEach(function (artwork, index) {
          const card = buildFeaturedCard(artwork, index);
          grid.appendChild(card);
        });

        /* Trigger scroll-reveal on newly added cards */
        triggerReveal(grid.querySelectorAll('[data-reveal]'));
      })
      .catch(function (err) {
        console.error('[home] Failed to load featured works:', err);
        grid.innerHTML = '<p style="color:var(--color-text-3);text-align:center;padding:2rem">Could not load featured artworks.</p>';
      });
  });

  /* ── Build a featured card DOM node ─────────────────────────────────────── */
  function buildFeaturedCard(artwork, index) {
    const article = document.createElement('article');
    article.className = 'featured-card';
    article.setAttribute('data-reveal', '');
    article.dataset.delay = String(index * 120);

    article.innerHTML = [
      '<a href="gallery.html" class="featured-card-link" aria-label="View ' + escHtml(artwork.title) + ' in gallery">',
        '<div class="featured-card-image-wrapper">',
          '<img',
            ' src="' + escHtml(artwork.image) + '"',
            ' alt="' + escHtml(artwork.title) + '"',
            ' class="featured-card-image"',
            ' loading="lazy"',
            ' decoding="async"',
          '>',
          '<div class="featured-card-overlay" aria-hidden="true">',
            '<span class="view-label">View in Gallery &rarr;</span>',
          '</div>',
        '</div>',
        '<div class="featured-card-info">',
          '<h3 class="featured-card-title">' + escHtml(artwork.title) + '</h3>',
          '<p class="featured-card-meta">' + escHtml(artwork.medium) + ' &middot; ' + artwork.year + '</p>',
        '</div>',
      '</a>'
    ].join('');

    /* Fallback for missing image */
    const img = article.querySelector('.featured-card-image');
    img.addEventListener('error', function () {
      img.style.background = 'var(--color-bg-card)';
      img.style.minHeight  = '200px';
    });

    return article;
  }

  /* ── Re-apply IntersectionObserver to new [data-reveal] elements ─────────── */
  function triggerReveal(elements) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(function () {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el) { observer.observe(el); });
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();
