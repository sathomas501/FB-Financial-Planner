# Desktop trial rollout checklist

## Agreed direction

Free web tools remain available. For new desktop users, replace permanent Starter access with a 14-day trial followed by paid Pro. Keep the trial without a credit card or automatic billing. Preserve existing Starter users where practical. Expired users must be able to view and retrieve their saved plans.

Do not publish claims that Starter has been removed until the replacement desktop installer is released and verified.

## 1. Establish reliable trial expiration

- [x] Review the marketing, Full Web, desktop, and license-server repositories.
- [x] Identify the existing 14-day emailed-key flow and trial restrictions.
- [x] Enforce expiry when checking a saved desktop activation, including offline startup.
- [x] Test active, expired, malformed, and missing trial expiration dates; preserve paid licenses and saved data.
- [x] Recheck expiry while the app remains open and prevent further editing/analysis after expiration.

## 2. Replace Starter for new desktop users

- [x] Define and persist eligibility for existing Starter users before introducing the new default.
- [x] Add a welcome/activation screen: Start 14-Day Trial, Activate Purchased License, and access to existing plans.
- [x] Implement explicit unactivated, active-trial, expired/read-only, legacy-Starter, and paid states.
- [x] Gate application callbacks across menus, shortcuts, open editors, and queued background callbacks. Already-running computations may finish; their UI callbacks cannot start new work. Original plan writes are guarded separately.
- [x] Preserve plan viewing and retrieval after expiry without overwriting original files.
- [x] Activation opens the editing workspace at startup; activation after runtime expiry requires a clean restart to avoid resuming stale editors.
- [x] Automated tests cover new installs, existing Starter records, paid users, runtime expiry, and local/offline license checks.

## 3. Align licensing and emails

- [x] Correct trial emails to state the restrictions and link directly to downloads (local server changes).
- [x] Implement database-enforced email/computer trial history, activation checks, fixed-expiry resends, rate limits, and audited support exceptions.
- [x] Send the desktop computer identifier when requesting a trial; test both HTTP implementations.
- [ ] Apply the trial-control database migration and deploy the updated server and desktop together, following `Fatboy-License-Server/TRIAL_ROLLOUT.md`.
- [ ] Add trial-ending reminders and record delivery status to avoid duplicate messages.
- [ ] Verify trial-to-paid conversion, including existing trial keys and activation counts.
- [ ] Keep card collection and automatic billing outside this rollout.

## 4. Align marketing and Full Web

- [x] Draft prominent desktop-trial calls to action and activation instructions on the marketing site.
- [x] Add marketing trial-offer view/click tracking; keep download clicks separate from activation.
- [x] Prepare marketing copy for trial-only new installs and retain legacy-access documentation. Publish only alongside the replacement installer.
- [ ] Verify Full Web sends events to the intended analytics property.
- [ ] Make Full Web upgrade prompts address prospective buyers and expose the desktop trial.
- [ ] Track trial requests, successful activations, meaningful trial use, and purchases without sending plan data.

## 5. Verify and release

- [x] Marketing content checks, JavaScript checks, focused offer tracking checks, and Jekyll build passed before this migration.
- [x] Public Windows download endpoint responds; release v3.30.8 includes Windows and Linux packages.
- [x] Review the downloads page at desktop width and homepage at a narrow 500px viewport; physical-phone testing remains a release check.
- [ ] Test the distributed installer: download -> request trial -> receive key -> activate -> run analysis.
- [ ] Test expiration and purchase using test licenses, including retrieval of saved plans.
- [x] Build an unsigned Windows portable preview and verify its packaged access-policy and trial-screen code match the final source.
- [ ] Build/sign a replacement desktop installer and verify its packaged behavior.
- [ ] Publish coordinated desktop and marketing updates after verification.
- [ ] Compare purchases per visitor, trial activations, purchases per activated trial, and refunds using consistent date ranges.

## Current execution notes

The marketing changes are local and unpublished. The in-app browser could not connect; local layout checks used isolated headless Edge with external network requests blocked. The desktop repository has pre-existing edits in `FinancialPlanner/gui/editors/projection_editor.py` and an untracked living-expense test; leave both untouched.

Completed first implementation: local trial-expiry enforcement. `is_pro_activated()` previously checked activation and machine identity but not the saved trial expiry. License status now rejects expired or invalid trial dates without deleting the stored activation. Remaining days round up, so the final partial day does not display as expired. All 14 new expiry regression cases and 4 existing deactivation tests passed with system Python (the desktop virtual environment lacks pytest). Tests used an isolated workspace temp directory because the default pytest temp directory was inaccessible.

The source now requires trial/paid activation for new desktop installs. Existing Starter eligibility is decided once from prior local records and persisted separately from license activation. A trial that expires during a session opens a read-only viewer with an in-memory snapshot; users can save a copy, while originals remain unchanged. Unapplied editor changes may not be in the snapshot. Activating from the expired screen requires reopening the app. All 42 targeted tests passed, including actual Tk callback and viewer checks. A full-app source smoke test also passed: initialize, expire, block normal saves, retrieve the session snapshot, and confirm the original file is unchanged. Marketing content validation and the final Jekyll build passed.

Windows and Linux package specs include the new modules, the bundled user guide documents the transition, and the Windows installer describes activation and read-only expiry behavior. A clean unsigned Windows portable preview build passed; its archived access-policy and trial-screen code were compared with the final source, and the bundled guide is present. Preview location: `Fatboy-Retirement-planner/tmp/trial-transition-dist/Fatboy Financial Planner/`. NSIS is unavailable locally, so installer compilation/signing and Linux packaging remain release checks. No changes are deployed and no live trial keys were requested.

Subsequent license-server controls passed 27 tests against isolated PostgreSQL/mocked email, and TypeScript checking passed. The desktop now sends its existing computer ID on trial requests; 49 targeted desktop tests passed. The earlier unsigned preview predates this request-payload change and must be rebuilt before releasing these server controls. The public trial endpoint responded HTTP 204 to OPTIONS on September 15, 2026; this verified reachability only, not live key issuance or email delivery. No production migration or deployment was performed.
