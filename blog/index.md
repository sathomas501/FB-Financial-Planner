---
layout: default
title: Blog - Fatboy Financial Planner
description: Research-backed retirement planning articles on tax strategy, withdrawal sequencing, Monte Carlo analysis, and policy changes.
---

# Blog

> Start here for Roth conversion planning: [Roth Conversions 2026: Who Should Convert, How Much to Convert, and When to Stop]({{ site.baseurl }}{% post_url 2026-04-14-roth-conversions-2026-who-should-convert %})

Also useful:
- [Roth Conversion Ladder Strategy: Pay Less Tax Over Your Lifetime]({{ site.baseurl }}{% post_url 2025-01-15-roth-conversion-ladder-strategy %})
- [IRMAA Planning: The Medicare Surcharge That Can Cost You $150,000+ in Retirement]({{ site.baseurl }}{% post_url 2025-01-17-IRMAA-Tax %})
- [RMD Planning 2026: How to Avoid the Tax Spike Most Retirees Sleepwalk Into]({{ site.baseurl }}{% post_url 2026-04-04-rmd-planning-tax-spike %})

---

{% for post in site.posts %}
## [{{ post.title }}]({{ post.url | relative_url }})
*{{ post.date | date: "%B %-d, %Y" }}*

{{ post.excerpt }}

[Read More]({{ post.url | relative_url }})

---
{% endfor %}
