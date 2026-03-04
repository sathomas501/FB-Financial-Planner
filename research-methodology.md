---
layout: default
title: Research & Methodology - Fatboy Financial Planner
description: Executive summary and research methodology for Fatboy Financial Planner. Review assumptions, modeling approach, validation process, and known limitations.
keywords: retirement planning methodology, retirement modeling assumptions, Monte Carlo methodology, tax modeling research, executive summary retirement planning
---

# Research & Methodology

This is where we show how the planning engine works, what we tested, and what assumptions drive results.

---

## Executive Summary

Our research is built around one practical question:

**Which planning decisions materially improve a retiree's odds of meeting spending goals while controlling tax drag and sequence risk?**

### What We Tested

- Withdrawal sequencing across taxable, tax-deferred, and tax-free accounts
- Roth conversion timing and bracket management
- Tax-law scenario exposure (including TCJA sunset and post-2025 changes)
- IRMAA threshold effects and Medicare premium drag
- Sequence-of-returns sensitivity across multiple market environments
- Estate and beneficiary impact under current inherited IRA rules

### Key Findings

1. Tax-aware withdrawal sequencing can reduce lifetime tax drag versus fixed-order withdrawals.
2. Roth conversions work best when tied to bracket capacity and future RMD pressure.
3. A plan that survives one return model can still fail in other regimes, so cross-model testing matters.
4. Tax parameter flexibility is essential when law changes; static calculators go stale quickly.

---

## Read the Papers

Download the full research package:

<div class="download-buttons">
  <a href="/assets/whitepapers/fatboy-software-financial-planner-white-paper.pdf"
     class="btn-download track-doc-download"
     data-doc-type="white_paper"
     data-doc-title="Fatboy Software Financial Planner White Paper"
     target="_blank"
     rel="noopener">
    Download White Paper (PDF)
  </a>
  <a href="/assets/whitepapers/fatboy-software-financial-planner-executive-summary.pdf"
     class="btn-download track-doc-download"
     data-doc-type="executive_summary"
     data-doc-title="Fatboy Software Financial Planner Executive Summary"
     style="background: #475569;"
     target="_blank"
     rel="noopener">
    Download Executive Summary (PDF)
  </a>
</div>

Start with the executive summary for the fast version. Use the full white paper for assumptions, model logic, and disclosures.

---

## How We Model

### 1) Inputs

- User-provided portfolio balances and account types
- Income streams (earned income, pensions, Social Security timing)
- Spending profile by phase (pre-retirement, transition, retirement, late-stage)
- Tax configuration (federal and state settings, deductions, bracket assumptions)
- Policy toggles for scenario analysis (e.g., exemption levels, deduction changes)

### 2) Model Framework

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

### 4) Validation

- Internal consistency checks (cash flow identity and balance transitions)
- Parameter sensitivity checks (single-variable perturbations)
- Edge-case tests around bracket boundaries and threshold cliffs
- Cross-scenario reasonableness review against expected directional outcomes

### 5) Assumptions

- Return distributions are uncertain and model-dependent
- Inflation can persist outside historical averages
- Tax law can change and requires periodic parameter updates
- Spending behavior is adaptive in real life, even when modeled as static

---

## Limits & Disclosures

- This is planning software, not individualized investment or tax advice.
- Output quality depends on input quality and assumption discipline.
- Monte Carlo probabilities are scenario-dependent estimates, not guarantees.
- Future policy changes can alter outcomes materially.

For implementation decisions, validate results with a qualified CPA, EA, or fee-only fiduciary advisor.

---

## Cite This Work

`Fatboy Software. "Fatboy Software Financial Planner White Paper." Version 1.0, March 2026. https://fatboysoftware.com/research-methodology`

---

## Questions

Questions about assumptions, methodology details, or reproducing a scenario:

- Email: [fbfinancialplanner@gmail.com](mailto:fbfinancialplanner@gmail.com)

<nav class="page-nav">
  <a href="/">Home</a>
  <a href="/why-fatboy">Why Fatboy?</a>
  <a href="/pricing">Pricing</a>
  <a href="/blog">Blog</a>
  <a href="/about">About</a>
</nav>
