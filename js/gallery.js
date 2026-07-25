/**
 * gallery.js — Dynamic gallery powered by artworks.json
 * v2.0 — Production refactor
 *
 * Improvements over v1:
 *  ✓ Debounced search (300ms) — no re-render on every keystroke
 *  ✓ Focus trap inside lightbox (WCAG 2.1 AA compliant)
 *  ✓ Focus returned to triggering card on lightbox close
 *  ✓ DOM API card building — no innerHTML, no XSS risk
 *  ✓ Shimmer skeleton loading UI (6 cards while fetching)
 *  ✓ aria-hidden toggle on lightbox open / close
 *  ✓ aria-pressed on filter buttons for screen readers
 *  ✓ prefers-reduced-motion respected
 *  ✓ Google Analytics event hooks (window.ArtAnalytics)
 *
 * To add a new artwork: edit artworks.json only. No JS changes needed.
 */

(function () {
  'use strict';

  /* ── Preferences ────────────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── State ─────────────────────────────────────────────────────────────── */
  var allArtworks      = [];
  var filteredArtworks = [];
  var activeCategory   = 'all';
  var searchQuery      = '';
  var lightboxIndex    = 0;
  var lastFocusedCard  = null; // Returned focus target after lightbox closes

  /* ── DOM References ─────────────────────────────────────────────────────── */
  var galleryGrid   = document.getElementById('galleryGrid');
  var noResults     = document.getElementById('noResults');
  var countEl       = document.getElementById('artworkCount');
  var filterBtns    = document.querySelectorAll('.filter-btn');
  var searchInput   = document.getElementById('searchInput');
  var searchWrapper = document.querySelector('.search-wrapper');
  var searchClear   = document.getElementById('searchClear');

  /* Lightbox */
  var lightbox        = document.getElementById('lightbox');
  var lightboxImg     = document.getElementById('lightboxImg');
  var lightboxTitle   = document.getElementById('lightboxTitle');
  var lightboxTag     = document.getElementById('lightboxTag');
  var lightboxMedium  = document.getElementById('lightboxMedium');
  var lightboxYear    = document.getElementById('lightboxYear');
  var lightboxCat     = document.getElementById('lightboxCat');
  var lightboxDesc    = document.getElementById('lightboxDesc');
  var lightboxCounter = document.getElementById('lightboxCounter');
  var lightboxClose   = document.getElementById('lightboxClose');
  var lightboxPrev    = document.getElementById('lightboxPrev');
  var lightboxNext    = document.getElementById('lightboxNext');

  /* ── Utility: debounce ───────────────────────────────────────────────────── */
  function debounce(fn, wait) {
    var timer;
    return function () {
      var ctx  = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  /** Capitalize first letter. */
  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  /* ── IntersectionObserver: card fade-in ──────────────────────────────────── */
  var cardObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var card = entry.target;
        if (prefersReducedMotion) {
          card.style.opacity = '1';
          card.style.transform = 'none';
        }
        card.classList.add('visible');
        cardObserver.unobserve(card);
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
  );

  /* ── Fetch & Initialise ─────────────────────────────────────────────────── */
  function init() {
    showSkeleton();
    fetch('./artworks.json')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        allArtworks      = data;
        filteredArtworks = data.slice();
        renderGallery();
        setupFilters();
        setupSearch();
        setupLightbox();
      })
      .catch(function (err) {
        console.error('[gallery] Failed to load artworks.json:', err);
        showError();
      });
  }

  /* ── Skeleton Loading (shimmer cards while fetching) ────────────────────── */
  function showSkeleton() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    for (var i = 0; i < 6; i++) {
      var card  = document.createElement('div');
      card.className = 'skeleton-card';
      card.setAttribute('aria-hidden', 'true');

      var img  = document.createElement('div');
      img.className = 'skeleton skeleton-img';

      var info = document.createElement('div');
      info.className = 'skeleton-info';

      var t = document.createElement('div');
      t.className = 'skeleton skeleton-title';
      var m = document.createElement('div');
      m.className = 'skeleton skeleton-meta';

      info.appendChild(t);
      info.appendChild(m);
      card.appendChild(img);
      card.appendChild(info);
      galleryGrid.appendChild(card);
    }
  }

  function showError() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'gallery-error';
    var p = document.createElement('p');
    p.textContent = 'Could not load artworks. Make sure artworks.json is in the project root and you are serving the site via a local server (not opening the HTML file directly). Try: ';
    var code = document.createElement('code');
    code.textContent = 'npx serve .';
    p.appendChild(code);
    wrap.appendChild(p);
    galleryGrid.appendChild(wrap);
  }

  /* ── Render Gallery ─────────────────────────────────────────────────────── */
  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    if (filteredArtworks.length === 0) {
      if (noResults) noResults.classList.add('visible');
      updateCount(0);
      return;
    }

    if (noResults) noResults.classList.remove('visible');
    updateCount(filteredArtworks.length);

    filteredArtworks.forEach(function (artwork, index) {
      var card = buildCard(artwork, index);
      galleryGrid.appendChild(card);
      cardObserver.observe(card);
    });
  }

  /* ── Build Card with DOM API (no innerHTML, no XSS risk) ───────────────── */
  function buildCard(artwork, index) {

    /* ── Root article ── */
    var article = document.createElement('article');
    article.className = 'gallery-card';
    article.setAttribute('data-id', String(artwork.id));
    article.style.setProperty('--card-index', String(index));
    article.setAttribute('role', 'button');
    article.setAttribute('tabindex', '0');
    article.setAttribute('aria-label', 'Open artwork: ' + artwork.title);

    /* ── Image wrapper ── */
    var imgWrapper = document.createElement('div');
    imgWrapper.className = 'card-image-wrapper';

    /* ── Image ── */
    var img = document.createElement('img');
    img.className = 'card-image';
    img.alt       = artwork.title;
    img.loading   = 'lazy';
    img.decoding  = 'async';
    img.src       = artwork.image;

    /* Error fallback: show placeholder */
    img.addEventListener('error', function () {
      img.style.display = 'none';
      var ph   = document.createElement('div');
      ph.className = 'card-placeholder';
      var icon = document.createElement('span');
      icon.className = 'card-placeholder-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '🖊';
      var label = document.createElement('span');
      label.textContent = artwork.title;
      ph.appendChild(icon);
      ph.appendChild(label);
      imgWrapper.insertBefore(ph, img);
    });

    /* ── Hover overlay ── */
    var overlay = document.createElement('div');
    overlay.className = 'card-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var inner = document.createElement('div');

    var overlayTitle = document.createElement('h3');
    overlayTitle.className   = 'card-overlay-title';
    overlayTitle.textContent = artwork.title;

    var overlayMedium = document.createElement('p');
    overlayMedium.className   = 'card-overlay-medium';
    overlayMedium.textContent = artwork.medium + ' · ' + artwork.year;

    var overlayCta = document.createElement('span');
    overlayCta.className   = 'card-overlay-cta';
    overlayCta.textContent = 'View artwork →';

    inner.appendChild(overlayTitle);
    inner.appendChild(overlayMedium);
    inner.appendChild(overlayCta);
    overlay.appendChild(inner);

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(overlay);

    /* ── Card info ── */
    var info = document.createElement('div');
    info.className = 'card-info';

    var cardTitle = document.createElement('h3');
    cardTitle.className   = 'card-title';
    cardTitle.textContent = artwork.title;

    var cardMeta = document.createElement('p');
    cardMeta.className   = 'card-meta';
    cardMeta.textContent = artwork.medium + ' · ' + artwork.year;

    info.appendChild(cardTitle);
    info.appendChild(cardMeta);

    article.appendChild(imgWrapper);
    article.appendChild(info);

    /* ── Interactions ── */
    function openThis() {
      lastFocusedCard = article;
      openLightbox(index);
      if (window.ArtAnalytics) {
        window.ArtAnalytics.track('artwork_open', {
          artwork_id:       artwork.id,
          artwork_title:    artwork.title,
          artwork_category: artwork.category,
          artwork_year:     artwork.year,
        });
      }
    }

    article.addEventListener('click', openThis);
    article.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openThis();
      }
    });

    return article;
  }

  /* ── Count display ───────────────────────────────────────────────────────── */
  function updateCount(n) {
    if (!countEl) return;
    var strong = document.createElement('strong');
    strong.textContent = String(n);
    countEl.textContent = '';
    countEl.appendChild(strong);
    countEl.appendChild(document.createTextNode(' artwork' + (n === 1 ? '' : 's')));
  }

  /* ── Filters ─────────────────────────────────────────────────────────────── */
  function setupFilters() {
    filterBtns.forEach(function (btn) {
      /* Initialize aria-pressed state */
      btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');

      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        activeCategory = btn.dataset.category;
        applyFilters();

        if (window.ArtAnalytics && activeCategory !== 'all') {
          window.ArtAnalytics.track('artwork_filter', { category: activeCategory });
        }
      });
    });
  }

  /* ── Search ──────────────────────────────────────────────────────────────── */
  function setupSearch() {
    if (!searchInput) return;

    var debouncedSearch = debounce(function () {
      searchQuery = searchInput.value.trim().toLowerCase();
      if (searchWrapper) searchWrapper.classList.toggle('has-value', searchQuery.length > 0);
      applyFilters();

      /* Track search usage — query length only, never the actual text */
      if (searchQuery && window.ArtAnalytics) {
        window.ArtAnalytics.track('artwork_search', {
          query_length:   searchQuery.length,
          results_count:  filteredArtworks.length,
          active_filter:  activeCategory,
        });
      }
    }, 300);

    searchInput.addEventListener('input', debouncedSearch);

    if (searchClear) {
      searchClear.addEventListener('click', function () {
        searchInput.value = '';
        searchQuery = '';
        if (searchWrapper) searchWrapper.classList.remove('has-value');
        applyFilters();
        searchInput.focus();
      });
    }
  }

  /* ── Combined filter + search ─────────────────────────────────────────────── */
  function applyFilters() {
    filteredArtworks = allArtworks.filter(function (a) {
      var catOk  = activeCategory === 'all' || a.category === activeCategory;
      var textOk = !searchQuery ||
        a.title.toLowerCase().includes(searchQuery) ||
        a.medium.toLowerCase().includes(searchQuery) ||
        (a.description && a.description.toLowerCase().includes(searchQuery));
      return catOk && textOk;
    });
    renderGallery();
  }

  /* ══════════════════════════════════════════════════
     LIGHTBOX
  ══════════════════════════════════════════════════ */

  /* Elements that can receive keyboard focus */
  var FOCUSABLE_SELECTORS = [
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'a[href]',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
  ].join(', ');

  function getLightboxFocusable() {
    return lightbox ? Array.from(lightbox.querySelectorAll(FOCUSABLE_SELECTORS)) : [];
  }

  /* ── Focus Trap ─────────────────────────────────────────────────────────── */
  function trapFocus(e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key !== 'Tab') return;

    var focusable = getLightboxFocusable();
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  /* ── Setup ───────────────────────────────────────────────────────────────── */
  function setupLightbox() {
    if (!lightbox) return;

    /* Click on the dark backdrop to close */
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev)  lightboxPrev.addEventListener('click',  function () { navigateLightbox(-1); });
    if (lightboxNext)  lightboxNext.addEventListener('click',  function () { navigateLightbox(1);  });

    document.addEventListener('keydown', handleKeyboard);

    /* Touch swipe */
    var swipeStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      swipeStartX = e.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - swipeStartX;
      if (Math.abs(dx) > 48) navigateLightbox(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ── Open / Close ────────────────────────────────────────────────────────── */
  function openLightbox(index) {
    if (!lightbox) return;
    lightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('open');
    lightbox.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', trapFocus);
    /* Delay focus so CSS transition doesn't fight with focus scroll */
    setTimeout(function () {
      if (lightboxClose) lightboxClose.focus();
    }, 60);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', trapFocus);
    /* Return focus to the card that triggered the lightbox */
    if (lastFocusedCard) {
      lastFocusedCard.focus({ preventScroll: true });
      lastFocusedCard = null;
    }
  }

  function navigateLightbox(dir) {
    if (filteredArtworks.length <= 1) return;
    lightboxIndex = (lightboxIndex + dir + filteredArtworks.length) % filteredArtworks.length;
    updateLightboxContent();
  }

  /* ── Content Update (with image fade-swap) ──────────────────────────────── */
  function updateLightboxContent() {
    var artwork = filteredArtworks[lightboxIndex];
    if (!artwork || !lightboxImg) return;

    /* Fade out → load → fade in */
    lightboxImg.classList.add('fading');
    var tmp     = new Image();
    tmp.onload  = function () {
      lightboxImg.src = artwork.image;
      lightboxImg.alt = artwork.title;
      lightboxImg.classList.remove('fading');
    };
    tmp.onerror = function () {
      lightboxImg.src = '';
      lightboxImg.alt = artwork.title + ' (image not found)';
      lightboxImg.classList.remove('fading');
    };
    tmp.src = artwork.image;

    /* Text fields */
    if (lightboxTitle)   lightboxTitle.textContent   = artwork.title;
    if (lightboxTag)     lightboxTag.textContent      = capitalize(artwork.category);
    if (lightboxMedium)  lightboxMedium.textContent   = artwork.medium;
    if (lightboxYear)    lightboxYear.textContent     = String(artwork.year);
    if (lightboxCat)     lightboxCat.textContent      = capitalize(artwork.category);
    if (lightboxDesc)    lightboxDesc.textContent     = artwork.description || '';
    if (lightboxCounter) lightboxCounter.textContent  = (lightboxIndex + 1) + ' / ' + filteredArtworks.length;

    /* Disable nav arrows when only one artwork shown */
    var single = filteredArtworks.length <= 1;
    if (lightboxPrev) lightboxPrev.disabled = single;
    if (lightboxNext) lightboxNext.disabled = single;
  }

  /* ── Keyboard handler ────────────────────────────────────────────────────── */
  function handleKeyboard(e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    switch (e.key) {
      case 'Escape':     e.preventDefault(); closeLightbox();      break;
      case 'ArrowLeft':  e.preventDefault(); navigateLightbox(-1); break;
      case 'ArrowRight': e.preventDefault(); navigateLightbox(1);  break;
    }
  }

  /* ── Boot ────────────────────────────────────────────────────────────────── */
  /* Scripts are placed at end of <body>, so DOM is already ready */
  init();

})();
