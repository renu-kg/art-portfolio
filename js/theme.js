/**
 * theme.js — Dark / Light mode toggle  v2.0
 *
 * Runs inline (before DOMContentLoaded) to apply saved theme immediately
 * and prevent a flash of the default dark theme on light-mode preference.
 *
 * v2: Syncs <meta name="theme-color"> when the theme changes so the
 * browser chrome (address bar, system status bar) matches the active theme.
 *
 * Usage: <script src="js/theme.js"></script> in <head>
 */

(function () {
  var STORAGE_KEY   = 'portfolio-theme';
  var DEFAULT_THEME = 'dark';

  var COLOR_DARK  = 'hsl(220, 16%, 7%)';   /* --color-bg dark  */
  var COLOR_LIGHT = 'hsl(42, 30%, 97%)';   /* --color-bg light */

  /**
   * Apply a theme to the <html> element and persist it.
   * @param {'dark'|'light'} theme
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      /* storage unavailable — silently ignore */
    }
    syncThemeColor(theme);
  }

  /**
   * Update <meta name="theme-color"> so the browser chrome matches.
   * @param {'dark'|'light'} theme
   */
  function syncThemeColor(theme) {
    var color = theme === 'dark' ? COLOR_DARK : COLOR_LIGHT;
    /* Update all theme-color meta tags (there may be two: one per media query) */
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.setAttribute('content', color);
    });
  }

  /**
   * Update the toggle button's aria-label.
   * @param {'dark'|'light'} theme
   */
  function syncToggleUI(theme) {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  /** Toggle between dark and light themes. */
  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
    var next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    syncToggleUI(next);
  }

  /* ── 1. Apply saved (or default) theme immediately ── */
  var saved = DEFAULT_THEME;
  try {
    saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  } catch (_) { /* storage unavailable */ }

  applyTheme(saved);

  /* ── 2. Wire up the toggle button once the DOM is ready ── */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
      syncToggleUI(saved);
    }
  });

})();
