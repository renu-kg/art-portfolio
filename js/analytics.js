/**
 * analytics.js — Google Analytics 4 (GA4) Integration
 * Privacy-first. No PII (names, emails, locations) is ever collected.
 *
 * ── SETUP ──────────────────────────────────────────────────────────────
 * 1. Replace the GA_MEASUREMENT_ID value below with your own.
 *    Your ID looks like: G-XXXXXXXXXX
 *    Find it at: https://analytics.google.com → Admin → Data Streams
 *
 * ── WHAT IS TRACKED ────────────────────────────────────────────────────
 *  page_view        Every page load (automatic via GA4)
 *  artwork_open     Lightbox opened for an artwork
 *  artwork_filter   Category filter pill clicked
 *  artwork_search   Search bar used (query LENGTH only, never content)
 *  contact_click    Commission / Contact CTA button clicked
 *  contact_submit   Contact form successfully submitted
 *  social_click     Social media link clicked
 *  theme_toggle     Dark / light mode switched
 *  nav_click        Navigation link clicked
 *  time_on_page     Seconds spent on page before leaving
 *
 * ── WHAT IS NEVER TRACKED ───────────────────────────────────────────────
 *  ✗ Names, email addresses, phone numbers
 *  ✗ Exact IP addresses (anonymize_ip: true)
 *  ✗ Form field contents
 *  ✗ Cross-site / ad-personalization signals
 */

(function () {
  'use strict';

  /* ── Measurement ID ──────────────────────────────────────────────────── */
  var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← Replace with your actual GA4 ID

  /* Skip on local file system — fetch() and analytics won't work there */
  if (window.location.protocol === 'file:') {
    console.info('[Analytics] Disabled: running from local file:// — serve the site via a local server.');
    return;
  }

  /* Skip if placeholder ID hasn't been replaced */
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.info('[Analytics] Disabled: replace GA_MEASUREMENT_ID in js/analytics.js with your GA4 ID.');
    return;
  }

  /* ── Bootstrap gtag ──────────────────────────────────────────────────── */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());

  /* Privacy-safe defaults */
  gtag('consent', 'default', {
    analytics_storage: 'granted',     // Change to 'denied' if you need a consent banner
  });

  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,      // Disables cross-device tracking
    allow_ad_personalization_signals: false,
    send_page_view: true,             // Track page views automatically
  });

  /* Async, non-blocking script load */
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);

  /* ── Public Analytics API ────────────────────────────────────────────── */
  /**
   * window.ArtAnalytics.track(eventName, params)
   * Called by gallery.js and other modules to fire events.
   */
  window.ArtAnalytics = {
    /**
     * @param {string} eventName - GA4 event name (snake_case recommended)
     * @param {Object} [params]  - Additional parameters. NEVER include PII.
     */
    track: function (eventName, params) {
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', eventName, params || {});
    },

    /**
     * Manual page view — use for SPA-style navigation only.
     * Normal multi-page sites don't need to call this.
     */
    pageView: function (path) {
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', 'page_view', {
        page_path:  path || window.location.pathname,
        page_title: document.title,
      });
    },
  };

  /* ── Auto-wired event listeners ──────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {

    /* Social media link clicks (element must have data-social="platform") */
    document.querySelectorAll('[data-social]').forEach(function (el) {
      el.addEventListener('click', function () {
        window.ArtAnalytics.track('social_click', {
          platform: el.dataset.social,
          page:     window.location.pathname,
        });
      });
    });

    /* Contact / Commission CTA clicks (element must have data-ga="contact") */
    document.querySelectorAll('[data-ga="contact"]').forEach(function (el) {
      el.addEventListener('click', function () {
        window.ArtAnalytics.track('contact_click', {
          button_text: el.textContent.trim().substring(0, 60),
          page:        window.location.pathname,
        });
      });
    });

    /* Navigation link clicks */
    document.querySelectorAll('.nav-link').forEach(function (el) {
      el.addEventListener('click', function () {
        window.ArtAnalytics.track('nav_click', {
          destination: el.getAttribute('href') || '',
        });
      });
    });

    /* Dark / Light mode toggle */
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        /* Read the theme that was just applied (after theme.js toggles it) */
        setTimeout(function () {
          var theme = document.documentElement.getAttribute('data-theme');
          window.ArtAnalytics.track('theme_toggle', { switched_to: theme });
        }, 50);
      });
    }

    /* Contact form submission */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function () {
        /* Only fire if the form passes HTML5 validation */
        window.ArtAnalytics.track('contact_submit', {
          page: window.location.pathname,
        });
      });
    }

  }); // DOMContentLoaded

  /* ── Time on Page ────────────────────────────────────────────────────── */
  var _pageStart = Date.now();
  window.addEventListener('pagehide', function () {
    var seconds = Math.round((Date.now() - _pageStart) / 1000);
    /* Use sendBeacon (via gtag) so the event fires even as page unloads */
    window.ArtAnalytics.track('time_on_page', {
      seconds:      seconds,
      page:         window.location.pathname,
    });
  });

})();
