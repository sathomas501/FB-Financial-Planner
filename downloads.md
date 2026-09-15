---
layout: default
title: Desktop Downloads - Fatboy Financial Planner
description: Download Fatboy Financial Planner for Windows or Linux and request a 14-day desktop Pro trial. No credit card or automatic charge. Trial limits apply.
permalink: /downloads/
---

<style>
.downloads-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
}

.downloads-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1f365c 55%, #12243f 100%);
  color: #fff;
  border-radius: 18px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2);
  margin-bottom: 1.5rem;
}

.downloads-eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.8;
  margin-bottom: 0.9rem;
}

.downloads-hero h1 {
  color: #fff !important;
  font-size: clamp(2rem, 4vw, 3.1rem);
  line-height: 1.05;
  margin: 0 0 0.9rem !important;
}

.downloads-hero p {
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 720px;
  color: rgba(255,255,255,0.88);
}

.downloads-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0;
}

.download-card,
.download-note {
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.download-card h2,
.download-note h2 {
  margin: 0 0 0.6rem !important;
  color: #111827 !important;
  font-size: 1.35rem;
}

.download-card p,
.download-note p,
.download-note li {
  color: #4b5563;
  line-height: 1.65;
}

.download-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1rem;
}

.download-btn,
.download-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.2rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
}

.download-btn {
  background: #2563eb;
  color: #fff !important;
}

.download-btn.secondary {
  background: #eef2ff;
  color: #1e3a8a !important;
}

.download-link {
  color: #1f2937 !important;
  border: 1px solid #d6d3d1;
  background: #fafaf9;
}

.download-note ul {
  margin: 0.8rem 0 0;
  padding-left: 1.2rem;
}

@media (max-width: 760px) {
  .downloads-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="downloads-page">
  <section class="downloads-hero">
    <div class="downloads-eyebrow">Desktop Downloads</div>
    <h1>Try Desktop Pro for 14 days.</h1>
    <p>Explore longer-range scenarios, Roth conversion strategies, and retirement stress tests in the installed planner. Download for Windows or Linux, then request your trial key inside the app. No credit card and no automatic charge.</p>
    <p>The 14 days begin when your trial key is issued. Name and email required; one trial per email address.</p>
  </section>

  <div class="downloads-grid">
    <section class="download-card">
      <h2>Download the app</h2>
      <p>Install the app first, then activate your trial using the steps below. Downloading alone does not start the Pro trial.</p>
      <div class="download-actions">
        <a href="https://fatboy-license-server-oc13.vercel.app/api/download?platform=windows" class="download-btn" onclick="gtag('event','desktop_download_click',{platform:'windows',source:'downloads_page'})">
          Download Windows (.exe)
        </a>
        <a href="https://github.com/sathomas501/FB-Financial-Planner/releases/latest" class="download-btn secondary auto-download-linux" onclick="gtag('event','desktop_download_click',{platform:'linux',source:'downloads_page'})">
          Download Linux (.tar.gz)
        </a>
      </div>
    </section>

    <section class="download-note">
      <h2>Before you install</h2>
      <p>The Linux Download button selects the portable archive. If automatic download lookup is unavailable, it opens the release page; choose the Linux x64 .tar.gz file. <a href="https://github.com/sathomas501/FB-Financial-Planner/releases/latest">AppImage is also available as an alternative</a>.</p>
      <p>Already own Pro? Activate with the license key from your purchase email. You do not need a trial key.</p>
      <ul>
        <li>Windows 10/11 desktop installer</li>
        <li>Linux portable archive (.tar.gz): extract it, open the FinancialPlanner folder, and run FinancialPlanner. Keep the entire folder together. No FUSE installation required.</li>
        <li>No macOS desktop build; Mac users can use the web planner</li>
        <li>Offline desktop workflow after install</li>
        <li>Internet access is needed to request and activate your trial key</li>
      </ul>
    </section>
  </div>

  <section class="download-note" style="margin-bottom:1.5rem">
    <h2>Start your trial in three steps</h2>
    <ol>
      <li>Download and install the Windows app, or extract and run the Linux app.</li>
      <li>On the welcome screen, choose <strong>Start 14-Day Trial</strong>. Enter your name and email, then select <strong>Send My Trial Key</strong>.</li>
      <li>Copy the key from your email into the activation dialog to unlock the trial.</li>
    </ol>
    <h2>What you can evaluate</h2>
    <p>Explore planning horizons up to 100 years, additional scenarios, Roth conversion optimization, advanced tax settings, charts, and breakpoint stress tests.</p>
    <p><strong>Trial limits:</strong> Monte Carlo is capped at 1,000 paths. Excel export and CSV/OFX/QFX holdings import require a paid license. The trial does not unlock every paid capability.</p>
    <p><strong>After 14 days:</strong> your trial expires without an automatic charge. You can still open saved plans read only and save separate copies. Purchase Pro to continue editing and running analyses. If your trial ends while the app is open, save a copy of the current plan snapshot before closing; unapplied editor changes may not be included.</p>
    <p>Existing Starter users retain legacy access when their prior installation records are available. New installations use the 14-day trial rather than a permanent Starter edition.</p>
    <img src="/assets/images/plan_summary.png" alt="Desktop planner plan summary" loading="lazy" style="display:block;width:100%;height:auto;border-radius:8px;margin-top:1rem">
  </section>

  <section class="download-note">
    <h2>Want the full version?</h2>
    <p>Pro is $149 once at the current Founding Member price. One paid license unlocks Pro across desktop and web. Prefer to stay in your browser? The guided web planner has its own free limits and does not require a desktop install.</p>
    <div class="download-actions">
      <a href="/pricing" class="download-link" onclick="gtag('event','downloads_page_pricing_click')">View Pricing</a>
      <a href="https://planner.fatboysoftware.com/?arrival=assumptions" class="download-link" onclick="gtag('event','downloads_page_free_app_click')">Open the Guided Web App</a>
    </div>
  </section>
</div>

<script defer src="/assets/js/website_download_updater.js"></script>
