// assets/js/founding-count.js
// Fetches live Founding Member count from /api/user-count
// and updates all [data-founding-*] elements on the page.
//
// Usage: add data attributes to any element you want updated:
//
//   data-founding-remaining   → "47 spots remaining"
//   data-founding-count       → "153 of 200 claimed"
//   data-founding-label       → full scarcity sentence
//   data-founding-hide-if-null → hides element if count unavailable

(function () {
  const API_URL = 'https://fatboy-license-server-oc13.vercel.app/api/user-count';
  const FOUNDING_PRICE = 149;
  const REGULAR_PRICE = 249;
  const LIMIT = 200;

  function updateElements(data) {
    const { count, remaining, isSoldOut, error } = data;

    // If API errored or returned null, hide dynamic elements gracefully
    if (error || count === null) {
      document.querySelectorAll('[data-founding-hide-if-null]').forEach(el => {
        el.style.display = 'none';
      });
      return;
    }

    // data-founding-remaining → "47 spots remaining"
    document.querySelectorAll('[data-founding-remaining]').forEach(el => {
      if (isSoldOut) {
        el.textContent = 'Founding Member pricing has ended';
        el.style.color = 'var(--rust, #8b3a2a)';
      } else {
        el.textContent = `${remaining} of ${LIMIT} Founding Member spots remaining`;
      }
    });

    // data-founding-count → "153"
    document.querySelectorAll('[data-founding-count]').forEach(el => {
      el.textContent = count;
    });

    // data-founding-label → full sentence for hero/pricing
    document.querySelectorAll('[data-founding-label]').forEach(el => {
      if (isSoldOut) {
        el.textContent = `Founding Member pricing has ended — regular price is $${REGULAR_PRICE}`;
        el.style.color = 'var(--rust, #8b3a2a)';
      } else {
        el.textContent = `${remaining} of ${LIMIT} Founding Member spots left — price rises to $${REGULAR_PRICE} at ${LIMIT}`;
      }
    });

    // data-founding-bar → update a progress bar element (set width %)
    document.querySelectorAll('[data-founding-bar]').forEach(el => {
      const pct = Math.min(100, Math.round((count / LIMIT) * 100));
      el.style.width = `${pct}%`;
      el.setAttribute('aria-valuenow', count);
    });

    // data-founding-pct → "76% claimed"
    document.querySelectorAll('[data-founding-pct]').forEach(el => {
      const pct = Math.min(100, Math.round((count / LIMIT) * 100));
      el.textContent = `${pct}% claimed`;
    });

    // If sold out, update all buy buttons to show regular price
    if (isSoldOut) {
      document.querySelectorAll('[data-founding-btn]').forEach(el => {
        el.textContent = `Buy Now — $${REGULAR_PRICE}`;
      });
    }
  }

  function init() {
    fetch(API_URL, { method: 'GET', headers: { 'Accept': 'application/json' } })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => updateElements(data))
      .catch(() => {
        // Silent fail — static fallback text remains visible
        document.querySelectorAll('[data-founding-hide-if-null]').forEach(el => {
          el.style.display = 'none';
        });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
