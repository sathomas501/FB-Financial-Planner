---
layout: default
title: Federal Retirement Planner for FERS, Supplement, TSP, and Pension Timing
description: See your FERS pension, supplement, TSP withdrawals, Social Security, and taxes line up year by year.
keywords: federal retirement planner, FERS retirement calculator, FERS supplement calculator, TSP retirement planning, federal pension planner, federal employee retirement planning, CSRS retirement calculator
image: /assets/images/federal-advanced.png
canonical: https://www.fatboysoftware.com/federal-retirement
permalink: /federal-retirement/
---

<style>
  .federal-page {
    --federal-ink: #161616;
    --federal-subtle: #5c6470;
    --federal-line: #d7dde6;
    --federal-bg: #f7f9fc;
    --federal-card: #ffffff;
    --federal-blue: #184c8c;
    --federal-blue-dark: #113863;
    --federal-gold: #b98a2e;
    --federal-shadow: 0 16px 40px rgba(16, 34, 58, 0.08);
    margin-top: 0.5rem;
  }

  .federal-kicker {
    display: inline-block;
    margin-bottom: 0.9rem;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    background: #eef4fb;
    color: var(--federal-blue);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .federal-subhead {
    font-size: 1.15rem;
    line-height: 1.6;
    color: var(--federal-subtle);
    max-width: 48rem;
    margin: 0 0 1.15rem;
  }

  .federal-hero {
    margin: 1.4rem 0 1.5rem;
    padding: 1.35rem;
    background: linear-gradient(145deg, #f8fbff, #eef4fb);
    border: 1px solid #d7e4f7;
    border-radius: 16px;
    box-shadow: var(--federal-shadow);
  }

  .federal-hero-copy {
    margin: 0 0 0.9rem;
    color: var(--federal-subtle);
  }

  .federal-trust {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin: 1rem 0 1.1rem;
    padding: 0;
    list-style: none;
  }

  .federal-trust li {
    margin: 0;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    background: rgba(255,255,255,0.9);
    border: 1px solid #d8e4f5;
    color: var(--federal-ink);
    font-size: 0.95rem;
  }

  .federal-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin: 1rem 0 0.7rem;
  }

  .federal-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0.82rem 1.15rem;
    border-radius: 10px;
    text-decoration: none !important;
    font-weight: 700;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  }

  .federal-btn:hover {
    transform: translateY(-1px);
  }

  .federal-btn-primary {
    background: var(--federal-blue);
    color: #fff !important;
    box-shadow: 0 10px 24px rgba(24, 76, 140, 0.18);
  }

  .federal-btn-primary:hover {
    background: var(--federal-blue-dark);
  }

  .federal-btn-secondary {
    background: #fff;
    color: var(--federal-blue) !important;
    border: 1px solid #c8d7ec;
  }

  .federal-note {
    margin: 0.55rem 0 0;
    color: var(--federal-subtle);
    font-size: 0.96rem;
  }

  .federal-proof {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.9rem;
    margin: 1.2rem 0 1.4rem;
  }

  .federal-proof-card,
  .federal-card,
  .federal-step,
  .federal-scenario {
    background: var(--federal-card);
    border: 1px solid var(--federal-line);
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(16, 34, 58, 0.04);
  }

  .federal-proof-card {
    padding: 1rem;
  }

  .federal-proof-card strong {
    display: block;
    margin-bottom: 0.35rem;
    color: var(--federal-ink);
  }

  .federal-proof-card p {
    margin: 0;
    color: var(--federal-subtle);
  }

  .federal-media {
    margin: 1.4rem 0 0.6rem;
  }

  .federal-media img {
    width: 100%;
    height: auto;
    border: 1px solid #d2d9e3;
    border-radius: 12px;
    box-shadow: var(--federal-shadow);
  }

  .federal-caption {
    margin-top: 0.55rem;
    color: var(--federal-subtle);
    font-size: 0.95rem;
  }

  .federal-media-note {
    margin-top: 0.9rem;
    padding: 0.95rem 1rem;
    background: linear-gradient(145deg, #fbfcfe, #f4f7fb);
    border: 1px solid var(--federal-line);
    border-radius: 14px;
  }

  .federal-media-note strong {
    color: var(--federal-ink);
  }

  .federal-media-note p {
    margin: 0 0 0.8rem;
    max-width: 44rem;
    color: var(--federal-subtle);
    font-size: 0.97rem;
    line-height: 1.68;
  }

  .federal-media-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .federal-media-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    text-decoration: none !important;
    font-weight: 700;
    font-size: 0.92rem;
    border: 1px solid #c8d7ec;
    background: #fff;
    color: var(--federal-blue) !important;
  }

  .federal-media-link:hover {
    background: #eef4fb;
  }

  .federal-section-lead {
    color: var(--federal-subtle);
    margin-bottom: 1rem;
  }

  .federal-section-intro {
    margin: 2.2rem 0 1.1rem;
  }

  .federal-section-kicker {
    display: inline-block;
    margin-bottom: 0.55rem;
    color: var(--federal-blue);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .federal-section-title {
    margin: 0 0 0.45rem;
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 2.4vw, 1.95rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: var(--federal-ink);
  }

  .federal-section-copy {
    margin: 0;
    max-width: 42rem;
    color: var(--federal-subtle);
    font-size: 1.02rem;
    line-height: 1.72;
  }

  .federal-grid-2,
  .federal-grid-3,
  .federal-steps,
  .federal-scenarios,
  .federal-faq {
    display: grid;
    gap: 0.95rem;
  }

  .federal-grid-2,
  .federal-steps,
  .federal-faq {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .federal-grid-3,
  .federal-scenarios {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .federal-card,
  .federal-step,
  .federal-scenario {
    padding: 1rem 1rem 0.95rem;
  }

  .federal-scenario {
    position: relative;
    padding: 1.2rem 1.15rem 1.1rem;
    overflow: hidden;
  }

  .federal-scenario::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #d9a441, #c58b2b);
  }

  .federal-scenario-label {
    display: inline-block;
    margin-bottom: 0.55rem;
    color: #8b6b2d;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .federal-card h3,
  .federal-step h3,
  .federal-scenario h3,
  .federal-faq-item h3 {
    margin-top: 0;
    margin-bottom: 0.45rem;
    font-size: 1.05rem;
  }

  .federal-card p,
  .federal-step p,
  .federal-scenario p,
  .federal-faq-item p {
    margin-bottom: 0;
    color: var(--federal-subtle);
  }

  .federal-scenario h3 {
    font-size: 1.24rem;
    line-height: 1.22;
    letter-spacing: -0.02em;
    margin-bottom: 0.6rem;
  }

  .federal-scenario p {
    font-size: 0.98rem;
    line-height: 1.72;
    max-width: 22rem;
  }

  .federal-audience {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
    margin: 1rem 0 1.05rem;
  }

  .federal-audience-item {
    padding: 0.95rem 1rem;
    background: #fff;
    border: 1px solid var(--federal-line);
    border-radius: 14px;
    box-shadow: 0 8px 24px rgba(16, 34, 58, 0.04);
    color: var(--federal-subtle);
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .federal-audience-item strong {
    color: var(--federal-ink);
    font-weight: 700;
  }

  .federal-audience-note {
    max-width: 44rem;
    margin: 0;
    color: var(--federal-subtle);
    font-size: 1rem;
    line-height: 1.75;
  }

  .federal-audience-note strong {
    color: var(--federal-ink);
  }

  .federal-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.9rem;
    height: 1.9rem;
    margin-bottom: 0.65rem;
    border-radius: 999px;
    background: #eef4fb;
    color: var(--federal-blue);
    font-weight: 700;
  }

  .federal-cta-band {
    margin: 1.5rem 0;
    padding: 1.15rem 1.2rem;
    background: #fbfcfe;
    border: 1px solid var(--federal-line);
    border-radius: 14px;
  }

  .federal-faq-item {
    padding: 1rem;
    background: var(--federal-card);
    border: 1px solid var(--federal-line);
    border-radius: 14px;
  }

  .federal-footer-links {
    margin-top: 1rem;
  }

  .federal-footer-links a {
    margin-right: 1rem;
    white-space: nowrap;
  }

  .federal-mobile-bar {
    display: none;
  }

  @media (max-width: 900px) {
    .federal-proof,
    .federal-grid-3,
    .federal-scenarios {
      grid-template-columns: 1fr;
    }

    .federal-grid-2,
    .federal-steps,
    .federal-faq {
      grid-template-columns: 1fr;
    }

    .federal-audience {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .federal-actions {
      flex-direction: column;
    }

    .federal-btn {
      width: 100%;
    }

    .federal-mobile-bar {
      display: block;
      position: sticky;
      bottom: 0;
      z-index: 20;
      margin: 1rem -0.4rem 0;
      padding: 0.8rem;
      background: rgba(255,255,255,0.96);
      border-top: 1px solid #d9e0ea;
      backdrop-filter: blur(6px);
    }
  }
</style>

<div class="federal-page">

<span class="federal-kicker">Built for federal employees and pension households</span>

# See when your FERS pension, supplement, TSP, and Social Security actually line up

<p class="federal-subhead">Generic retirement calculators usually flatten everything into one number. This one shows when salary stops, when pension starts, when the FERS supplement ends, what taxes do to spending, and where withdrawals have to fill the gap.</p>

<section class="federal-hero">
  <p class="federal-hero-copy"><strong>Try the federal example first.</strong> The fastest way to judge the planner is to open the free version with a federal scenario already loaded.</p>

  <ul class="federal-trust">
    <li>FERS supplement timing</li>
    <li>Pension COLA and step-downs</li>
    <li>TSP withdrawals and taxes</li>
    <li>Spouse timing and income gaps</li>
  </ul>

  <div class="federal-actions">
    <a href="https://app.fatboysoftware.com/?federal=1" class="federal-btn federal-btn-primary" data-federal-cta="hero_free_app">Try Free Federal Example</a>
    <a href="https://planner.fatboysoftware.com" class="federal-btn federal-btn-secondary" data-federal-cta="hero_full_planner">Open Full Federal Planner</a>
  </div>

  <p class="federal-note">No signup wall for the free preview. Start there, then move into the full planner if you want deeper editing.</p>
</section>

<div class="federal-proof">
  <div class="federal-proof-card">
    <strong>See the handoff years</strong>
    <p>Watch the exact years where salary stops, pension begins, and the supplement drops before Social Security starts.</p>
  </div>
  <div class="federal-proof-card">
    <strong>See the spending gap</strong>
    <p>Taxes, healthcare, and withdrawals stay visible so you can see the actual pressure on the plan.</p>
  </div>
  <div class="federal-proof-card">
    <strong>See whether timing changes help</strong>
    <p>Compare retiring at 57, 60, or 62 instead of guessing from a single summary number.</p>
  </div>
</div>

<div class="federal-media">
  <picture>
    <source srcset="/assets/images/optimized/federal-advanced-400w.webp 400w, /assets/images/optimized/federal-advanced-800w.webp 800w, /assets/images/optimized/federal-advanced-1200w.webp 1200w"
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 80vw, 1200px"
            type="image/webp">
    <source srcset="/assets/images/optimized/federal-advanced-400w.png 400w, /assets/images/optimized/federal-advanced-800w.png 800w, /assets/images/optimized/federal-advanced-1200w.png 1200w"
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 80vw, 1200px"
            type="image/png">
    <img src="/assets/images/optimized/federal-advanced-800w.png"
         alt="Federal retirement planning controls showing pension COLA, age-62 pension changes, and FERS annuity supplement settings"
         loading="eager">
  </picture>
  <p class="federal-caption">Shown here: the full planner desktop app with federal-style controls for pension timing, supplement years, spouse coordination, and later pension changes.</p>
  <div class="federal-media-note">
    <p><strong>Important context:</strong> the screenshots on this page are from the full planner desktop app. Start in the free web example to test the workflow quickly, then move to the desktop app or full planner if you want deeper federal editing and saved scenarios.</p>
    <div class="federal-media-links">
      <a href="https://app.fatboysoftware.com/?federal=1" class="federal-media-link" data-federal-cta="media_free_web_app">Open Free Web Example</a>
      <a href="/pricing" class="federal-media-link" data-federal-cta="media_desktop_pricing">See Desktop App Pricing</a>
      <a href="/screenshots" class="federal-media-link" data-federal-cta="media_screenshots">View More Screenshots</a>
    </div>
  </div>
</div>

---

## Start in about 30 seconds

<p class="federal-section-lead">You do not need to read the whole page before getting value. This is the fastest path.</p>

<div class="federal-steps">
  <section class="federal-step">
    <span class="federal-number">1</span>
    <h3>Open the free federal example</h3>
    <p>Launch the web app with a federal case already loaded so you can see the planning flow immediately.</p>
  </section>
  <section class="federal-step">
    <span class="federal-number">2</span>
    <h3>Check the handoff year</h3>
    <p>Look at the years when salary ends, pension starts, and the supplement ends before Social Security begins.</p>
  </section>
  <section class="federal-step">
    <span class="federal-number">3</span>
    <h3>Run the projection</h3>
    <p>See whether taxes and withdrawals create a gap that a generic calculator would hide.</p>
  </section>
  <section class="federal-step">
    <span class="federal-number">4</span>
    <h3>Move deeper only if you need it</h3>
    <p>If the preview proves the concept, use the full planner for more control and deeper editing.</p>
  </section>
</div>

<section class="federal-cta-band">
  <div class="federal-actions">
    <a href="https://app.fatboysoftware.com/?federal=1" class="federal-btn federal-btn-primary" data-federal-cta="quickstart_free_app">Start Free In The Web App</a>
    <a href="https://planner.fatboysoftware.com" class="federal-btn federal-btn-secondary" data-federal-cta="quickstart_full_planner">Go To The Full Planner</a>
  </div>
  <p class="federal-note">The free app is the best first click. The full planner is the better second click.</p>
</section>

---

## What this planner handles that generic calculators usually miss

<div class="federal-grid-2">
  <section class="federal-card">
    <h3>FERS supplement timing</h3>
    <p>Model the temporary supplement before age 62 and see exactly what happens when it ends.</p>
  </section>
  <section class="federal-card">
    <h3>Pension COLA and later changes</h3>
    <p>Add COLA assumptions and later pension changes for offset-style or step-down scenarios.</p>
  </section>
  <section class="federal-card">
    <h3>TSP withdrawals inside the full plan</h3>
    <p>See pension, TSP, Social Security, and taxes interacting year by year instead of in isolation.</p>
  </section>
  <section class="federal-card">
    <h3>Spouse timing</h3>
    <p>Handle households where one spouse retires earlier, keeps working longer, or has a different income mix.</p>
  </section>
</div>

---

## See federal retirement cash flow year by year

<p class="federal-section-lead">The point is not just to get a success score. The point is to see where the plan is smooth and where it is under pressure.</p>

<div class="federal-media">
  <picture>
    <source srcset="/assets/images/optimized/Federal_sankey-400w.webp 400w, /assets/images/optimized/Federal_sankey-800w.webp 800w, /assets/images/optimized/Federal_sankey-1200w.webp 1200w"
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 80vw, 1200px"
            type="image/webp">
    <source srcset="/assets/images/optimized/Federal_sankey-400w.png 400w, /assets/images/optimized/Federal_sankey-800w.png 800w, /assets/images/optimized/Federal_sankey-1200w.png 1200w"
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 80vw, 1200px"
            type="image/png">
    <img src="/assets/images/optimized/Federal_sankey-800w.png"
         alt="Federal retirement cash flow diagram showing salary, pension, taxes, healthcare, expenses, and withdrawals by year"
         loading="lazy">
  </picture>
  <p class="federal-caption">See how salary, pension, supplement income, taxes, healthcare, living expenses, and withdrawals fit together inside the plan.</p>
</div>

<div class="federal-grid-2">
  <section class="federal-card">
    <h3>When salary stops</h3>
    <p>See the transition from working years to pension years without losing the timing details.</p>
  </section>
  <section class="federal-card">
    <h3>When the supplement ends</h3>
    <p>Spot the drop-off years that often create the real spending gap before Social Security starts.</p>
  </section>
  <section class="federal-card">
    <h3>What taxes do to spending</h3>
    <p>Look at the take-home impact, not just gross income numbers that make the plan look cleaner than it is.</p>
  </section>
  <section class="federal-card">
    <h3>Whether withdrawals have to bridge the gap</h3>
    <p>See when the portfolio needs to step in and how much pressure that creates year by year.</p>
  </section>
</div>

---

<section class="federal-section-intro">
  <span class="federal-section-kicker">Scenario Fit</span>
  <h2 class="federal-section-title">Common federal scenarios this handles</h2>
  <p class="federal-section-copy">These are the kinds of plans where a generic pension line usually stops being enough and timing starts to matter.</p>
</section>

<div class="federal-scenarios">
  <section class="federal-scenario">
    <span class="federal-scenario-label">Bridge Years</span>
    <h3>Retire before 62 with the supplement</h3>
    <p>See pension plus temporary supplement income, then watch the gap when the supplement ends.</p>
  </section>
  <section class="federal-scenario">
    <span class="federal-scenario-label">Pension Changes</span>
    <h3>Pension with COLA and a later reduction</h3>
    <p>Start with one pension amount, apply COLA, then model a later offset or step-down event.</p>
  </section>
  <section class="federal-scenario">
    <span class="federal-scenario-label">Household Timing</span>
    <h3>TSP plus spouse timing mismatch</h3>
    <p>One spouse retires first, one keeps earning, then both move into pension and Social Security later.</p>
  </section>
</div>

---

<section class="federal-section-intro">
  <span class="federal-section-kicker">Best Fit</span>
  <h2 class="federal-section-title">Who this is for</h2>
  <p class="federal-section-copy">The planner is built for people who want to understand the moving parts, not just get one retirement score.</p>
</section>

<div class="federal-audience">
  <div class="federal-audience-item"><strong>FERS employees</strong> planning around the annuity supplement and the years before Social Security starts.</div>
  <div class="federal-audience-item"><strong>Federal households with TSP plus pension income</strong> that need the whole cash-flow picture in one place.</div>
  <div class="federal-audience-item"><strong>CSRS or offset-style pension cases</strong> with timing changes, COLA assumptions, or later step-down events.</div>
  <div class="federal-audience-item"><strong>DIY planners</strong> who want to see taxes and spending gaps, not just a rule-of-thumb result.</div>
</div>

<p class="federal-audience-note">If you only want a one-number guess, this is probably more tool than you need. If you want to see how federal retirement <strong>actually behaves year by year</strong>, that is the point.</p>

---

## Frequently asked questions

<div class="federal-faq">
  <section class="federal-faq-item">
    <h3>Does this handle the FERS annuity supplement?</h3>
    <p>Yes. You can model temporary supplement income with start and end timing, then see the drop-off year in the cash flow.</p>
  </section>
  <section class="federal-faq-item">
    <h3>Can I model pension COLA and a later age-based change?</h3>
    <p>Yes. The planner supports pension COLA and later pension changes by year or age.</p>
  </section>
  <section class="federal-faq-item">
    <h3>Can I use it with TSP, Social Security, and spouse income?</h3>
    <p>Yes. Pension income is modeled as part of the full retirement-income system, not as a standalone number.</p>
  </section>
  <section class="federal-faq-item">
    <h3>Should I start in the free app or the full planner?</h3>
    <p>Start in the free app first. If the federal example matches the kind of problem you are solving, move to the full planner for deeper edits.</p>
  </section>
</div>

---

## Get started

<section class="federal-cta-band">
  <div class="federal-actions">
    <a href="https://app.fatboysoftware.com/?federal=1" class="federal-btn federal-btn-primary" data-federal-cta="bottom_free_app">Try Free Federal Example</a>
    <a href="https://planner.fatboysoftware.com" class="federal-btn federal-btn-secondary" data-federal-cta="bottom_full_planner">Open Full Federal Planner</a>
  </div>
  <p class="federal-note">Questions? <a href="mailto:fbfinancialplanner@gmail.com" data-federal-cta="email_question">fbfinancialplanner@gmail.com</a></p>
  <div class="federal-footer-links">
    <a href="/screenshots" data-federal-cta="nav_screenshots">Screenshots</a>
    <a href="/pricing" data-federal-cta="nav_pricing">Pricing</a>
    <a href="/comparison" data-federal-cta="nav_comparison">Compare</a>
  </div>
</section>

<div class="federal-mobile-bar">
  <a href="https://app.fatboysoftware.com/?federal=1" class="federal-btn federal-btn-primary" data-federal-cta="mobile_sticky_free_app">Try Free Federal Example</a>
</div>

</div>

<script>
  (function () {
    var pagePath = window.location.pathname || '/federal-retirement/';
    var pageUrl = window.location.href;
    var pageTitle = document.title;
    var query = new URLSearchParams(window.location.search || '');
    var ctaLinks = document.querySelectorAll('[data-federal-cta]');
    var landingVariant = 'federal_markdown_v1';

    function track(eventName, params) {
      if (typeof window.gtag !== 'function') {
        return;
      }
      window.gtag('event', eventName, params || {});
    }

    function appendAttributionParams(link) {
      if (!link || !link.href) {
        return;
      }

      var nextUrl = new URL(link.href);
      ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (key) {
        var value = query.get(key);
        if (value && !nextUrl.searchParams.get(key)) {
          nextUrl.searchParams.set(key, value);
        }
      });

      if (!nextUrl.searchParams.get('utm_source')) nextUrl.searchParams.set('utm_source', 'website');
      if (!nextUrl.searchParams.get('utm_medium')) nextUrl.searchParams.set('utm_medium', 'landing_page');
      if (!nextUrl.searchParams.get('utm_campaign')) nextUrl.searchParams.set('utm_campaign', 'federal_retirement');
      if (!nextUrl.searchParams.get('utm_content')) {
        nextUrl.searchParams.set('utm_content', link.getAttribute('data-federal-cta') || 'primary_cta');
      }

      link.href = nextUrl.toString();
    }

    track('view_federal_retirement_page', {
      page_location: pageUrl,
      page_path: pagePath,
      page_title: pageTitle,
      plan_type: 'federal',
      content_group: 'landing_page',
      landing_variant: landingVariant
    });

    Array.prototype.forEach.call(ctaLinks, function (link) {
      if (/app\.fatboysoftware\.com|planner\.fatboysoftware\.com/.test(link.href || '')) {
        appendAttributionParams(link);
      }

      link.addEventListener('click', function () {
        var ctaName = link.getAttribute('data-federal-cta') || 'unknown';
        var destination = link.href || link.getAttribute('href') || '';

        track('federal_landing_cta_click', {
          page_location: pageUrl,
          page_path: pagePath,
          page_title: pageTitle,
          cta_name: ctaName,
          destination_url: destination,
          plan_type: 'federal',
          landing_variant: landingVariant
        });

        track('select_promotion', {
          promotion_id: 'federal-retirement-landing',
          promotion_name: 'Federal Retirement Landing Page',
          creative_slot: ctaName,
          location_id: pagePath
        });

        if (/free_app/.test(ctaName)) {
          track('start_federal_plan', {
            page_location: pageUrl,
            page_path: pagePath,
            cta_name: ctaName,
            destination_url: destination,
            plan_type: 'federal',
            landing_variant: landingVariant
          });
        }
      });
    });
  })();
</script>
