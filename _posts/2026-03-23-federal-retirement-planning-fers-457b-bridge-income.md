---
layout: post
title: "Federal Retirement Planning, Finally Modeled Correctly: FERS, 457(b), Bridge Income, and Pension Offsets"
date: 2026-03-23
author: Steve
categories:
  - product
  - retirement-planning
tags:
  - fers
  - 457b
  - pension
  - government-workers
  - retirement-income
  - federal-employees
keywords: "federal retirement planning, FERS supplement, governmental 457(b), government worker retirement, pension COLA, CSRS Offset, bridge income, federal employee retirement planning, public sector retirement planning, retirement income modeling"
image: /assets/images/federal-retirement-planning-fers-457b-bridge-income.png
description: "Fatboy now models government-worker retirement scenarios more realistically, including FERS supplements, governmental 457(b) plans, pension COLA, temporary bridge income, and later pension step-downs like CSRS Offset-style reductions."
excerpt: "A lot of retirement software treats government benefits like a flat pension plus Social Security. That misses the real planning problem. Fatboy now models bridge income, FERS supplements, pension COLA, later pension offsets, and governmental 457(b) accounts with much more realism."
---

A lot of retirement planning software quietly assumes that if you worked in government, your income picture is still just: salary, pension, Social Security, done.

That is not how many real government retirements work.

Federal and public-sector households often have income that changes shape over time. A pension may have COLA while another does not. A FERS supplement may cover the gap before age 62. A pension may step down later because of an offset. Some workers have access to a governmental 457(b), which behaves differently enough in practice that it matters to the plan.

Those details are not edge-case trivia. They change withdrawal timing, tax exposure, bridge-year stress, and the answer to the question people actually care about: *Can I retire when I want to, and what does the income path really look like?*

Starting now, Fatboy models those scenarios much more cleanly.

If you want the focused overview for this use case, see the [FERS retirement calculator page](/federal-retirement/).

If you want the clearest explanation of the competitive difference, read [Federal Retirement Planning Beyond a Generic Pension Input](/blog/2026/03/28/federal-retirement-planning-beyond-generic-pension-input/).

---

## What Changed

We added a new government-retirement modeling layer built around general income primitives, not one-off hacks.

That means Fatboy now supports:

- **Governmental 457(b) account handling** as a workplace retirement account type
- **Pension COLA modeling**
- **Temporary or bridge income streams** with start/end by age or year
- **Explicit FERS annuity supplement modeling**
- **Later pension change events** for cases like CSRS Offset or other pension step-downs

The important design choice here is that we did **not** build a giant federal-only wizard full of obscure acronyms and one-off checkboxes.

Instead, we added reusable building blocks underneath the planner, then exposed the government-specific parts where they are actually helpful.

That matters for two reasons:

1. It makes the model more durable.
2. It keeps the standard retirement workflow clean for everyone else.

---

## Why This Matters More Than It Sounds

For many households, the hardest retirement years are not the late years. They are the transition years.

The planning problem is often:

- retirement happens before Social Security starts
- wage income disappears immediately
- pension income starts now or later
- a supplement or bridge income appears temporarily
- then one income source drops off or steps down at a specific age

If your software turns all of that into a single flat pension number, the chart may still look neat, but the plan itself is distorted.

That distortion can show up as:

- overstating spending confidence before age 62
- understating the need for bridge withdrawals
- hiding later income drops
- misreading tax windows for Roth conversions
- making a retirement date look safer than it really is

This update is really about fixing that transition math.

<div class="callout-key">
  <p><strong>Bottom line:</strong> Government-worker retirement is often not one permanent income stream. It is a sequence of changing streams. The planner should model it that way.</p>
</div>

---

## FERS Supplement: Separate, Temporary, and Visible

One of the most useful additions is explicit **FERS annuity supplement** support.

That benefit is important precisely because it is temporary. It usually bridges the period before age 62, and then it ends. If you fold it invisibly into pension income, you lose the timing information that makes it important in the first place.

Fatboy now treats it as a separate stream in the model and in the visual cash-flow reporting. That means you can actually see the temporary support and the moment it drops away.

That is a much more honest planning picture than pretending the early-retirement years and post-62 years look the same.

We also structured the implementation so earnings-test logic can be layered in later without redoing the entire income model.

---

## Pension COLA and Pension Step-Downs

Not all pensions behave the same way over time.

Some pensions stay flat. Some increase with a fixed COLA. Some effectively change later because of an offset or coordination rule. The classic example is **CSRS Offset**, but the broader planning need is more general: *income can change later, and the model needs to know when and by how much.*

Fatboy now handles that through pension change events rather than a one-off hardcoded CSRS switch.

So the planner can now represent:

- a permanent pension with no COLA
- a pension that grows with COLA
- a pension that changes at a later age or year
- a pension that steps down when another benefit becomes available

That means the cashflow view, Sankey flows, and plan timeline can all reflect the shape of the income stream more realistically.

---

## Governmental 457(b) Support

We also added support for **governmental 457(b)** accounts as a workplace retirement account type.

That sounds small, but account type clarity matters. If the planner cannot distinguish the bucket correctly, contribution assumptions and tax-deferred retirement balances get muddier than they should be.

A lot of people working in public service have a retirement picture that combines pension income with defined contribution savings. Modeling both matters. Government retirement is often not a pension-only story.

---

## Bridge Income Is Bigger Than Federal Workers

A useful side effect of this work is that the planner now supports a more generic **bridge income** concept.

That means a user can model temporary income with:

- a name
- an owner
- annual or monthly amount
- a start age or start year
- an end age or end year
- optional inflation adjustment

Yes, that supports federal-style bridge periods. But it also supports plenty of non-federal scenarios:

- part-time consulting for the first five years of retirement
- temporary contract income
- annuity riders that end later
- a temporary family support payment
- a staged retirement transition

That is exactly the kind of feature we like to add: specific enough to solve a real government-worker problem, general enough to be useful elsewhere.

---

## What We Deliberately Did *Not* Build Yet

We were careful not to turn this release into an acronym graveyard.

This update does **not** try to solve every niche government retirement rule in one shot.

We intentionally left out:

- WEP and GPO-specific modeling
- niche reemployed-annuitant workflows
- agency-specific exceptions
- special catch-up edge cases that would bloat the contribution logic for everyone else

That is not because those topics are unimportant. It is because good product design means knowing the difference between a meaningful planning problem and a feature branch that turns into tax-law archaeology.

<div class="callout-warning">
  <p><strong>Important:</strong> This release improves government-worker planning substantially, but it should still be treated as planning software rather than a substitute for reviewing your exact agency benefit statement or OPM paperwork.</p>
</div>

---

## Why We Built It This Way

There are two bad ways to implement a feature like this.

**Bad approach #1:** Ignore the nuances and keep the UI simple while the math stays wrong.

**Bad approach #2:** Add a giant federal-only panel with twenty brittle switches, most of which confuse users and half of which are impossible to maintain.

We tried to take the middle path:

- general modeling primitives underneath
- targeted government-specific controls where needed
- advanced sections so non-government users are not burdened by them
- a data model that can still be read by lighter clients later

That last point matters. The web and mobile experience do not always need every editing control the desktop can support. But they should be able to **read** the same scenario cleanly.

---

## Who This Helps Most

This update is especially useful if you are:

- a federal employee planning around a FERS supplement
- a public-sector worker with a pension plus a governmental 457(b)
- someone with pension income that changes later
- a couple trying to understand the gap between retirement and age 62
- anyone whose retirement income is better described as a timeline than a single number

If that sounds like your situation, the planner should now feel less like it is forcing your retirement into a generic template.

It should feel more like it is finally modeling the retirement you actually have.

If you want to see the feature set framed specifically for federal households, the [federal retirement page](/federal-retirement/) is the best place to start.

---

## Where You Will See It

The new modeling shows up in the desktop planner first, including:

- the Basic Info workflow
- advanced government retirement controls
- projection cashflow rows
- Sankey income flow visualization
- save/load persistence and scenario portability

That desktop-first rollout is intentional. The desktop app is where the more detailed editing experience belongs. Lighter clients can follow with the parts that are broadly useful once the shared model has proven itself.

---

Government-worker retirement planning is one of those areas where small modeling errors compound into big planning mistakes.

We wanted to fix that without turning the product into a maze.

This release gets us much closer.

If your retirement has a bridge period, a temporary supplement, a pension offset, or a 457(b) alongside pension income, Fatboy now has a much better chance of reflecting the real shape of your plan instead of flattening it into something easier to code but less useful to trust.

Want the direct version for FERS and related federal scenarios? Visit the [FERS retirement calculator page](/federal-retirement/).

And if you want the shorter positioning version, see [Federal Retirement Planning Beyond a Generic Pension Input](/blog/2026/03/28/federal-retirement-planning-beyond-generic-pension-input/).


