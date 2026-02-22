---
layout: default
title: Thank You - Fatboy Financial Planner
description: Thank you for your purchase! Here's what happens next.
---

<!-- Google Analytics Purchase Conversion Tracking -->
<script>
window.addEventListener('load', function () {
  var params = new URLSearchParams(window.location.search);
  var sessionId = params.get('session_id');
  if (typeof gtag !== 'undefined') {
    gtag('event', 'purchase', {
      transaction_id: sessionId || 'ffp-' + Date.now(),
      value: 149.00,
      currency: 'USD',
      tax: 0,
      shipping: 0,
      items: [{
        item_id: 'ffp-pro-founding-member',
        item_name: 'Fatboy Financial Planner Pro - Founding Member',
        item_brand: 'Fatboy Software',
        item_category: 'Software',
        item_category2: 'Financial Planning',
        item_variant: 'One-time Purchase',
        price: 149.00,
        quantity: 1
      }]
    });
    console.log('GA4 purchase tracked:', sessionId || 'no session_id');
  }
});
</script>

<!-- Optional: Meta Pixel (Facebook) Purchase Tracking — uncomment when ready -->
<!--
<script>
window.addEventListener('load', function () {
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Purchase', {
      value: 149.00,
      currency: 'USD',
      content_name: 'Fatboy Financial Planner Pro - Founding Member',
      content_type: 'product',
      content_ids: ['ffp-pro-founding-member']
    });
  }
});
</script>
-->

<style>
/* ============================================================
   SUCCESS PAGE — scoped to .sp-page
   ============================================================ */

/* Override Slate theme defaults inside our page */
.sp-page p  { max-width: none; margin: 0; }
.sp-page a  { display: inline; min-height: auto; }
.sp-page h1,
.sp-page h2,
.sp-page h3 { margin: 0; line-height: 1.25; }

.sp-page {
  max-width: 760px;
  margin: 0 auto;
  padding-bottom: 3rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* ---- Hero -------------------------------------------- */
.sp-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1a3354 55%, #0f2540 100%);
  border-radius: 16px;
  padding: 2.75rem 2rem 2.5rem;
  text-align: center;
  color: #fff;
  margin-bottom: 1.5rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
  position: relative;
  overflow: hidden;
}

.sp-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 65% 35%, rgba(37, 99, 235, 0.18) 0%, transparent 60%);
  pointer-events: none;
}

/* Animated success ring + checkmark */
.sp-ring {
  width: 76px;
  height: 76px;
  background: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  box-shadow: 0 0 0 10px rgba(22, 163, 74, 0.18), 0 0 0 20px rgba(22, 163, 74, 0.07);
  animation: sp-pop 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes sp-pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.sp-check {
  width: 38px;
  height: 38px;
  stroke: #fff;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: sp-draw 0.4s ease 0.4s forwards;
}

@keyframes sp-draw { to { stroke-dashoffset: 0; } }

.sp-hero h1 {
  color: #fff !important;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem !important;
}

.sp-hero .sp-sub {
  color: #93c5fd;
  font-size: 1rem;
  margin-bottom: 1.25rem !important;
}

.sp-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 1.1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 100px;
  font-size: 0.78rem;
  color: #cbd5e1;
  letter-spacing: 0.03em;
  font-family: 'Courier New', Courier, monospace;
}

/* ---- Alert box --------------------------------------- */
.sp-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-left: 4px solid #f59e0b;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #78350f;
  line-height: 1.55;
}

.sp-alert-ico { font-size: 1.25rem; flex-shrink: 0; margin-top: 1px; }
.sp-alert strong { color: #92400e; display: block; margin-bottom: 0.2rem; font-size: 0.95rem; }
.sp-alert a { color: #b45309 !important; font-weight: 600; }

/* ---- Cards ------------------------------------------- */
.sp-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.sp-card-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 1.25rem !important;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
  display: block;
}

/* ---- Steps ------------------------------------------- */
.sp-steps { list-style: none; padding: 0; margin: 0; }

.sp-step {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.sp-step:first-child { padding-top: 0; }
.sp-step:last-child  { border-bottom: none; padding-bottom: 0; }

.sp-num {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: #2563eb;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.82rem;
  margin-top: 2px;
}

.sp-step-body h3 {
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  margin-bottom: 0.3rem !important;
}

.sp-step-body p {
  font-size: 0.875rem !important;
  color: #475569 !important;
  line-height: 1.55 !important;
}

/* ---- Buttons ----------------------------------------- */
.sp-btns {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}

.sp-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.15rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none !important;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
  min-height: 40px;
  line-height: 1;
}

.sp-btn-primary {
  background: #2563eb;
  color: #fff !important;
  border-color: #2563eb;
}
.sp-btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
}

.sp-btn-ghost {
  background: #f8fafc;
  color: #334155 !important;
  border-color: #e2e8f0;
}
.sp-btn-ghost:hover { background: #f1f5f9; }

/* ---- Benefits grid ----------------------------------- */
.sp-benefits {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 520px) {
  .sp-benefits { grid-template-columns: repeat(3, 1fr); }
}

.sp-benefit {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 1.25rem 1rem;
  text-align: center;
}

.sp-benefit-ico { font-size: 1.75rem; display: block; margin-bottom: 0.5rem; }

.sp-benefit h3 {
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  color: #15803d !important;
  margin-bottom: 0.3rem !important;
}

.sp-benefit p {
  font-size: 0.8rem !important;
  color: #374151 !important;
}

/* ---- FAQ --------------------------------------------- */
.sp-faq + .sp-faq { border-top: 1px solid #f1f5f9; }

.sp-faq-q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f172a;
  text-align: left;
}

.sp-faq-ico {
  flex-shrink: 0;
  font-size: 1rem;
  color: #2563eb;
  font-weight: 400;
  transition: transform 0.2s ease;
  line-height: 1;
}

.sp-faq.open .sp-faq-ico { transform: rotate(45deg); }

.sp-faq-a {
  display: none;
  font-size: 0.875rem !important;
  color: #475569 !important;
  line-height: 1.6 !important;
  padding-bottom: 0.9rem;
}

.sp-faq.open .sp-faq-a { display: block; }

/* ---- Support bar ------------------------------------- */
.sp-support {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.sp-support-links { display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap; }
.sp-support a { color: #2563eb !important; font-weight: 600; text-decoration: none !important; }
.sp-support a:hover { text-decoration: underline !important; }

/* ---- Responsive -------------------------------------- */
@media (max-width: 480px) {
  .sp-hero { padding: 2rem 1.25rem; }
  .sp-hero h1 { font-size: 1.55rem; }
  .sp-card { padding: 1.25rem 1rem; }
  .sp-support { flex-direction: column; align-items: flex-start; }
}

/* Respect reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  .sp-ring { animation: none; }
  .sp-check { animation: none; stroke-dashoffset: 0; }
  .sp-btn-primary:hover { transform: none; }
}
</style>

<div class="sp-page">

  <!-- ── Hero ──────────────────────────────────────────── -->
  <div class="sp-hero">
    <div class="sp-ring" aria-hidden="true">
      <svg class="sp-check" viewBox="0 0 52 52">
        <polyline points="14,27 22,35 38,17"/>
      </svg>
    </div>
    <h1>Order Confirmed!</h1>
    <p class="sp-sub">Welcome to Fatboy Financial Planner Pro &mdash; Founding Member</p>
    <div class="sp-badge">
      <span>&#128221;</span>
      <span id="sp-ref">Loading order details&hellip;</span>
    </div>
  </div>

  <!-- ── Email alert ───────────────────────────────────── -->
  <div class="sp-alert" role="alert">
    <span class="sp-alert-ico">&#128231;</span>
    <div>
      <strong>Your license key is on its way.</strong>
      Expect your confirmation email within 5&ndash;10 minutes. Don&rsquo;t see it?
      Check your spam folder or <a href="mailto:fbfinancialplanner@gmail.com">contact us</a>
      and we&rsquo;ll sort it out right away.
    </div>
  </div>

  <!-- ── Next Steps ────────────────────────────────────── -->
  <div class="sp-card">
    <span class="sp-card-label">What Happens Next</span>
    <ul class="sp-steps">

      <li class="sp-step">
        <div class="sp-num">1</div>
        <div class="sp-step-body">
          <h3>Check your email</h3>
          <p>You&rsquo;ll receive an order receipt from Stripe and a separate email from us with your <strong>license key</strong> and getting-started instructions.</p>
        </div>
      </li>

      <li class="sp-step">
        <div class="sp-num">2</div>
        <div class="sp-step-body">
          <h3>Download &amp; install the app</h3>
          <p>Grab the latest version for your platform:</p>
          <div class="sp-btns">
            <a href="#" id="download-free-version" data-version="" class="sp-btn sp-btn-primary">
              &#11015;&nbsp; Windows (.exe)
            </a>
            <a href="#" id="download-linux" data-version="" class="sp-btn sp-btn-ghost">
              &#11015;&nbsp; Linux (.AppImage)
            </a>
          </div>
        </div>
      </li>

      <li class="sp-step">
        <div class="sp-num">3</div>
        <div class="sp-step-body">
          <h3>Activate your Pro license</h3>
          <p>Open the app &rarr; <strong>Help</strong> &rarr; <strong>Activate Pro License</strong> &rarr; paste the key from your email. That&rsquo;s it.</p>
        </div>
      </li>

      <li class="sp-step">
        <div class="sp-num">4</div>
        <div class="sp-step-body">
          <h3>Start planning your retirement</h3>
          <p>Explore Roth conversion ladders, Social Security timing, IRMAA brackets, TCJA expiration scenarios, and much more.</p>
        </div>
      </li>

    </ul>
  </div>

  <!-- ── Founding Member Benefits ──────────────────────── -->
  <div class="sp-benefits">
    <div class="sp-benefit">
      <span class="sp-benefit-ico">&#128274;</span>
      <h3>Price Locked Forever</h3>
      <p>$149 one-time &mdash; no price increases, ever</p>
    </div>
    <div class="sp-benefit">
      <span class="sp-benefit-ico">&#128260;</span>
      <h3>Free Major Updates</h3>
      <p>All future features included at no extra cost</p>
    </div>
    <div class="sp-benefit">
      <span class="sp-benefit-ico">&#11088;</span>
      <h3>Priority Support</h3>
      <p>Direct line to the development team</p>
    </div>
  </div>

  <!-- ── FAQ ───────────────────────────────────────────── -->
  <div class="sp-card">
    <span class="sp-card-label">Common Questions</span>

    <div class="sp-faq">
      <button class="sp-faq-q" onclick="spFaq(this)">
        How do I activate my license?
        <span class="sp-faq-ico">+</span>
      </button>
      <p class="sp-faq-a">Open the app, click <strong>Help</strong> in the top menu, select <strong>Activate Pro License</strong>, and paste the key from your confirmation email.</p>
    </div>

    <div class="sp-faq">
      <button class="sp-faq-q" onclick="spFaq(this)">
        Can I install on multiple computers?
        <span class="sp-faq-ico">+</span>
      </button>
      <p class="sp-faq-a">Yes. Your license covers all of your personal devices &mdash; no restriction on personal use.</p>
    </div>

    <div class="sp-faq">
      <button class="sp-faq-q" onclick="spFaq(this)">
        Will I ever be charged again?
        <span class="sp-faq-ico">+</span>
      </button>
      <p class="sp-faq-a">Never. This is a true one-time purchase. No subscriptions, no annual renewals &mdash; your license is permanent.</p>
    </div>

    <div class="sp-faq">
      <button class="sp-faq-q" onclick="spFaq(this)">
        What is the refund policy?
        <span class="sp-faq-ico">+</span>
      </button>
      <p class="sp-faq-a">If you&rsquo;re not satisfied, email us within 30 days and we&rsquo;ll make it right. We stand behind our software.</p>
    </div>

    <div class="sp-faq">
      <button class="sp-faq-q" onclick="spFaq(this)">
        When will macOS be supported?
        <span class="sp-faq-ico">+</span>
      </button>
      <p class="sp-faq-a">macOS support is on the roadmap. As a Founding Member, you&rsquo;ll receive it at no extra charge when it launches.</p>
    </div>

  </div>

  <!-- ── Support bar ───────────────────────────────────── -->
  <div class="sp-support">
    <span>Questions? We typically reply within 24 hours.</span>
    <div class="sp-support-links">
      <a href="mailto:fbfinancialplanner@gmail.com">&#128231; fbfinancialplanner@gmail.com</a>
      <a href="/">&#8592; Back to Home</a>
    </div>
  </div>

</div>

<script>
(function () {
  // Populate order reference badge from Stripe session_id URL param
  var params  = new URLSearchParams(window.location.search);
  var sid     = params.get('session_id');
  var refEl   = document.getElementById('sp-ref');
  if (sid) {
    refEl.textContent = 'Order ID: ' + sid.slice(0, 22) + '\u2026';
  } else {
    var d = new Date();
    refEl.textContent = 'Purchased ' + d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
})();

function spFaq(btn) {
  var item = btn.closest('.sp-faq');
  var ico  = btn.querySelector('.sp-faq-ico');
  var open = item.classList.toggle('open');
  ico.textContent = open ? '\u00d7' : '+';
}
</script>
