---
layout: default
title: Desktop Downloads - Fatboy Financial Planner
description: Download the Windows desktop app or Linux AppImage for Fatboy Financial Planner. Pro license required for desktop activation.
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
    <h1>Download Fatboy Financial Planner for desktop.</h1>
    <p>Choose the Windows installer or Linux AppImage. Desktop use requires a Pro license key, but this page is the right place to get the app itself.</p>
  </section>

  <div class="downloads-grid">
    <section class="download-card">
      <h2>Download the app</h2>
      <p>Get the latest desktop build for your platform.</p>
      <div class="download-actions">
        <a href="https://fatboy-license-server-oc13.vercel.app/api/download?platform=windows" class="download-btn" onclick="gtag('event','desktop_download_click',{platform:'windows',source:'downloads_page'})">
          Download Windows (.exe)
        </a>
        <a href="https://fatboy-license-server-oc13.vercel.app/api/download?platform=linux" class="download-btn secondary" onclick="gtag('event','desktop_download_click',{platform:'linux',source:'downloads_page'})">
          Download Linux (.AppImage)
        </a>
      </div>
    </section>

    <section class="download-note">
      <h2>Before you install</h2>
      <p>The desktop app is part of Pro. If you already bought Pro, use the license key from your email to activate it in the app.</p>
      <ul>
        <li>Windows 10/11 desktop installer</li>
        <li>Linux AppImage desktop build</li>
        <li>Offline desktop workflow after install</li>
      </ul>
    </section>
  </div>

  <section class="download-note">
    <h2>Need access first?</h2>
    <p>If you have not purchased Pro yet, start free in the web app or view pricing before downloading the desktop version.</p>
    <div class="download-actions">
      <a href="/pricing" class="download-link" onclick="gtag('event','downloads_page_pricing_click')">View Pricing</a>
      <a href="https://app.fatboysoftware.com" class="download-link" onclick="gtag('event','downloads_page_free_app_click')">Start Free in the Web App</a>
    </div>
  </section>
</div>
