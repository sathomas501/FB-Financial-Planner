---
layout: default
title: Research & Methodology - Fatboy Financial Planner
description: Executive summary and research methodology for Fatboy Financial Planner. Review assumptions, modeling approach, validation process, and known limitations.
keywords: retirement planning methodology, retirement modeling assumptions, Monte Carlo methodology, tax modeling research, executive summary retirement planning
---

# Research & Methodology

This page is where we publish the logic behind our planning framework, not just the conclusions.

---

## Executive Summary

Our research approach is built around one practical question:

**Which planning decisions materially improve a retiree's odds of meeting spending goals while controlling tax drag and sequence risk?**

### What we evaluated

- Withdrawal sequencing across taxable, tax-deferred, and tax-free accounts
- Roth conversion timing and bracket management
- Tax-law scenario exposure (including TCJA sunset and post-2025 changes)
- IRMAA threshold effects and Medicare premium drag
- Sequence-of-returns sensitivity across multiple market environments
- Estate and beneficiary impact under current inherited IRA rules

### Top findings (example structure - replace with your final findings)

1. Tax-aware withdrawal sequencing can materially reduce cumulative lifetime taxes versus fixed-order withdrawals.
2. Roth conversions are most effective when coordinated with bracket capacity and future RMD pressure.
3. Plans that pass only one return model can still fail in alternate regimes; cross-model testing matters.
4. Tax parameter flexibility is required when policy changes; static calculators become stale quickly.

---

## White Paper

Use the links below to publish your full research package.

<div class="download-buttons">
  <a href="/assets/whitepapers/fatboy-software-financial-planner-white-paper.pdf" class="btn-download">Fatboy Software Financial Planner White Paper (PDF)</a>
  <a href="/assets/whitepapers/fatboy-software-financial-planner-executive-summary.pdf" class="btn-download" style="background: #475569;">Fatboy Software Financial Planner Executive Summary (PDF)</a>
</div>

If you want this content indexable instead of PDF-only, add the full text as additional sections on this page.

---

## Methodology

### 1) Data Inputs

- User-provided portfolio balances and account types
- Income streams (earned income, pensions, Social Security timing)
- Spending profile by phase (pre-retirement, transition, retirement, late-stage)
- Tax configuration (federal and state settings, deductions, bracket assumptions)
- Policy toggles for scenario analysis (e.g., exemption levels, deduction changes)

### 2) Modeling Framework

- Deterministic cash flow projection for baseline plan trajectory
- Monte Carlo simulation for return-path uncertainty and survivability analysis
- Tax engine applied annually to estimate liability and bracket interactions
- Withdrawal policy logic to test sequencing and conversion strategies
- Optional estate projection layer for bequest and heir-tax context

### 3) Scenario Design

- Baseline scenario representing current strategy
- Alternative scenarios for retirement date, spending level, and allocation shifts
- Targeted tax strategy scenarios (conversion schedules, deduction windows)
- Stress scenarios for adverse return paths and inflation persistence

### 4) Validation Approach

- Internal consistency checks (cash flow identity and balance transitions)
- Parameter sensitivity checks (single-variable perturbations)
- Edge-case tests around bracket boundaries and threshold cliffs
- Cross-scenario reasonableness review versus expected directional outcomes

### 5) Key Assumptions

- Return distributions are uncertain and model-dependent
- Inflation can persist outside historical averages
- Tax law can change and requires periodic parameter updates
- Spending behavior is adaptive in real life, even when modeled as static

---

## Limitations & Disclosures

- This is planning software, not individualized investment or tax advice.
- Output quality depends on input quality and assumption discipline.
- Monte Carlo probabilities are scenario-dependent estimates, not guarantees.
- Future policy changes can alter outcomes materially.

For personalized implementation decisions, validate results with a qualified CPA, EA, or fee-only fiduciary advisor.

---

## Citation Format

If you want others to reference this work, add a citation block:

`Fatboy Software. "Fatboy Software Financial Planner White Paper." Version X.Y, Month Day, Year. https://fatboysoftware.com/research-methodology`

---

## Contact for Questions

Questions about assumptions, methodology details, or reproducing a scenario:

- Email: [fbfinancialplanner@gmail.com](mailto:fbfinancialplanner@gmail.com)

<nav class="page-nav">
  <a href="/">Home</a>
  <a href="/pricing">Pricing</a>
  <a href="/blog">Blog</a>
  <a href="/about">About</a>
</nav>
