# Test 1: Landing Page -> Planner Entry

## Objective

Increase the share of homepage visitors who become real planner users.

Primary goal:

- Improve `planner_entry / homepage sessions`

## Hypothesis

The homepage hero was asking visitors to process too many choices too early.
By making planner entry the clearest first action and reducing above-the-fold product branching, more visitors should move from the landing page into the planner.

## What Changed

Implemented in [index.html](./index.html):

- Tightened the hero support copy around instant entry and fast time-to-value
- Consolidated the hero to one planner CTA: `Open the Free Web Planner`
- Added explicit copy that the web planner opens with sample numbers first
- Removed the hero comparison cards that split attention between web app and Desktop Pro
- Demoted the Desktop Pro mention into lighter supporting copy instead of a competing top-of-page choice
- Updated hero bullets to focus on immediate outcomes rather than broader product breadth

## Events To Watch

- `planner_cta_click`
- `planner_entry`
- `projection_started`
- `projection_completed`

Experiment marker:

- `experiment_variant = test_1_hero_focus`

## KPI Stack

Primary KPI:

- `planner_entry / homepage sessions`

Secondary checks:

- `planner_cta_click / homepage sessions`
- `planner_entry / planner_cta_click`
- `projection_started / planner_entry`
- `projection_completed / planner_entry`
- compare `planner_cta_click` and `planner_entry` where `experiment_variant = test_1_hero_focus`

## Interpretation

Good outcome:

- More homepage visitors reach `planner_entry`
- CTA clickthrough rises or stays healthy
- Downstream activation quality stays flat or improves

Weak outcome:

- `planner_cta_click` rises but `planner_entry` does not
  This suggests better CTA interest but continued friction in the handoff to the app.

Bad outcome:

- `planner_entry / homepage sessions` stays flat or falls
- Or downstream quality drops enough to offset the gain

## Decision Rule

Ship:

- `planner_entry / homepage sessions` improves meaningfully
- and `projection_started / planner_entry` does not decline materially

Hold:

- Topline movement is directionally positive but too small to trust

Rework:

- CTA clicks improve without planner entry improving
- or planner entry improves but downstream quality weakens clearly

## Suggested Readout Window

- First directional read: 3-7 days
- Better confidence: 1-2 weeks, depending on traffic

## GA4 Setup Note

To segment this test directly in GA4, create an event-scoped custom dimension:

- Name: `FFP Funnel | Experiment Variant`
- Event parameter: `experiment_variant`

## Notes

- This test is intentionally narrow.
- Do not combine it with mobile UX or results-page monetization changes while reading the outcome.
